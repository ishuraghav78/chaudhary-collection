import Image from "next/image"
import { Instagram } from "lucide-react"
import { siteConfig } from "@/lib/config"

// A visual, static Instagram-style gallery (no API). Tiles reuse the
// boutique's own imagery and link out to the real Instagram profile.
const tiles = [
  "/products/emerald-saree.png",
  "/editorial/editorial-2.png",
  "/products/black-shirt.png",
  "/products/ivory-lehenga.png",
  "/editorial/editorial-1.png",
  "/products/coord-set.png",
]

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">Follow along</p>
        <h2 className="text-3xl font-medium sm:text-4xl">{siteConfig.instagramHandle}</h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Styling ideas, new arrivals and behind-the-scenes from the boutique.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {tiles.map((src, i) => (
          <a
            key={src}
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-sm bg-secondary"
            aria-label="View on Instagram"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-background opacity-0 transition-all duration-300 group-hover:bg-foreground/30 group-hover:opacity-100">
              <Instagram className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-foreground px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <Instagram className="h-4 w-4" />
          Follow on Instagram
        </a>
      </div>
    </section>
  )
}
