import { siteConfig } from "@/lib/config"
import { WhatsAppIcon } from "@/components/icons"

export function WhatsAppCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-primary-foreground/60">
          Personal shopping
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
          Order directly on WhatsApp
        </h2>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
          Prefer a personal touch? Send us your selection on WhatsApp and we&apos;ll help you
          confirm sizes, availability and delivery — no account needed.
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Order on WhatsApp
        </a>
      </div>
    </section>
  )
}
