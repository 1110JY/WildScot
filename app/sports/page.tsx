import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sports, getClubsBySport } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function SportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/sport-mtb.jpg"
              alt="Mountain biker kicking up dirt on a Scottish trail"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-transparent" />
            <div className="absolute inset-0 bg-foreground/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
            <p className="text-label text-card/90">What terrain are you chasing?</p>
            <h1 className="text-section text-card mt-4 max-w-2xl">
              Pedal. Paddle. Climb. Pick your line across Scotland.
            </h1>
            <p className="text-body-lg mt-5 max-w-xl text-card/80">
              Each sport comes with a beginner guide, trusted providers, and events. Choose the energy that fits you and go.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-card/80 text-sm uppercase tracking-[0.18em]">
              <span className="rounded-full bg-card/10 px-4 py-2">Cold water</span>
              <span className="rounded-full bg-card/10 px-4 py-2">Fresh snow</span>
              <span className="rounded-full bg-card/10 px-4 py-2">Dirt trails</span>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-background"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-6">
            {sports.map((sport) => {
              const clubCount = getClubsBySport(sport.id).length
              return (
                <Link
                  key={sport.id}
                  href={`/sports/${sport.slug}`}
                  className="card-lift group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card/95 shadow-sm backdrop-blur sm:flex-row"
                >
                  <div
                    className="absolute left-0 top-0 h-1 w-full"
                    style={{ backgroundColor: sport.accentColor }}
                  />
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:w-72 lg:w-96">
                    <Image
                      src={sport.image || "/placeholder.svg"}
                      alt={sport.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25"
                      style={{ backgroundColor: sport.accentColor }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <h2 className="font-semibold text-lg text-foreground group-hover:text-primary">
                        {sport.name}
                      </h2>
                      <Badge variant="secondary" className="text-xs">
                        {sport.seasonality === "year-round"
                          ? "Year-round"
                          : "Seasonal"}
                      </Badge>
                    </div>
                    <p className="text-body-sm text-muted-foreground">
                      {sport.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {clubCount} {clubCount === 1 ? "club" : "clubs"} listed
                      </span>
                      {sport.governingBody && (
                        <span>
                          Governed by {sport.governingBody}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                      Explore {sport.name.toLowerCase()}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
