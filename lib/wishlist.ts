"use client"

import * as React from "react"

const KEY = "chaudhary-collection-wishlist-v1"
const EVENT = "cc-wishlist-change"

function read(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function write(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids))
  window.dispatchEvent(new CustomEvent(EVENT))
}

// Lightweight wishlist backed by localStorage, synced across components
// via a custom window event.
export function useWishlist(productId: string) {
  const [ids, setIds] = React.useState<string[]>([])

  React.useEffect(() => {
    setIds(read())
    const handler = () => setIds(read())
    window.addEventListener(EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener(EVENT, handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  const wished = ids.includes(productId)

  const toggle = React.useCallback(() => {
    const current = read()
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]
    write(next)
  }, [productId])

  return { wished, toggle }
}
