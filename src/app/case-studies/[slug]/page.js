/**
 * Case study route — a server component, so each study can export real metadata.
 *
 * Same split as /blogs/[slug]: this file resolves the record, builds metadata and
 * emits JSON-LD; CaseStudyArticle renders the reading experience.
 */

import { notFound } from "next/navigation";
import caseStudies from "@/data/caseStudyData";
import CaseStudyArticle from "./CaseStudyArticle";

const SITE = "https://luminexa.in";

const findStudy = (slug) => caseStudies.find((c) => c.slug === slug);

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = findStudy(slug);

  if (!study) return { title: "Case study not found | Luminexa" };

  const title = study.seo?.title || `${study.title} | Luminexa Case Study`;
  const description = study.seo?.description || study.shortDescription;
  const url = `${SITE}/case-studies/${study.slug}`;
  const image = study.coverImage;

  return {
    title,
    description,
    keywords: study.seo?.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Luminexa Technologies",
      images: image ? [{ url: `${SITE}${image}`, alt: study.title }] : undefined,
      publishedTime: study.date,
      authors: study.author ? [study.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [`${SITE}${image}`] : undefined,
    },
  };
};

const CaseStudyPage = async ({ params }) => {
  const { slug } = await params;
  const study = findStudy(slug);

  if (!study) notFound();

  const url = `${SITE}/case-studies/${study.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.seo?.description || study.shortDescription,
    image: study.coverImage ? [`${SITE}${study.coverImage}`] : undefined,
    author: { "@type": "Organization", name: study.author || "Luminexa Technologies" },
    publisher: {
      "@type": "Organization",
      name: "Luminexa Technologies",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: study.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CaseStudyArticle
        study={study}
        related={caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2)}
      />
    </>
  );
};

export default CaseStudyPage;
