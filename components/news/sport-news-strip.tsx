import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getNewsArticles } from "@/lib/news/fetch-news"

type Props = {
  sportId: string
}

export async function SportNewsStrip({ sportId }: Props) {
  const articles = await getNewsArticles({ sportId, limit: 3 })

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mt-12 rounded-xl border border-border bg-card/90 p-5 shadow-sm backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-label mb-1">Latest news</p>
          <h3 className="text-card-heading text-foreground">About this sport</h3>
        </div>
        <Link
          href={`/news?sport=${sportId}`}
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="group flex items-start gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-border/80 hover:bg-muted/50">
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                <Link href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  {article.title}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                {article.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
