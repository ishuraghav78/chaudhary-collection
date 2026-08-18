import type { Metadata } from "next"
import { CheckoutFlow } from "@/components/checkout-flow"

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review your bag, add delivery details and place your order on WhatsApp.",
}

export default function CartPage() {
  return <CheckoutFlow />
}
