import Link from "next/link"
import { Mountain } from "lucide-react"

const footerLinks = {
  discover: [
    { name: "Browse Sports", href: "/sports" },
    { name: "Find Clubs", href: "/clubs" },
    { name: "Events & Courses", href: "/events" },
    { name: "Get Started", href: "/get-started" },
    { name: "News", href: "/news" },
  ],
  sports: [
    { name: "Surfing", href: "/sports/surfing" },
    { name: "Climbing", href: "/sports/climbing" },
    { name: "Mountain Biking", href: "/sports/mountain-biking" },
    { name: "Wild Swimming", href: "/sports/wild-swimming" },
    { name: "Snowsports", href: "/sports/snowsports" },
    { name: "Paddling", href: "/sports/paddling" },
  ],
  about: [
    { name: "About WildScot", href: "#" },
    { name: "Our Partners", href: "#" },
    { name: "Safety Information", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary-foreground" />
              <span className="font-bold font-display text-base text-card">
                WildScot
              </span>
            </Link>
            <p className="text-body-sm mt-3 text-card/70">
              Helping people across Scotland discover, understand, and access
              adventure and niche sports.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-card/50">
              Discover
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-card/70 transition-colors hover:text-card"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-card/50">
              Sports
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.sports.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-card/70 transition-colors hover:text-card"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-card/50">
              About
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-card/70 transition-colors hover:text-card"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-card/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-card/50">
            WildScot is a gateway platform. We signpost to official clubs, governing
            bodies, and providers. Always check conditions locally before
            participating in outdoor activities.
          </p>
          <p className="shrink-0 text-xs text-card/50">
            2026 WildScot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
