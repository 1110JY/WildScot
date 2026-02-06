export type NewsSource = {
  id: string
  name: string
  feedUrl: string
  sports: string[]
  enabled?: boolean
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
