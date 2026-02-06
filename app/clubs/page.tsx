import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ClubFilters } from "@/components/clubs/club-filters"
import Image from "next/image"

export default function ClubsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/sport-climbing.jpg"
              alt="Climber on a Scottish crag"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-transparent" />
            <div className="absolute inset-0 bg-foreground/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
            <p className="text-label text-card/90">Who do you want to train with?</p>
            <h1 className="text-section text-card mt-4 max-w-2xl">
              Trusted clubs and providers, ready to book.
            </h1>
            <p className="text-body-lg mt-5 max-w-2xl text-card/80">
              Filter by sport, region, ability, and cost. Every listing is vetted for accreditation so you can focus on getting out there.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-card/80 text-sm uppercase tracking-[0.18em]">
              <span className="rounded-full bg-card/10 px-4 py-2">Beginner ready</span>
              <span className="rounded-full bg-card/10 px-4 py-2">Accredited</span>
              <span className="rounded-full bg-card/10 px-4 py-2">Scotland-wide</span>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-14 bg-background"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
          />
        </section>
        <ClubFilters />
      </main>
      <SiteFooter />
    </div>
  )
}
