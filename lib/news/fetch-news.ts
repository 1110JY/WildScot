import fs from "node:fs/promises"
import path from "node:path"

import type { NewsArticle, NewsSource } from "./types"

type FetchOptions = {
  sportId?: string
  search?: string
  limit?: number
}

const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes
const FETCH_TIMEOUT_MS = 8000

type CacheEntry = {
  fetchedAt: number
  articles: NewsArticle[]
}

let cache: CacheEntry | null = null

function decodeCdata(value: string) {
  return value
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function cleanText(raw?: string) {
  if (!raw) return undefined
  const withoutTags = raw.replace(/<[^>]*>/g, " ")
  return withoutTags.replace(/\s+/g, " ").trim().slice(0, 280)
}

function extractTag(block: string, tag: string) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
  const match = block.match(regex)
  return match ? decodeCdata(match[1]) : undefined
}

function parseRss(xml: string): NewsArticle[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? []
  return items.map((item, idx) => {
    const link = extractTag(item, "link") ?? ""
    const guid = extractTag(item, "guid")
    const title = extractTag(item, "title") ?? "Untitled"
    const pubDate = extractTag(item, "pubDate")
    const description = extractTag(item, "description") ?? extractTag(item, "summary")

    return {
      id: guid ?? link ?? `rss-${idx}`,
      title,
      link,
      publishedAt: pubDate ? new Date(pubDate) : undefined,
      excerpt: cleanText(description),
      source: "",
      sourceId: "",
      sports: [],
    }
  })
}

function parseAtom(xml: string): NewsArticle[] {
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? []
  return entries.map((entry, idx) => {
    const linkMatch = entry.match(/<link[^>]*href=\"([^\"]+)\"[^>]*>/i)
    const link = linkMatch?.[1] ?? ""
    const id = extractTag(entry, "id") ?? link ?? `atom-${idx}`
    const title = extractTag(entry, "title") ?? "Untitled"
    const updated = extractTag(entry, "updated") ?? extractTag(entry, "published")
    const summary = extractTag(entry, "summary") ?? extractTag(entry, "content")

    return {
      id,
      title,
      link,
      publishedAt: updated ? new Date(updated) : undefined,
      excerpt: cleanText(summary),
      source: "",
      sourceId: "",
      sports: [],
    }
  })
}

async function loadSources(): Promise<NewsSource[]> {
  const filePath = path.join(process.cwd(), "public", "news-sources.json")
  const raw = await fs.readFile(filePath, "utf8")
  const parsed = JSON.parse(raw) as NewsSource[]
  return parsed.filter((s) => s.enabled !== false)
}

async function fetchSourceFeed(source: NewsSource): Promise<NewsArticle[]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const res = await fetch(source.feedUrl, {
      signal: controller.signal,
      next: { revalidate: CACHE_TTL_MS / 1000 },
    })

    if (!res.ok) {
      return []
    }

    const xml = await res.text()
    if (!xml.includes("<rss") && !xml.includes("<feed")) {
      return []
    }

    const isAtom = /<feed[\s\S]*xmlns=['"]?http:\/\/www\.w3\.org\/2005\/Atom/.test(xml)
    const parsed = isAtom ? parseAtom(xml) : parseRss(xml)

    return parsed
      .filter((item) => Boolean(item.link) && Boolean(item.title))
      .map((item) => ({
        ...item,
        source: source.name,
        sourceId: source.id,
        sports: source.sports,
      }))
  } catch {
    return []
  } finally {
    clearTimeout(timeout)
  }
}

function dedupe(articles: NewsArticle[]) {
  const seen = new Map<string, NewsArticle>()
  for (const article of articles) {
    const key = article.link || article.id || article.title
    if (!key) continue
    if (!seen.has(key)) {
      seen.set(key, article)
    }
  }
  return Array.from(seen.values())
}

async function fetchAllArticles(): Promise<NewsArticle[]> {
  const sources = await loadSources()

  const results = await Promise.allSettled(sources.map((source) => fetchSourceFeed(source)))

  const articles = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  )

  return dedupe(articles).sort((a, b) => {
    const aTime = a.publishedAt ? a.publishedAt.getTime() : 0
    const bTime = b.publishedAt ? b.publishedAt.getTime() : 0
    return bTime - aTime
  })
}

export async function getNewsArticles(options: FetchOptions = {}) {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return filterArticles(cache.articles, options)
  }

  const articles = await fetchAllArticles()
  cache = { fetchedAt: now, articles }
  return filterArticles(articles, options)
}

function filterArticles(articles: NewsArticle[], { sportId, search, limit }: FetchOptions) {
  let filtered = articles

  if (sportId && sportId !== "all") {
    filtered = filtered.filter((a) => a.sports.includes(sportId))
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
        a.source.toLowerCase().includes(q)
    )
  }

  if (limit) {
    filtered = filtered.slice(0, limit)
  }

  return filtered
}
