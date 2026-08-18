import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/products"

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">
          Shop by category
        </p>
        <h2 className="text-3xl font-medium sm:text-4xl">Featured Collections</h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/collections?category=${category.slug}`}
            className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="relative p-5">
              <h3 className="font-serif text-xl text-background sm:text-2xl">{category.name}</h3>
              <p className="mt-1 text-xs text-background/75">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
