import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"

import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const _poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700", "800"],
  style: ["normal"],
})

export const metadata: Metadata = {
  title: "WildScot - Discover Adventure Sports in Scotland",
  description:
    "Find, understand, and access niche and adventure sports across Scotland. Browse clubs, courses, and events for surfing, climbing, MTB, wild swimming, and more.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a7a6d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
