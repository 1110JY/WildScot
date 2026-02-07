export type NewsSource = {
  id: string
  name: string
  feedUrl: string
  parser: "rss" | "html"
  tier: 1 | 2
  homepageUrl?: string
  includePatterns?: string[]
  excludePatterns?: string[]
  enabled?: boolean
  approved?: boolean
}

export type NewsArticle = {
  id: string
  title: string
  link: string
  source: string
  sourceId: string
  publishedAt?: Date
  excerpt?: string
  sports: string[]
}

export type NewsSourceStatus = {
  sourceId: string
  sourceName: string
  ok: boolean
  articleCount: number
  error?: string
}

export type NewsFeedResult = {
  generatedAt: string
  total: number
  articles: NewsArticle[]
  sources: NewsSourceStatus[]
}

export type NewsApiArticle = Omit<NewsArticle, "publishedAt"> & {
  publishedAt?: string
}

export type NewsApiResponse = Omit<NewsFeedResult, "articles"> & {
  articles: NewsApiArticle[]
}
