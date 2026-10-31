import { createFileRoute } from "@tanstack/react-router";
import DeliveryPage from "@/pages/DeliveryPage";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/delivery")({
  head: () => seoHead("/delivery"),
  component: DeliveryPage,
});
