"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart, type CustomerDetails } from "@/lib/cart-context"
import { getProductBySlug, formatPrice } from "@/lib/products"
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp"
import { WhatsAppIcon } from "@/components/icons"

type Step = "cart" | "details" | "review"

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Bag" },
  { id: "details", label: "Details" },
  { id: "review", label: "Review" },
]

export function CheckoutFlow() {
  const {
    items,
    subtotal,
    customer,
    hydrated,
    removeItem,
    updateQuantity,
    updateSize,
    saveCustomer,
  } = useCart()
  const [step, setStep] = React.useState<Step>("cart")

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center text-muted-foreground">
        Loading your bag…
      </div>
    )
  }

  if (items.length === 0) {
    return <EmptyBag />
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <Stepper current={stepIndex} />

      <div className="mt-10">
        {step === "cart" && (
          <CartStep
            onContinue={() => setStep("details")}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            updateSize={updateSize}
          />
        )}
        {step === "details" && (
          <DetailsStep
            initial={customer}
            onBack={() => setStep("cart")}
            onContinue={(details) => {
              saveCustomer(details)
              setStep("review")
            }}
          />
        )}
        {step === "review" && customer && (
          <ReviewStep customer={customer} onBack={() => setStep("details")} />
        )}
        {step === "review" && !customer && (
          <div className="text-center text-muted-foreground">
            Please add your details first.
            <button
              className="ml-2 underline"
              onClick={() => setStep("details")}
            >
              Go back
            </button>
          </div>
        )}
      </div>

      {step !== "review" && (
        <aside className="mt-12 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Final total is confirmed with you on WhatsApp before dispatch.
          </p>
        </aside>
      )}
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 md:gap-4">
      {STEPS.map((s, i) => {
        const active = i === current
        const done = i < current
        return (
          <li key={s.id} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                  active && "border-primary bg-primary text-primary-foreground",
                  done && "border-primary bg-primary text-primary-foreground",
                  !active && !done && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-xs uppercase tracking-widest",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="h-px w-6 bg-border md:w-12" aria-hidden />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function EmptyBag() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <ShoppingBag className="h-7 w-7 text-muted-foreground" />
      </div>
      <h1 className="mt-6 font-serif text-2xl">Your bag is empty</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore our latest arrivals and add pieces you love.
      </p>
      <Link
        href="/collections"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Browse collections
      </Link>
    </div>
  )
}

function CartStep({
  onContinue,
  removeItem,
  updateQuantity,
  updateSize,
}: {
  onContinue: () => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, q: number) => void
  updateSize: (productId: string, oldSize: string, newSize: string) => void
}) {
  const { items } = useCart()

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl">Your Bag</h1>
      <ul className="mt-6 divide-y divide-border">
        {items.map((item) => {
          const product = getProductBySlug(item.slug)
          const availableSizes = product?.sizes ?? [item.size]
          return (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 py-6"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-md bg-secondary md:w-24"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-medium leading-snug hover:underline"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    Size
                    <select
                      value={item.size}
                      onChange={(e) =>
                        updateSize(item.productId, item.size, e.target.value)
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                    >
                      {availableSizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex items-center rounded-full border border-border">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto pt-3 font-serif text-lg">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/collections"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Add delivery details
        </button>
      </div>
    </div>
  )
}

function DetailsStep({
  initial,
  onBack,
  onContinue,
}: {
  initial: CustomerDetails | null
  onBack: () => void
  onContinue: (details: CustomerDetails) => void
}) {
  const [form, setForm] = React.useState<CustomerDetails>(
    initial ?? { name: "", mobile: "", address: "", pincode: "" },
  )
  const [errors, setErrors] = React.useState<Partial<Record<keyof CustomerDetails, string>>>({})

  const validate = () => {
    const next: Partial<Record<keyof CustomerDetails, string>> = {}
    if (form.name.trim().length < 2) next.name = "Please enter your full name."
    if (!/^[0-9]{10}$/.test(form.mobile.replace(/\D/g, "")))
      next.mobile = "Enter a valid 10-digit mobile number."
    if (form.address.trim().length < 8)
      next.address = "Please enter your full delivery address."
    if (!/^[0-9]{6}$/.test(form.pincode.trim()))
      next.pincode = "Enter a valid 6-digit pincode."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onContinue(form)
  }

  const field = (
    key: keyof CustomerDetails,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label
        htmlFor={key}
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={key}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className={cn(
          "mt-2 w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
          errors[key] ? "border-destructive" : "border-border",
        )}
        {...props}
      />
      {errors[key] && (
        <p className="mt-1 text-xs text-destructive">{errors[key]}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg">
      <h1 className="font-serif text-2xl md:text-3xl">Delivery Details</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We use these details to confirm and dispatch your order over WhatsApp.
      </p>

      <div className="mt-8 grid gap-5">
        {field("name", "Full name", { placeholder: "e.g. Priya Sharma", autoComplete: "name" })}
        {field("mobile", "Mobile number", {
          placeholder: "10-digit number",
          inputMode: "numeric",
          autoComplete: "tel",
        })}
        <div>
          <label
            htmlFor="address"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Delivery address
          </label>
          <textarea
            id="address"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            rows={3}
            placeholder="House / flat, street, area, city, state"
            className={cn(
              "mt-2 w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
              errors.address ? "border-destructive" : "border-border",
            )}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-destructive">{errors.address}</p>
          )}
        </div>
        {field("pincode", "Pincode", {
          placeholder: "6-digit pincode",
          inputMode: "numeric",
          autoComplete: "postal-code",
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bag
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Review order
        </button>
      </div>
    </form>
  )
}

function ReviewStep({
  customer,
  onBack,
}: {
  customer: CustomerDetails
  onBack: () => void
}) {
  const { items, subtotal, clearCart } = useCart()
  const orderUrl = React.useMemo(
    () => buildWhatsAppOrderUrl(items, customer),
    [items, customer],
  )

  const placeOrder = () => {
    // Open WhatsApp with the pre-filled order, then clear the bag.
    window.open(orderUrl, "_blank", "noopener,noreferrer")
    clearCart()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-2xl md:text-3xl">Review Your Order</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Confirm everything looks right. Tapping the button opens WhatsApp with your
        order details already filled in — just press send.
      </p>

      <section className="mt-8 rounded-lg border border-border p-5">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Deliver to
        </h2>
        <div className="mt-3 space-y-0.5 text-sm">
          <p className="font-medium">{customer.name}</p>
          <p className="text-muted-foreground">{customer.mobile}</p>
          <p className="text-muted-foreground">{customer.address}</p>
          <p className="text-muted-foreground">Pincode: {customer.pincode}</p>
        </div>
        <button
          onClick={onBack}
          className="mt-4 text-xs font-medium text-primary underline underline-offset-4"
        >
          Edit details
        </button>
      </section>

      <section className="mt-6 rounded-lg border border-border">
        <h2 className="border-b border-border px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground">
          Items
        </h2>
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex items-center gap-4 px-5 py-4"
            >
              <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-md bg-secondary">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">
                  Size {item.size} · Qty {item.quantity}
                </p>
              </div>
              <span className="text-sm tabular-nums">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
        </div>
      </section>

      <button
        onClick={placeOrder}
        className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Place order on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        You&apos;ll be redirected to WhatsApp to send your order to our team.
      </p>
    </div>
  )
}
