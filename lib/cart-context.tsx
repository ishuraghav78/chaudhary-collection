"use client"

import * as React from "react"

export type CartItem = {
  productId: string
  name: string
  slug: string
  image: string
  size: string
  quantity: number
  unitPrice: number
}

export type CustomerDetails = {
  name: string
  mobile: string
  address: string
  pincode: string
}

type CartState = {
  items: CartItem[]
  customer: CustomerDetails | null
}

type CartContextValue = {
  items: CartItem[]
  customer: CustomerDetails | null
  totalQuantity: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  updateSize: (productId: string, oldSize: string, newSize: string) => void
  clearCart: () => void
  saveCustomer: (details: CustomerDetails) => void
  hydrated: boolean
}

const STORAGE_KEY = "chaudhary-collection-cart-v1"

const CartContext = React.createContext<CartContextValue | null>(null)

function lineKey(productId: string, size: string) {
  return `${productId}__${size}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ items: [], customer: null })
  const [hydrated, setHydrated] = React.useState(false)

  // Load from localStorage on mount.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartState
        if (parsed && Array.isArray(parsed.items)) {
          setState({ items: parsed.items, customer: parsed.customer ?? null })
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  // Persist on change (after hydration to avoid clobbering).
  React.useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state, hydrated])

  const addItem = React.useCallback((item: CartItem) => {
    setState((prev) => {
      const key = lineKey(item.productId, item.size)
      const existing = prev.items.find((i) => lineKey(i.productId, i.size) === key)
      let items: CartItem[]
      if (existing) {
        items = prev.items.map((i) =>
          lineKey(i.productId, i.size) === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        )
      } else {
        items = [...prev.items, item]
      }
      return { ...prev, items }
    })
  }, [])

  const removeItem = React.useCallback((productId: string, size: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((i) => lineKey(i.productId, i.size) !== lineKey(productId, size)),
    }))
  }, [])

  const updateQuantity = React.useCallback((productId: string, size: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          lineKey(i.productId, i.size) === lineKey(productId, size)
            ? { ...i, quantity: Math.max(1, Math.min(20, Math.round(quantity))) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    }))
  }, [])

  const updateSize = React.useCallback((productId: string, oldSize: string, newSize: string) => {
    setState((prev) => {
      if (oldSize === newSize) return prev
      const target = prev.items.find(
        (i) => lineKey(i.productId, i.size) === lineKey(productId, oldSize),
      )
      if (!target) return prev
      // Merge if a line with the new size already exists.
      const mergeInto = prev.items.find(
        (i) => lineKey(i.productId, i.size) === lineKey(productId, newSize),
      )
      let items = prev.items.filter(
        (i) => lineKey(i.productId, i.size) !== lineKey(productId, oldSize),
      )
      if (mergeInto) {
        items = items.map((i) =>
          lineKey(i.productId, i.size) === lineKey(productId, newSize)
            ? { ...i, quantity: i.quantity + target.quantity }
            : i,
        )
      } else {
        items = [...items, { ...target, size: newSize }]
      }
      return { ...prev, items }
    })
  }, [])

  const clearCart = React.useCallback(() => {
    setState((prev) => ({ ...prev, items: [] }))
  }, [])

  const saveCustomer = React.useCallback((details: CustomerDetails) => {
    setState((prev) => ({ ...prev, customer: details }))
  }, [])

  const totalQuantity = React.useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  )
  const subtotal = React.useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
    [state.items],
  )

  const value: CartContextValue = {
    items: state.items,
    customer: state.customer,
    totalQuantity,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    updateSize,
    clearCart,
    saveCustomer,
    hydrated,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
