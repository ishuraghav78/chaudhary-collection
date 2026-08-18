import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type EditorialBandProps = {
  image: string
  eyebrow: string
  title: string
  copy: string
  ctaLabel: string
  ctaHref: string
  reverse?: boolean
}

// Large editorial photography section used to break up product grids.
export function EditorialBand({
  image,
  eyebrow,
  title,
  copy,
  ctaLabel,
  ctaHref,
  reverse = false,
}: EditorialBandProps) {
  return (
    <section className="grid items-stretch gap-0 lg:grid-cols-2">
      <div className={cn("relative min-h-[340px] lg:min-h-[600px]", reverse && "lg:order-2")}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          "flex flex-col justify-center bg-secondary/50 px-6 py-14 sm:px-10 lg:px-16 lg:py-24",
          reverse && "lg:order-1",
        )}
      >
        <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 max-w-md text-balance text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {copy}
        </p>
        <Link
          href={ctaHref}
          className="group mt-8 inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
