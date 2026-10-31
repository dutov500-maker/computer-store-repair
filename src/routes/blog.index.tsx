import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/blog/")({
  head: () => seoHead("/blog"),
  component: Blog,
});
