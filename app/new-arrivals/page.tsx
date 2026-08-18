import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProductCard } from "@/components/product-card"
import { getNewArrivals } from "@/lib/products"

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest arrivals at Chaudhary Collection — fresh pieces added to the boutique.",
}

export default function NewArrivalsPage() {
  const products = getNewArrivals()

  return (
    <>
      <PageHeader
        eyebrow="Just in"
        title="New Arrivals"
        description="Fresh off the rail — the newest additions to the boutique."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </div>
    </>
  )
}
