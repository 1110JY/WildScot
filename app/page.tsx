import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { SportGrid } from "@/components/home/sport-grid"
import { HowItWorks } from "@/components/home/how-it-works"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { TrustBanner } from "@/components/home/trust-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <SportGrid />
        <HowItWorks />
        <UpcomingEvents />
        <TrustBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
