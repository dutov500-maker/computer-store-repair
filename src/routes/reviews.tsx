import { createFileRoute } from "@tanstack/react-router";
import Reviews from "@/pages/Reviews";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/reviews")({
  head: () => seoHead("/reviews"),
  component: Reviews,
});
