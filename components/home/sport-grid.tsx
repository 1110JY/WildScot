"use client"

import Link from "next/link"
import Image from "next/image"
import { sports } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

export function SportGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-14">
        <p className="text-label mb-4">
          Pick your adventure
        </p>
        <h2 className="text-section-lg text-foreground">
          What kind of adventure are you after?
        </h2>
      </div>

      {/* Asymmetric bento-style grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {sports.map((sport, i) => (
          <Link
            key={sport.id}
            href={`/sports/${sport.slug}`}
            className={`card-lift group relative flex overflow-hidden rounded-xl ${
              i === 0 ? "lg:row-span-2 lg:aspect-auto sm:aspect-[4/3] aspect-[4/3]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={sport.image || "/placeholder.svg"}
              alt={sport.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Sport-specific color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30"
              style={{ backgroundColor: sport.accentColor }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />

            <div className="relative flex flex-1 flex-col justify-end p-5 sm:p-6">
              <div className="flex items-end justify-between">
                <div>
                  <span
                    className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] opacity-80"
                    style={{ color: sport.accentColor }}
                  >
                    {sport.seasonality === "year-round" ? "Year-round" : "Seasonal"}
                  </span>
                  <h3 className="text-card-heading text-card">
                    {sport.name}
                  </h3>
                  <p className="mt-1 text-sm text-card/70 italic">
                    {sport.tagline}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card/10 text-card backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-card group-hover:text-foreground">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
