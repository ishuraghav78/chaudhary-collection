import type { Metadata } from "next"
import { MapPin, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { WhatsAppIcon, InstagramIcon } from "@/components/icons"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chaudhary Collection on WhatsApp or Instagram.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        description="We're happy to help with sizing, availability and orders. Reach us the way that suits you best."
      />

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-sm border border-border p-8 transition-colors hover:border-accent"
          >
            <WhatsAppIcon className="h-7 w-7 text-accent" />
            <h2 className="text-xl font-medium">WhatsApp</h2>
            <p className="text-sm text-muted-foreground">
              Chat with us and place your order directly.
            </p>
            <span className="mt-1 text-sm text-foreground group-hover:text-accent">
              {siteConfig.whatsappDisplay}
            </span>
          </a>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-sm border border-border p-8 transition-colors hover:border-accent"
          >
            <InstagramIcon className="h-7 w-7 text-accent" />
            <h2 className="text-xl font-medium">Instagram</h2>
            <p className="text-sm text-muted-foreground">
              Follow for new arrivals and styling ideas.
            </p>
            <span className="mt-1 text-sm text-foreground group-hover:text-accent">
              {siteConfig.instagramHandle}
            </span>
          </a>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-sm border border-border p-8">
            <MapPin className="h-7 w-7 text-accent" />
            <h2 className="text-xl font-medium">Visit the boutique</h2>
            <p className="text-sm text-muted-foreground">{siteConfig.addressLine}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-sm border border-border p-8">
            <Phone className="h-7 w-7 text-accent" />
            <h2 className="text-xl font-medium">Call us</h2>
            <p className="text-sm text-muted-foreground">
              Reachable during store hours for any questions.
            </p>
            <span className="mt-1 text-sm text-foreground">{siteConfig.whatsappDisplay}</span>
          </div>
        </div>
      </div>
    </>
  )
}
