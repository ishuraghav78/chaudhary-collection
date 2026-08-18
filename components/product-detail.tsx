"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, Heart, Minus, Plus, Ruler, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, sizeCharts, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist"
import { WhatsAppIcon } from "@/components/icons"
import { buildWhatsAppChatUrl, absoluteProductUrl } from "@/lib/whatsapp"
import { siteConfig } from "@/lib/config"

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { wished, toggle } = useWishlist(product.id)
  const [activeImage, setActiveImage] = React.useState(0)
  const [size, setSize] = React.useState<string | null>(
    product.sizeChart === "onesize" ? product.sizes[0] : null,
  )
  const [quantity, setQuantity] = React.useState(1)
  const [showChart, setShowChart] = React.useState(false)
  const [sizeError, setSizeError] = React.useState(false)
  const [added, setAdded] = React.useState(false)

  const price = product.salePrice ?? product.price
  const chart = sizeCharts[product.sizeChart]

  const requireSize = () => {
    if (!size) {
      setSizeError(true)
      return false
    }
    return true
  }

  const handleAdd = () => {
    if (!product.inStock) return
    if (!requireSize()) return
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      size: size!,
      quantity,
      unitPrice: price,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  const enquiryUrl = React.useMemo(() => {
    const parts = [
      "Hello Chaudhary Collection 👋",
      "",
      "I'm interested in this product:",
      "",
      product.name,
      `Size: ${size ?? "—"}`,
      `Quantity: ${quantity}`,
      `Price: ${formatPrice(price)}`,
      `Link: ${absoluteProductUrl(product.slug)}`,
    ]
    return buildWhatsAppChatUrl(parts.join("\n"))
  }, [product, size, quantity, price])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/collections" className="hover:text-accent">Collections</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary/50">
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square w-20 overflow-hidden rounded-sm border",
                    i === activeImage ? "border-foreground" : "border-border",
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img || "/placeholder.svg"} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">
            {product.collection}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-medium sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl text-foreground">{formatPrice(price)}</span>
            {product.salePrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span
              className={cn(
                "ml-1 rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
                product.inStock
                  ? "bg-accent/15 text-accent-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {product.inStock ? "In stock" : "Sold out"}
            </span>
          </div>

          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-[0.12em]">
                Size{product.sizeChart === "onesize" ? "" : ""}
              </h2>
              <button
                type="button"
                onClick={() => setShowChart((s) => !s)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                aria-expanded={showChart}
              >
                <Ruler className="h-3.5 w-3.5" /> Size chart
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s)
                    setSizeError(false)
                  }}
                  aria-pressed={size === s}
                  className={cn(
                    "min-w-12 rounded-sm border px-4 py-2.5 text-sm transition-colors",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs text-destructive">Please select a size to continue.</p>
            )}

            {showChart && (
              <div className="mt-4 overflow-hidden rounded-sm border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {chart.columns.map((c) => (
                        <th key={c} className="px-4 py-2.5 font-medium">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row) => (
                      <tr key={row.size} className="border-t border-border">
                        <td className="px-4 py-2.5 font-medium">{row.size}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-2.5 text-muted-foreground">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.12em]">Quantity</h2>
            <div className="mt-3 inline-flex items-center rounded-sm border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-accent disabled:opacity-40"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-accent disabled:opacity-40"
                aria-label="Increase quantity"
                disabled={quantity >= 20}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Sold Out"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-pressed={wished}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className="inline-flex h-auto w-14 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-accent"
              >
                <Heart className={cn("h-5 w-5", wished && "fill-accent text-accent")} />
              </button>
            </div>
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground px-6 py-4 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Questions? Message us at {siteConfig.whatsappDisplay}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
