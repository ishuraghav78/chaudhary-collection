import { siteConfig } from "@/lib/config"
import type { CartItem, CustomerDetails } from "@/lib/cart-context"
import { formatPrice, productUrl } from "@/lib/products"

// Build an absolute product URL so the WhatsApp message links to the exact page.
export function absoluteProductUrl(slug: string): string {
  const base = siteConfig.url.replace(/\/$/, "")
  return `${base}${productUrl(slug)}`
}

/**
 * Build the pre-filled WhatsApp order message.
 * Includes both product NAME and product LINK for every item, so the order is
 * readable even if the customer removes links before sending.
 */
export function buildOrderMessage(items: CartItem[], customer: CustomerDetails): string {
  const lines: string[] = []

  lines.push("Hello Chaudhary Collection 👋")
  lines.push("")
  lines.push("I want to place an order.")
  lines.push("")
  lines.push("CUSTOMER DETAILS")
  lines.push("")
  lines.push(`Name: ${customer.name}`)
  lines.push(`Mobile: ${customer.mobile}`)
  lines.push(`Address: ${customer.address}`)
  lines.push(`Pincode: ${customer.pincode}`)
  lines.push("")
  lines.push("ORDER DETAILS")
  lines.push("")

  let total = 0
  items.forEach((item, index) => {
    const lineTotal = item.unitPrice * item.quantity
    total += lineTotal
    lines.push(`${index + 1}. ${item.name}`)
    lines.push(`   Size: ${item.size}`)
    lines.push(`   Quantity: ${item.quantity}`)
    lines.push(`   Price: ${formatPrice(item.unitPrice)}`)
    lines.push(`   Product Link: ${absoluteProductUrl(item.slug)}`)
    lines.push("")
  })

  lines.push(`TOTAL: ${formatPrice(total)}`)
  lines.push("")
  lines.push("Thank you.")

  return lines.join("\n")
}

// Full click-to-chat URL with the pre-filled, URL-encoded message.
export function buildWhatsAppOrderUrl(items: CartItem[], customer: CustomerDetails): string {
  const text = encodeURIComponent(buildOrderMessage(items, customer))
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}

// Generic "chat with us" link (no order payload) for CTAs.
export function buildWhatsAppChatUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
