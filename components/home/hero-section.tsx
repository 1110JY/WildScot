"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const actionWords = ["Surf", "Climb", "Ride", "Swim", "Ski", "Paddle"]

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % actionWords.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Action hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-action.jpg"
          alt="Surfer cutting through a wave on the Scottish coast"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:py-36 lg:px-8 lg:py-44">
        <div
          className={`max-w-2xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Punchy tagline */}
          <p className="text-label mb-6">
            Adventure starts here
          </p>

          <h1 className="text-hero text-card">
            <span className="text-balance">
              {"Cold water. Fresh snow. Dirt trails. "}
            </span>
            <span className="relative inline-block">
              <span
                key={currentWord}
                className="inline-block text-accent animate-slide-up"
              >
                {actionWords[currentWord]}
              </span>
            </span>
            <span className="text-card">{" Scotland."}</span>
          </h1>

          <p className="text-body-lg mt-8 max-w-md text-card/85">
            Find your next adventure. Clubs, courses, and events across Scotland
            - no experience needed, just curiosity.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              size="lg"
              asChild
              className="group bg-accent text-accent-foreground font-semibold text-base uppercase tracking-wide hover:bg-accent/90 transition-all"
            >
              <Link href="/sports">
                Explore Sports
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-card/40 bg-transparent text-card font-semibold text-base uppercase tracking-wide hover:bg-card/10 hover:text-card transition-all"
            >
              <Link href="/clubs">
                <MapPin className="mr-2 h-4 w-4" />
                Find Near Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Angled bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
    </section>
  )
}

