// Centralized brand + contact configuration.
// Update these values in one place to change them across the whole site.

export const siteConfig = {
  name: "Chaudhary Collection",
  shortName: "Chaudhary Collection",
  tagline: "Timeless style, thoughtfully curated.",
  description:
    "Chaudhary Collection is a premium boutique offering elegant men's and women's fashion — traditional and contemporary pieces, curated with care.",
  // Public site URL. Used to build absolute product links for WhatsApp orders.
  // Update this to the live domain when deployed.
  url: "https://chaudharycollection.in",

  // Social + contact
  instagramUrl: "https://www.instagram.com/chaudharycollection01/",
  instagramHandle: "@chaudharycollection01",

  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Displayed number: +91 87556 19184
  whatsappNumber: "918755619184",
  whatsappDisplay: "+91 87556 19184",

  // Contact
  email: "",
  addressLine: "Chaudhary Collection, Main Market",
} as const

// Store photographs are provided later. These are easy-to-replace slots.
// Replace the files at these paths with the real store photos.
export const storeImages = {
  heroExterior: "/store/hero-store.png",
  brandInterior: "/store/brand-store.png",
} as const

export type NavItem = { label: string; href: string }

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Contact", href: "/contact" },
]
