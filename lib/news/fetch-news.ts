import fs from "node:fs/promises"
import path from "node:path"

import type {
  NewsApiResponse,
  NewsArticle,
  NewsFeedResult,
  NewsSource,
  NewsSourceStatus,
} from "./types"

type FetchOptions = {
  sportId?: string
  search?: string
  limit?: number
}

const CACHE_TTL_MS = 15 * 60 * 1000
const FETCH_TIMEOUT_MS = 9000
const MAX_TAGS_PER_ARTICLE = 2
const MAX_HTML_LINKS_PER_SOURCE = 16
const MAX_HTML_ARTICLES_PER_SOURCE = 10
const GENERAL_TAG = "general-outdoor"

const APPROVED_SOURCE_IDS = new Set([
  "scottish-surfing",
  "snowsport-scotland",
  "paddle-scotland",
  "mountaineering-scotland",
  "dmbin-scotland",
  "outdoor-swimming-society",
  "singletrack-magazine",
  "carve-magazine",
  "surfers-against-sewage",
])

const TRACKING_PARAMS = new Set([
  "fbclid",
  "gclid",
  "igshid",
  "mc_cid",
  "mc_eid",
  "ref",
  "ref_src",
  "source",
  "spm",
])

const GLOBAL_EXCLUSION_KEYWORDS = [
  "live blog",
  "minute by minute",
  "match report",
  "premier league",
  "champions league",
  "football transfer",
  "cricket",
  "rugby score",
  "score update",
  "fixture list",
  "olympic medal table",
  "tennis draw",
]

const GENERAL_ADVENTURE_KEYWORDS = [
  "outdoor",
  "adventure",
  "mountain safety",
  "access rights",
  "coastal safety",
  "blue space",
  "water quality",
]

const SCOTLAND_SIGNALS = [
  "scotland",
  "scottish",
  "edinburgh",
  "glasgow",
  "aberdeen",
  "dundee",
  "inverness",
  "stirling",
  "perth",
  "fife",
  "highlands",
  "fort william",
  "cairngorm",
  "glencoe",
  "argyll",
  "hebrides",
  "orkney",
  "shetland",
  "skye",
  "peebles",
  "dunbar",
  "aviemore",
  "loch lomond",
]

type SportRule = {
  id: string
  keywords: string[]
  related: string[]
  exclude: string[]
}

const SPORT_RULES: SportRule[] = [
  {
    id: "surfing",
    keywords: ["surf", "surfing", "surfer", "surfers", "surfboard", "bodyboard"],
    related: ["wave pool", "surf school", "surf lesson", "surf camp", "coastal break"],
    exclude: ["web surfing", "channel surfing", "internet surfing"],
  },
  {
    id: "climbing",
    keywords: [
      "climbing",
      "climb",
      "climber",
      "climbers",
      "bouldering",
      "mountaineering",
      "rock climbing",
      "trad climbing",
      "sport climbing",
    ],
    related: ["crag", "belay", "indoor wall", "rope skills"],
    exclude: ["climbing inflation", "climbing prices"],
  },
  {
    id: "mtb",
    keywords: [
      "mountain biking",
      "mountain bike",
      "mtb",
      "singletrack",
      "trail centre",
      "downhill bike",
      "enduro biking",
    ],
    related: ["bike park", "forest trails", "trail riding"],
    exclude: ["motorbike", "motorcycle", "motocross", "motogp", "road cycling"],
  },
  {
    id: "wild-swimming",
    keywords: [
      "wild swimming",
      "wild swim",
      "open water swimming",
      "open-water swimming",
      "cold water swimming",
      "sea swimming",
      "loch swim",
    ],
    related: ["cold water dip", "open water", "swim safety"],
    exclude: [
      "swimming pool",
      "aquatics centre",
      "lane swimming",
      "pool timetable",
      "leisure centre swimming",
    ],
  },
  {
    id: "snowsports",
    keywords: [
      "snowsports",
      "skiing",
      "ski",
      "snowboarding",
      "snowboard",
      "alpine skiing",
      "ski touring",
    ],
    related: ["winter sport", "snow conditions", "ski area"],
    exclude: ["water ski", "jet ski", "skiathos"],
  },
  {
    id: "paddling",
    keywords: [
      "paddling",
      "kayaking",
      "kayak",
      "canoeing",
      "canoe",
      "stand up paddleboard",
      "stand-up paddleboard",
      "sea kayak",
      "whitewater",
      "sup",
    ],
    related: ["river paddling", "paddle sport"],
    exclude: ["paddle tennis", "padel", "pickleball paddle", "table tennis paddle"],
  },
]

type CacheEntry = {
  fetchedAt: number
  articles: NewsArticle[]
  sourceStatuses: NewsSourceStatus[]
}

let cache: CacheEntry | null = null

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[/gi, "")
    .replace(/\]\]>/gi, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function stripTags(value?: string) {
  if (!value) return ""
  return decodeEntities(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function cleanText(value?: string) {
  const compact = stripTags(value)
  return compact ? compact.slice(0, 320) : undefined
}

function normalizeMatchText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function hasKeyword(text: string, keyword: string) {
  const normalizedKeyword = normalizeMatchText(keyword)
  if (!normalizedKeyword) return false
  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(normalizedKeyword).replace(/\s+/g, "\\s+")}([^a-z0-9]|$)`,
    "i"
  )
  return pattern.test(text)
}

function hasAnyKeyword(text: string, keywords: string[]) {
  for (const keyword of keywords) {
    if (hasKeyword(text, keyword)) return true
  }
  return false
}

function countKeywordHits(text: string, keywords: string[]) {
  let hits = 0
  for (const keyword of keywords) {
    if (hasKeyword(text, keyword)) hits += 1
  }
  return hits
}

function normalizeUrl(raw: string) {
  try {
    const parsed = new URL(raw.trim())
    parsed.hash = ""
    for (const key of [...parsed.searchParams.keys()]) {
      const lower = key.toLowerCase()
      if (lower.startsWith("utm_") || TRACKING_PARAMS.has(lower)) {
        parsed.searchParams.delete(key)
      }
    }
    return parsed.toString()
  } catch {
    return raw.trim()
  }
}

function parseDate(value?: string) {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function extractTag(block: string, tag: string) {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
  const match = block.match(pattern)
  return match ? decodeEntities(match[1]) : undefined
}

function extractTagAny(block: string, tags: string[]) {
  for (const tag of tags) {
    const value = extractTag(block, tag)
    if (value) return value
  }
  return undefined
}

function extractAtomLink(entryBlock: string) {
  const linkTags = [...entryBlock.matchAll(/<link\b([^>]*)\/?>/gi)]
  for (const tag of linkTags) {
    const attrs = tag[1] ?? ""
    const href = attrs.match(/\bhref=["']([^"']+)["']/i)?.[1]
    if (!href) continue
    const rel = attrs.match(/\brel=["']([^"']+)["']/i)?.[1]?.toLowerCase()
    if (!rel || rel === "alternate") return href
  }
  return undefined
}

function parseRss(xml: string): NewsArticle[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? []
  return items.map((item, index) => {
    const link = normalizeUrl(extractTagAny(item, ["link", "guid"]) ?? "")
    const title = cleanText(extractTag(item, "title")) ?? "Untitled"
    const publishedAt = parseDate(extractTagAny(item, ["pubDate", "dc:date", "date"]))
    const excerpt = cleanText(extractTagAny(item, ["description", "summary", "content:encoded"]))
    const guid = cleanText(extractTag(item, "guid"))

    return {
      id: guid ?? link ?? `rss-${index}`,
      title,
      link,
      source: "",
      sourceId: "",
      publishedAt,
      excerpt,
      sports: [],
    }
  })
}

function parseAtom(xml: string): NewsArticle[] {
  const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? []
  return entries.map((entry, index) => {
    const link = normalizeUrl(extractAtomLink(entry) ?? extractTag(entry, "id") ?? "")
    const title = cleanText(extractTag(entry, "title")) ?? "Untitled"
    const publishedAt = parseDate(extractTagAny(entry, ["published", "updated", "dc:date"]))
    const excerpt = cleanText(extractTagAny(entry, ["summary", "content"]))
    const id = cleanText(extractTag(entry, "id"))

    return {
      id: id ?? link ?? `atom-${index}`,
      title,
      link,
      source: "",
      sourceId: "",
      publishedAt,
      excerpt,
      sports: [],
    }
  })
}

function readMetaTag(html: string, key: string, attr: "property" | "name" = "property") {
  const pattern = new RegExp(
    `<meta[^>]*${attr}=["']${escapeRegExp(key)}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i"
  )
  return cleanText(html.match(pattern)?.[1])
}

function readTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return cleanText(match?.[1])
}

function readTimeTag(html: string) {
  const datetimeMatch = html.match(/<time[^>]*datetime=["']([^"']+)["'][^>]*>/i)
  if (datetimeMatch?.[1]) return datetimeMatch[1]
  const pubMeta =
    readMetaTag(html, "article:published_time") ||
    readMetaTag(html, "publish-date", "name") ||
    readMetaTag(html, "datePublished", "name")
  return pubMeta
}

function shouldExcludeByPath(url: string) {
  const lower = url.toLowerCase()
  return (
    lower.includes("/live/") ||
    lower.includes("/scores") ||
    lower.includes("/fixtures") ||
    lower.includes("/football") ||
    lower.includes("/cricket") ||
    lower.includes("/olympic") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".pdf")
  )
}

function classifySports(article: Pick<NewsArticle, "title" | "excerpt" | "link">) {
  const titleText = normalizeMatchText(article.title)
  const excerptText = normalizeMatchText(article.excerpt ?? "")
  const content = `${titleText} ${excerptText}`.trim()

  if (!content) return null
  if (shouldExcludeByPath(article.link)) return null
  if (hasAnyKeyword(content, GLOBAL_EXCLUSION_KEYWORDS)) return null

  const hasScotlandSignal = hasAnyKeyword(content, SCOTLAND_SIGNALS)
  if (!hasScotlandSignal) return null

  const sportUniverse = SPORT_RULES.flatMap((rule) => [...rule.keywords, ...rule.related])
  const hasAdventureSignal =
    hasAnyKeyword(content, sportUniverse) ||
    hasAnyKeyword(content, GENERAL_ADVENTURE_KEYWORDS)
  if (!hasAdventureSignal) return null

  const scores = SPORT_RULES.map((rule, index) => {
    const excluded = hasAnyKeyword(content, rule.exclude)
    const strongHits = excluded ? 0 : countKeywordHits(content, rule.keywords)
    const relatedHits = excluded ? 0 : countKeywordHits(content, rule.related)
    return {
      id: rule.id,
      index,
      score: strongHits * 3 + relatedHits,
      strongHits,
      relatedHits,
    }
  })

  const matched = scores
    .filter((item) => item.strongHits > 0 && item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (b.strongHits !== a.strongHits) return b.strongHits - a.strongHits
      if (b.relatedHits !== a.relatedHits) return b.relatedHits - a.relatedHits
      return a.index - b.index
    })
    .slice(0, MAX_TAGS_PER_ARTICLE)
    .map((item) => item.id)

  if (matched.length > 0) return matched

  if (hasAnyKeyword(content, GENERAL_ADVENTURE_KEYWORDS)) {
    return [GENERAL_TAG]
  }

  return null
}

async function timedFetch(url: string, revalidateSeconds: number) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: revalidateSeconds },
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, text/html",
        "User-Agent": "WildScotNewsAggregator/1.0",
      },
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function loadSources(): Promise<NewsSource[]> {
  const filePath = path.join(process.cwd(), "public", "news-sources.json")
  const raw = await fs.readFile(filePath, "utf8")
  const parsed = JSON.parse(raw) as NewsSource[]
  return parsed
    .filter((source) => source.enabled !== false)
    .filter((source) => source.approved === true)
    .filter((source) => APPROVED_SOURCE_IDS.has(source.id))
    .sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name))
}

function buildAbsoluteUrl(href: string, baseUrl: string) {
  try {
    return normalizeUrl(new URL(href, baseUrl).toString())
  } catch {
    return normalizeUrl(href)
  }
}

function extractHtmlListingLinks(source: NewsSource, listingHtml: string) {
  const listingUrl = source.feedUrl
  const baseHost = new URL(source.homepageUrl ?? source.feedUrl).host
  const includePatterns = source.includePatterns?.map((pattern) => pattern.toLowerCase()) ?? []
  const excludePatterns = source.excludePatterns?.map((pattern) => pattern.toLowerCase()) ?? []

  const anchors = [...listingHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  const seen = new Set<string>()
  const candidates: { url: string; anchorText?: string }[] = []

  for (const [, rawHref, label] of anchors) {
    if (!rawHref) continue
    const url = buildAbsoluteUrl(rawHref, listingUrl)
    if (!url.startsWith("http")) continue
    if (seen.has(url)) continue
    seen.add(url)

    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      continue
    }

    if (parsed.host !== baseHost) continue
    if (shouldExcludeByPath(url)) continue

    const lower = url.toLowerCase()
    if (includePatterns.length > 0 && !includePatterns.some((pattern) => lower.includes(pattern))) {
      continue
    }
    if (excludePatterns.some((pattern) => lower.includes(pattern))) {
      continue
    }

    const anchorText = cleanText(label)
    candidates.push({ url, anchorText })
    if (candidates.length >= MAX_HTML_LINKS_PER_SOURCE) break
  }

  return candidates
}

function parseHtmlArticlePage(url: string, html: string, fallbackTitle?: string) {
  const title = readMetaTag(html, "og:title") || readTitleTag(html) || fallbackTitle || "Untitled"
  const excerpt =
    readMetaTag(html, "description", "name") ||
    readMetaTag(html, "og:description") ||
    readMetaTag(html, "twitter:description", "name")
  const publishedAt = parseDate(readTimeTag(html))

  return {
    id: url,
    title,
    link: url,
    source: "",
    sourceId: "",
    publishedAt,
    excerpt,
    sports: [],
  } satisfies NewsArticle
}

async function fetchHtmlSourceArticles(source: NewsSource) {
  const listingResponse = await timedFetch(source.feedUrl, CACHE_TTL_MS / 1000)
  if (!listingResponse.ok) {
    throw new Error(`HTTP ${listingResponse.status}`)
  }

  const listingHtml = await listingResponse.text()
  const links = extractHtmlListingLinks(source, listingHtml).slice(0, MAX_HTML_ARTICLES_PER_SOURCE)
  if (links.length === 0) return [] as NewsArticle[]

  const articleResults = await Promise.allSettled(
    links.map(async (entry) => {
      const pageResponse = await timedFetch(entry.url, CACHE_TTL_MS / 1000)
      if (!pageResponse.ok) return null
      const pageHtml = await pageResponse.text()
      return parseHtmlArticlePage(entry.url, pageHtml, entry.anchorText)
    })
  )

  return articleResults.flatMap((result) => {
    if (result.status !== "fulfilled") return []
    if (!result.value) return []
    return [result.value]
  })
}

async function fetchSourceFeed(source: NewsSource): Promise<{
  articles: NewsArticle[]
  status: NewsSourceStatus
}> {
  try {
    let parsed: NewsArticle[] = []

    if (source.parser === "rss") {
      const response = await timedFetch(source.feedUrl, CACHE_TTL_MS / 1000)
      if (!response.ok) {
        return {
          articles: [],
          status: {
            sourceId: source.id,
            sourceName: source.name,
            ok: false,
            articleCount: 0,
            error: `HTTP ${response.status}`,
          },
        }
      }

      const xml = await response.text()
      const lower = xml.toLowerCase()
      const isAtom = lower.includes("<feed")
      const isRss = lower.includes("<rss") || lower.includes("<rdf:rdf")
      if (!isAtom && !isRss) {
        return {
          articles: [],
          status: {
            sourceId: source.id,
            sourceName: source.name,
            ok: false,
            articleCount: 0,
            error: "Unsupported feed format",
          },
        }
      }

      parsed = (isAtom ? parseAtom(xml) : parseRss(xml)).filter((article) => Boolean(article.link) && Boolean(article.title))
    } else {
      parsed = await fetchHtmlSourceArticles(source)
    }

    const classified = parsed
      .map((article) => {
        const sports = classifySports(article)
        if (!sports) return null
        return {
          ...article,
          source: source.name,
          sourceId: source.id,
          sports,
        }
      })
      .filter((article): article is NewsArticle => article !== null)

    return {
      articles: classified,
      status: {
        sourceId: source.id,
        sourceName: source.name,
        ok: true,
        articleCount: classified.length,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Fetch failed"
    return {
      articles: [],
      status: {
        sourceId: source.id,
        sourceName: source.name,
        ok: false,
        articleCount: 0,
        error: message,
      },
    }
  }
}

function dedupeByUrl(articles: NewsArticle[]) {
  const byUrl = new Map<string, NewsArticle>()
  for (const article of articles) {
    const key = normalizeUrl(article.link)
    if (!key) continue
    const existing = byUrl.get(key)
    if (!existing) {
      byUrl.set(key, { ...article, link: key })
      continue
    }
    const existingTime = existing.publishedAt?.getTime() ?? 0
    const nextTime = article.publishedAt?.getTime() ?? 0
    if (nextTime > existingTime) {
      byUrl.set(key, { ...article, link: key })
    }
  }
  return [...byUrl.values()]
}

function sortByDateDesc(articles: NewsArticle[]) {
  return [...articles].sort((a, b) => {
    const aTime = a.publishedAt?.getTime() ?? 0
    const bTime = b.publishedAt?.getTime() ?? 0
    return bTime - aTime
  })
}

function applyFilters(articles: NewsArticle[], options: FetchOptions) {
  const sportId = options.sportId?.trim()
  const search = options.search?.trim().toLowerCase()
  let filtered = [...articles]

  if (sportId && sportId !== "all") {
    filtered = filtered.filter((article) => article.sports.includes(sportId))
  }

  if (search) {
    filtered = filtered.filter((article) => {
      const title = article.title.toLowerCase()
      const excerpt = article.excerpt?.toLowerCase() ?? ""
      const source = article.source.toLowerCase()
      return title.includes(search) || excerpt.includes(search) || source.includes(search)
    })
  }

  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit)
  }

  return filtered
}

async function fetchAllSources() {
  const sources = await loadSources()
  const sourceResults = await Promise.all(sources.map((source) => fetchSourceFeed(source)))
  const combinedArticles = sourceResults.flatMap((result) => result.articles)
  const statuses = sourceResults.map((result) => result.status)

  return {
    articles: sortByDateDesc(dedupeByUrl(combinedArticles)),
    sourceStatuses: statuses,
  }
}

async function getCacheData() {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache
  }

  const { articles, sourceStatuses } = await fetchAllSources()
  cache = {
    fetchedAt: now,
    articles,
    sourceStatuses,
  }
  return cache
}

export async function getNewsFeed(options: FetchOptions = {}): Promise<NewsFeedResult> {
  const data = await getCacheData()
  const articles = applyFilters(data.articles, options)

  return {
    generatedAt: new Date(data.fetchedAt).toISOString(),
    total: articles.length,
    articles,
    sources: data.sourceStatuses,
  }
}

export async function getNewsArticles(options: FetchOptions = {}) {
  const feed = await getNewsFeed(options)
  return feed.articles
}

export function toNewsApiResponse(feed: NewsFeedResult): NewsApiResponse {
  return {
    generatedAt: feed.generatedAt,
    total: feed.total,
    sources: feed.sources,
    articles: feed.articles.map((article) => ({
      ...article,
      publishedAt: article.publishedAt?.toISOString(),
    })),
  }
}
