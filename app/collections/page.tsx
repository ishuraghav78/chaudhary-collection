import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { CollectionsView } from "@/components/collections-view"

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse the full Chaudhary Collection — men's and women's fashion, traditional and casual wear.",
}

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Collections"
        description="Explore our full range of curated men's and women's fashion."
      />
      <Suspense fallback={null}>
        <CollectionsView />
      </Suspense>
    </>
  )
}
