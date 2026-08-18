import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig, storeImages } from "@/lib/config"

// Full-width hero built around the real store exterior photograph.
// Replace the file at `storeImages.heroExterior` with the actual store photo.
export function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* Store photograph slot */}
      <Image
        src={storeImages.heroExterior || "/placeholder.svg"}
        alt="Chaudhary Collection boutique store"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-foreground/40" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl cc-fade-up">
            <p className="text-xs font-light uppercase tracking-[0.34em] text-background/80">
              Premium Boutique
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-[1.05] text-background sm:text-6xl lg:text-7xl">
              {siteConfig.name}
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-background/85 sm:text-lg">
              {siteConfig.tagline} Elegant men&apos;s and women&apos;s fashion, curated for the
              modern wardrobe.
            </p>
            <Link
              href="/collections"
              className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-background px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
