"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { categories, getAllProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export function CollectionsView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get("category") ?? "all"

  const filters = React.useMemo(
    () => [{ slug: "all", name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))],
    [],
  )

  const products = React.useMemo(() => {
    const all = getAllProducts()
    return active === "all" ? all : all.filter((p) => p.category === active)
  }, [active])

  const setFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === "all") params.delete("category")
    else params.set("category", slug)
    const query = params.toString()
    router.replace(query ? `/collections?${query}` : "/collections", { scroll: false })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {filters.map((f) => (
          <button
            key={f.slug}
            type="button"
            onClick={() => setFilter(f.slug)}
            aria-pressed={active === f.slug}
            className={cn(
              "rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors",
              active === f.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No pieces in this collection yet. Check back soon.
        </p>
      )}
    </div>
  )
}
