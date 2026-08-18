"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"
import { InstagramIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { mainNav, siteConfig } from "@/lib/config"
import { useCart } from "@/lib/cart-context"
import { WhatsAppIcon } from "@/components/icons"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const pathname = usePathname()
  const { totalQuantity, hydrated } = useCart()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change.
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock scroll when the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-ml-1 inline-flex items-center justify-center rounded-sm p-2 text-foreground transition-colors hover:text-accent lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo (centered on mobile, left on desktop) */}
        <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-light uppercase tracking-[0.14em] transition-colors hover:text-accent",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm p-2 text-foreground transition-colors hover:text-accent sm:inline-flex"
            aria-label="Chaudhary Collection on Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm p-2 text-foreground transition-colors hover:text-accent sm:inline-flex"
            aria-label="Chat with Chaudhary Collection on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link
            href="/cart"
            className="relative inline-flex items-center rounded-sm p-2 text-foreground transition-colors hover:text-accent"
            aria-label={`Cart${hydrated && totalQuantity > 0 ? `, ${totalQuantity} items` : ""}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {hydrated && totalQuantity > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-background shadow-xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm p-2 text-foreground hover:text-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-border/60 py-4 text-base uppercase tracking-[0.12em] transition-colors hover:text-accent",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-3 border-t border-border px-5 py-6">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <InstagramIcon className="h-5 w-5" /> Instagram
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
