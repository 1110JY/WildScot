import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sports, getClubsBySport } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ExternalLink,
  Info,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">
                New to adventure sports? Start here.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              You don't need experience, expensive gear, or to know anyone.
              Pick a sport that looks interesting and we'll show you how to
              get involved.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          {/* Quick tips */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Info className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                No jargon, no gatekeeping
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Every sport guide is written for someone who has never done it
                before. We explain what to expect in plain language.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                Trusted providers only
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                We highlight clubs and providers affiliated with official
                governing bodies so you can book with confidence.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                Safety comes first
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Outdoor conditions in Scotland change fast. We always link to
                official safety guidance and encourage checking conditions
                locally.
              </p>
            </div>
          </div>

          {/* Sport cards */}
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Choose a sport
          </h2>

          <div className="flex flex-col gap-8">
            {sports.map((sport) => {
              const clubCount = getClubsBySport(sport.id).length
              return (
                <div
                  key={sport.id}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative aspect-[16/9] lg:aspect-auto lg:w-80">
                      <Image
                        src={sport.image || "/placeholder.svg"}
                        alt={sport.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 lg:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {sport.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {sport.seasonality === "year-round"
                            ? "Year-round"
                            : "Seasonal"}
                        </Badge>
                      </div>

                      <div className="mb-3 rounded-md bg-primary/5 p-3">
                        <p className="text-sm font-medium text-primary">
                          Getting started:
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {sport.beginnerDescription}
                        </p>
                      </div>

                      {sport.seasonNote && (
                        <p className="mb-3 text-xs text-muted-foreground">
                          {sport.seasonNote}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                        <Button size="sm" asChild>
                          <Link href={`/sports/${sport.slug}`}>
                            Explore {sport.name.toLowerCase()}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {clubCount} {clubCount === 1 ? "club" : "clubs"}{" "}
                          listed
                        </span>
                        {sport.governingBody && (
                          <a
                            href={sport.governingBodyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            {sport.governingBody}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center lg:px-8 lg:py-16">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Still not sure?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Browse all clubs and filter by beginner-friendly options to
              find something near you.
            </p>
            <Button asChild className="mt-6">
              <Link href="/clubs">
                Browse all clubs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
