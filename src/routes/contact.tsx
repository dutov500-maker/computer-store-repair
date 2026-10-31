import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/contact")({
  head: () => seoHead("/contact"),
  component: Contact,
});
