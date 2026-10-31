import { createFileRoute } from "@tanstack/react-router";
import WarrantyPage from "@/pages/WarrantyPage";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/warranty")({
  head: () => seoHead("/warranty"),
  component: WarrantyPage,
});
