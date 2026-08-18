import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"

type ProductSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  products: Product[]
  viewAllHref?: string
  viewAllLabel?: string
  className?: string
  priorityFirst?: boolean
}

export function ProductSection({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = "View all",
  className,
  priorityFirst = false,
}: ProductSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            {eyebrow && (
              <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
            )}
            <h2 className="mt-2 text-3xl font-medium sm:text-4xl">{title}</h2>
            {description && (
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 whitespace-nowrap border-b border-foreground pb-1 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {viewAllLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={priorityFirst && i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
