import Link from "next/link"
import { mainNav, siteConfig } from "@/lib/config"
import { WhatsAppIcon, InstagramIcon } from "@/components/icons"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Chaudhary
              <span className="ml-2 text-sm font-light uppercase tracking-[0.3em] text-accent">
                Collection
              </span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Connect
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" /> {siteConfig.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li className="text-sm text-muted-foreground">{siteConfig.addressLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Handpicked, curated with care.</p>
        </div>
      </div>
    </footer>
  )
}
