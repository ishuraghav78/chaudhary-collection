"use client"

import * as React from "react"
import { WhatsAppIcon, InstagramIcon } from "@/components/icons"
import { siteConfig } from "@/lib/config"
import { buildWhatsAppChatUrl } from "@/lib/whatsapp"

// Fixed floating action buttons shown on every page (bottom-right).
// Instagram opens the native app directly when installed, falling back to
// the web profile if the app isn't available. WhatsApp opens a chat with a
// friendly pre-filled greeting.
export function FloatingSocialButtons() {
  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const username = siteConfig.instagramHandle.replace("@", "")
    const appUrl = `instagram://user?username=${username}`
    const webUrl = siteConfig.instagramUrl

    // Try to open the native app. If it isn't installed, the page stays put
    // and we fall back to the web profile after a short delay.
    const fallbackTimer = window.setTimeout(() => {
      window.open(webUrl, "_blank", "noopener,noreferrer")
    }, 1200)

    window.addEventListener(
      "blur",
      () => window.clearTimeout(fallbackTimer),
      { once: true }
    )

    window.location.href = appUrl
  }

  const whatsappUrl = buildWhatsAppChatUrl(
    "Hello Chaudhary Collection 👋 I have a question about your products."
  )

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={siteConfig.instagramUrl}
        onClick={handleInstagramClick}
        aria-label="Open Chaudhary Collection on Instagram"
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        style={{
          background:
            "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
        }}
      >
        <InstagramIcon className="h-7 w-7" />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Chaudhary Collection on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
