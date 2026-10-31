import { createFileRoute, notFound } from "@tanstack/react-router";
import AboutPage from "@/pages/AboutPage";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/page/$slug")({
  loader: ({ params }) => {
    if (params.slug !== "about" && params.slug !== "services") throw notFound();
    return null;
  },
  head: ({ params }) => seoHead(`/page/${params.slug}`),
  component: AboutPage,
});
