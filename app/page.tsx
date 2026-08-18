import { Hero } from "@/components/home/hero"
import { FeaturedCollections } from "@/components/home/featured-collections"
import { EditorialBand } from "@/components/home/editorial-band"
import { BrandStory } from "@/components/home/brand-story"
import { ProductSection } from "@/components/product-section"
import { WhatsAppCta } from "@/components/whatsapp-cta"
import { InstagramSection } from "@/components/instagram-section"
import { getNewArrivals, getTrending } from "@/lib/products"

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 4)
  const trending = getTrending().slice(0, 4)

  return (
    <>
      <Hero />

      <FeaturedCollections />

      <EditorialBand
        image="/editorial/editorial-2.png"
        eyebrow="The edit"
        title="Dressed for every celebration"
        copy="From festive ethnic wear to everyday essentials, our collections are designed to move effortlessly through your life — refined, comfortable and quietly luxurious."
        ctaLabel="Explore Women"
        ctaHref="/collections?category=women"
      />

      <ProductSection
        eyebrow="Just in"
        title="New Arrivals"
        description="The latest pieces to land at the boutique."
        products={newArrivals}
        viewAllHref="/new-arrivals"
        priorityFirst
      />

      <EditorialBand
        image="/editorial/editorial-1.png"
        eyebrow="Menswear"
        title="Tailored to feel like your own"
        copy="Clean lines, considered fabrics and a fit that lasts. Discover menswear made for the everyday and the occasion alike."
        ctaLabel="Explore Men"
        ctaHref="/collections?category=men"
        reverse
      />

      <ProductSection
        className="bg-secondary/30"
        eyebrow="Most loved"
        title="Trending Now"
        description="The pieces our customers keep coming back for."
        products={trending}
        viewAllHref="/collections"
      />

      <BrandStory />

      <WhatsAppCta />

      <InstagramSection />
    </>
  )
}
