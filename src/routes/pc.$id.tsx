import { createFileRoute, notFound } from "@tanstack/react-router";
import PCProduct from "@/pages/PCProduct";
import { CATALOG_DATA } from "@/data/catalog";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/pc/$id")({
  loader: ({ params }) => {
    const product = CATALOG_DATA.find((p) => p.id === Number(params.id));
    if (!product) throw notFound();
    return {
      title: `${product.title} - Купить в КомпЛаб`,
      description: `${product.description}. ${product.specs.cpu}, ${product.specs.gpu}, ${product.specs.ram}, ${product.specs.storage}. Цена: ${product.price.toLocaleString("ru-RU")} ₽`,
      image: product.image_url,
    };
  },
  head: ({ params, loaderData }) => {
    const base = seoHead(`/pc/${params.id}`, loaderData ? { title: loaderData.title, description: loaderData.description } : {});
    return loaderData
      ? { ...base, meta: [...base.meta, { property: "og:image", content: loaderData.image }] }
      : base;
  },
  component: PCProduct,
});
