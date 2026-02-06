import { format } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { NewsArticle } from "@/lib/news/types"

type Props = {
  article: NewsArticle
}

export function NewsCard({ article }: Props) {
  return (
    <div className="card-lift flex h-full flex-col justify-between rounded-lg border border-border bg-card/95 p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">{article.source}</span>
          {article.publishedAt && (
            <span className="text-muted-foreground/80">
              {format(article.publishedAt, "d MMM yyyy")}
            </span>
          )}
        </div>
        <h3 className="text-card-heading text-foreground">
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="text-body-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {article.sports.map((sport) => (
          <Badge key={sport} variant="secondary" className="text-xs capitalize">
            {sport.replace(/-/g, " ")}
          </Badge>
        ))}
        <Link
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold text-primary hover:underline"
        >
          Read source
        </Link>
      </div>
    </div>
  )
}
