import Link from "next/link"
import { cn } from "@/lib/utils"

// Text-based logo treatment. This whole block can later be swapped for a
// real logo image without touching the rest of the layout.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex flex-col items-center leading-none lg:items-start", className)}
      aria-label="Chaudhary Collection, home"
    >
      <span className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Chaudhary
      </span>
      <span className="text-[0.6rem] font-light uppercase tracking-[0.42em] text-accent">
        Collection
      </span>
    </Link>
  )
}
