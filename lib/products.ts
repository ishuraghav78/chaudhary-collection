// Centralized product catalog + types + helpers.
// Add or edit products here only — UI components read from these helpers.

export type Category = {
  slug: string
  name: string
  image: string
  description: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  salePrice?: number
  images: string[]
  sizes: string[]
  // A named size chart so each product can show product-specific sizing.
  sizeChart: "tops" | "bottoms" | "ethnic" | "onesize"
  category: string // matches Category.slug
  collection: string // e.g. "New Arrivals", "Trending"
  inStock: boolean
  isNew?: boolean
  isTrending?: boolean
}

export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    image: "/products/olive-overshirt.png",
    description: "Refined menswear for every occasion.",
  },
  {
    slug: "women",
    name: "Women",
    image: "/products/anarkali-suit.png",
    description: "Elegant silhouettes, timeless craft.",
  },
  {
    slug: "traditional",
    name: "Traditional Wear",
    image: "/products/emerald-saree.png",
    description: "Heritage pieces for celebrations.",
  },
  {
    slug: "casual",
    name: "Casual Wear",
    image: "/products/coord-set.png",
    description: "Everyday ease, elevated.",
  },
]

// Size charts keyed by the product's sizeChart field.
export const sizeCharts: Record<
  Product["sizeChart"],
  { columns: string[]; rows: { size: string; values: string[] }[] }
> = {
  tops: {
    columns: ["Size", "Chest (in)", "Length (in)"],
    rows: [
      { size: "S", values: ["36", "27"] },
      { size: "M", values: ["38", "28"] },
      { size: "L", values: ["40", "29"] },
      { size: "XL", values: ["42", "30"] },
      { size: "XXL", values: ["44", "31"] },
    ],
  },
  bottoms: {
    columns: ["Size", "Waist (in)", "Length (in)"],
    rows: [
      { size: "28", values: ["28", "40"] },
      { size: "30", values: ["30", "40"] },
      { size: "32", values: ["32", "41"] },
      { size: "34", values: ["34", "41"] },
      { size: "36", values: ["36", "42"] },
    ],
  },
  ethnic: {
    columns: ["Size", "Bust (in)", "Waist (in)"],
    rows: [
      { size: "XS", values: ["32", "26"] },
      { size: "S", values: ["34", "28"] },
      { size: "M", values: ["36", "30"] },
      { size: "L", values: ["38", "32"] },
      { size: "XL", values: ["40", "34"] },
    ],
  },
  onesize: {
    columns: ["Size", "Fit"],
    rows: [{ size: "Free", values: ["Free size"] }],
  },
}

export const products: Product[] = [
  {
    id: "cc-001",
    name: "Premium Black Shirt",
    slug: "premium-black-shirt",
    description:
      "A tailored black shirt cut from soft, breathable cotton. A wardrobe essential that moves effortlessly from work to evening.",
    price: 999,
    images: ["/products/black-shirt.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeChart: "tops",
    category: "men",
    collection: "New Arrivals",
    inStock: true,
    isNew: true,
  },
  {
    id: "cc-002",
    name: "White Linen Kurta",
    slug: "white-linen-kurta",
    description:
      "A relaxed white kurta in pure linen with a clean placket. Light, airy and elegant for warm days and festive evenings.",
    price: 1499,
    salePrice: 1199,
    images: ["/products/white-kurta.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeChart: "tops",
    category: "traditional",
    collection: "New Arrivals",
    inStock: true,
    isNew: true,
  },
  {
    id: "cc-003",
    name: "Blue Denim Jeans",
    slug: "blue-denim-jeans",
    description:
      "Classic straight-fit denim in a mid blue wash. Durable, comfortable and made to be worn every day.",
    price: 1499,
    images: ["/products/denim-jeans.png"],
    sizes: ["28", "30", "32", "34", "36"],
    sizeChart: "bottoms",
    category: "men",
    collection: "Trending",
    inStock: true,
    isTrending: true,
  },
  {
    id: "cc-004",
    name: "Beige Cotton Trousers",
    slug: "beige-cotton-trousers",
    description:
      "Smart tapered trousers in a soft beige cotton twill. A versatile neutral that pairs with everything.",
    price: 1299,
    images: ["/products/beige-trousers.png"],
    sizes: ["28", "30", "32", "34", "36"],
    sizeChart: "bottoms",
    category: "casual",
    collection: "New Arrivals",
    inStock: true,
    isNew: true,
  },
  {
    id: "cc-005",
    name: "Floral Anarkali Suit",
    slug: "floral-anarkali-suit",
    description:
      "A graceful floor-length Anarkali with a delicate floral print and a flattering flared silhouette.",
    price: 2799,
    salePrice: 2299,
    images: ["/products/anarkali-suit.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: "ethnic",
    category: "women",
    collection: "Trending",
    inStock: true,
    isTrending: true,
  },
  {
    id: "cc-006",
    name: "Emerald Silk Saree",
    slug: "emerald-silk-saree",
    description:
      "A rich emerald silk saree with a subtle gold border. A statement piece for weddings and celebrations.",
    price: 3499,
    images: ["/products/emerald-saree.png"],
    sizes: ["Free"],
    sizeChart: "onesize",
    category: "traditional",
    collection: "Trending",
    inStock: true,
    isTrending: true,
  },
  {
    id: "cc-007",
    name: "Pastel Co-ord Set",
    slug: "pastel-co-ord-set",
    description:
      "A relaxed matching top and trouser set in a soft pastel tone. Effortless comfort with a polished finish.",
    price: 1899,
    images: ["/products/coord-set.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: "ethnic",
    category: "casual",
    collection: "New Arrivals",
    inStock: true,
    isNew: true,
  },
  {
    id: "cc-008",
    name: "Ivory Embroidered Lehenga",
    slug: "ivory-embroidered-lehenga",
    description:
      "An ivory lehenga with fine thread embroidery and subtle gold detailing. Understated bridal-season elegance.",
    price: 5999,
    salePrice: 4999,
    images: ["/products/ivory-lehenga.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: "ethnic",
    category: "traditional",
    collection: "Trending",
    inStock: true,
    isTrending: true,
  },
  {
    id: "cc-009",
    name: "Olive Utility Overshirt",
    slug: "olive-utility-overshirt",
    description:
      "A structured olive overshirt with functional pockets. Layer it open or wear it buttoned as a light jacket.",
    price: 1799,
    images: ["/products/olive-overshirt.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeChart: "tops",
    category: "men",
    collection: "New Arrivals",
    inStock: true,
    isNew: true,
  },
  {
    id: "cc-010",
    name: "Dusty Rose Midi Dress",
    slug: "dusty-rose-midi-dress",
    description:
      "A flowing midi dress in a muted dusty rose. Soft, feminine and easy to dress up or down.",
    price: 1699,
    images: ["/products/rose-dress.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: "ethnic",
    category: "women",
    collection: "Trending",
    inStock: false,
    isTrending: true,
  },
]

// Helpers
export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew)
}

export function getTrending(): Product[] {
  return products.filter((p) => p.isTrending)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`
}

export function productUrl(slug: string): string {
  return `/product/${slug}`
}
