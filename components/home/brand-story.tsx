import Image from "next/image"
import { storeImages } from "@/lib/config"

// Introduces Chaudhary Collection as a physical boutique.
// The image is a replaceable slot for a real store photograph.
export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
          <Image
            src={storeImages.brandInterior || "/placeholder.svg"}
            alt="Inside the Chaudhary Collection boutique"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">Our boutique</p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            A boutique built on craft and care
          </h2>
          <div className="mt-6 space-y-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Chaudhary Collection is a premium clothing boutique where every piece is chosen by
              hand. We bring together traditional Indian craftsmanship and contemporary silhouettes
              — pieces made to be worn, loved and remembered.
            </p>
            <p>
              Step into our store for a personal shopping experience, or browse our latest
              collections online and place your order in minutes over WhatsApp.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Curated</dt>
              <dd className="mt-1 font-serif text-2xl">Handpicked</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Quality</dt>
              <dd className="mt-1 font-serif text-2xl">Premium</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Service</dt>
              <dd className="mt-1 font-serif text-2xl">Personal</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
