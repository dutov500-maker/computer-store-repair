import { createFileRoute } from "@tanstack/react-router";
import RepairGallery from "@/pages/RepairGallery";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/repair-gallery")({
  head: () => seoHead("/repair-gallery"),
  component: RepairGallery,
});
