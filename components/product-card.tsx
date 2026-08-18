"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, Heart, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist"

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart()
  const { wished, toggle } = useWishlist(product.id)
  const [added, setAdded] = React.useState(false)
  const price = product.salePrice ?? product.price

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      size: product.sizes[0],
      quantity: 1,
      unitPrice: price,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-sm bg-secondary/50">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <div className="relative aspect-[3/4]">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={priority}
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.salePrice && (
            <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-sm bg-foreground/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={toggle}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-accent"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-accent text-accent")} />
        </button>

        {/* Add to cart (reveals on hover, always visible on touch) */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={cn(
            "absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300",
            "opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/product/${product.slug}`} className="transition-colors hover:text-accent">
          <h3 className="text-pretty text-base font-medium leading-snug">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{formatPrice(price)}</span>
          {product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {product.sizeChart === "onesize" ? "Free size" : `Sizes ${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`}
        </p>
      </div>
    </article>
  )
}
