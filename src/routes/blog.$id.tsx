import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { blogPosts } from "@/components/BlogPost/BlogPostData";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.id === Number(params.id));
    if (!post) throw notFound();
    return { title: post.title, image: post.image, description: post.description, keywords: post.keywords };
  },
  head: ({ params, loaderData }) => {
    const base = seoHead(
      `/blog/${params.id}`,
      loaderData
        ? {
            title: loaderData.title,
            ogTitle: loaderData.title,
            description: loaderData.description,
            ogDescription: loaderData.description,
            keywords: loaderData.keywords,
          }
        : {},
    );
    return loaderData
      ? { ...base, meta: [...base.meta, { property: "og:image", content: loaderData.image }] }
      : base;
  },
  component: BlogPost,
});