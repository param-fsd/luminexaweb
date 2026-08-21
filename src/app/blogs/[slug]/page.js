/**
 * Blog post route — a server component, so the post can export real metadata.
 *
 * The previous version was `"use client"`, which meant Next could not emit a
 * <title>, description, canonical or Open Graph tags for any post. The interactive
 * parts now live in BlogArticle; this file only resolves the post, builds metadata
 * and emits Article + FAQPage JSON-LD.
 *
 * Per-post SEO overrides come from the `seo` key in src/data/blogData.js.
 */

import { notFound } from "next/navigation";
import blogs from "@/data/blogData";
import BlogArticle from "./BlogArticle";

const SITE = "https://luminexa.in";

const findPost = (slug) => blogs.find((b) => b.slug === slug);

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return { title: "Post not found | Luminexa" };
  }

  const title = post.seo?.title || `${post.title} | Luminexa`;
  const description = post.seo?.description || post.shortDescription;
  const url = `${SITE}/blogs/${post.slug}`;

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Luminexa Technologies",
      images: post.image
        ? [{ url: `${SITE}${post.image}`, alt: post.imageAlt || post.title }]
        : undefined,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [`${SITE}${post.image}`] : undefined,
    },
  };
}

const BlogPostPage = async ({ params }) => {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  const url = `${SITE}/blogs/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo?.description || post.shortDescription,
    image: post.image ? [`${SITE}${post.image}`] : undefined,
    author: { "@type": "Organization", name: post.author || "Luminexa Technologies" },
    publisher: {
      "@type": "Organization",
      name: "Luminexa Technologies",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
  };

  /* Only emit FAQ schema for posts that actually render an FAQ block. */
  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <BlogArticle
        post={post}
        related={blogs.filter((b) => b.slug !== post.slug).slice(0, 2)}
      />
    </>
  );
};

export default BlogPostPage;
