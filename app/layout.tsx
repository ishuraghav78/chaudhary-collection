import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { siteConfig } from "@/lib/config"
import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Premium Boutique Fashion`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  generator: "v0.app",
  keywords: [
    "Chaudhary Collection",
    "boutique",
    "fashion",
    "ethnic wear",
    "men's fashion",
    "women's fashion",
    "traditional wear",
  ],
  openGraph: {
    title: `${siteConfig.name} — Premium Boutique Fashion`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Premium Boutique Fashion`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
