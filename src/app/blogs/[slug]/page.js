"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import blogs from "@/data/blogData";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User2,
  Mail,
  Share2,
  Clock3,
  Bookmark,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const SectionBg = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />

    {/* tech grid */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />

    {/* glows */}
    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-[620px] w-[620px] rounded-full bg-gradient-to-br from-secondary/25 to-primary/25 blur-3xl" />
  </div>
);

const GlassPanel = ({ className = "", children }) => (
  <div
    className={cx(
      "rounded-2xl border border-border bg-background/60 backdrop-blur shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

const estimateReadTime = (html) => {
  const text = (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const BlogDetails = () => {
  const params = useParams();
  const slug = params?.slug;

  const blogPost = useMemo(() => blogs.find((b) => b.slug === slug), [slug]);

  const readTime = useMemo(
    () => estimateReadTime(blogPost?.fullDescription),
    [blogPost?.fullDescription]
  );

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-foreground">Blog not found</p>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen py-16 md:py-20 overflow-hidden">
      <SectionBg />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-sm text-muted-foreground flex items-center gap-2"
        >
          <Link href="/blogs" className="hover:underline flex items-center gap-1">
            Blog
          </Link>
          <span>{">"}</span>
          <span className="text-foreground/90 font-medium truncate">
            {blogPost.title}
          </span>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur"
        >
          {/* Image */}
          <div className="relative h-[18rem] sm:h-[22rem] md:h-[28rem]">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
            />
            {/* overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-white/10" />

            {/* floating actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] bg-black/55 text-white border border-white/15 backdrop-blur hover:bg-black/65 transition"
                title="Save"
              >
                <Bookmark className="size-4" />
                Save
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] bg-black/55 text-white border border-white/15 backdrop-blur hover:bg-black/65 transition"
                title="Share"
              >
                <Share2 className="size-4" />
                Share
              </button>
            </div>

            {/* bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="rounded-full px-4 py-1 bg-white/15 text-white border border-white/15 backdrop-blur">
                  {blogPost.category}
                </Badge>
                <span className="text-[11px] text-white/80 inline-flex items-center gap-2">
                  <Clock3 className="size-3.5" />
                  {readTime}
                </span>
              </div>

              <h1 className="text-[22px] sm:text-[30px] md:text-[44px] font-bold tracking-tight text-white">
                {blogPost.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-white/80 text-[12px]">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" />
                  {blogPost.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <User2 className="size-4" />
                  By {blogPost.author}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BODY + SIDEBAR */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <GlassPanel className="p-6 md:p-8">
              <article
                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.fullDescription }}
              />
            </GlassPanel>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6"
            >
              <GlassPanel className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[13px] text-muted-foreground">
                      Want something similar for your brand?
                    </p>
                    <p className="text-[15px] md:text-[16px] font-semibold text-foreground mt-1">
                      Let’s build an experience-first solution with Luminexa.
                    </p>
                  </div>

                  <Button asChild className="rounded-xl shrink-0">
                    <Link href="/contact-us">
                      Talk to us <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>

          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="space-y-6 lg:sticky lg:top-6"
          >
            {/* Newsletter */}
            <GlassPanel className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl border border-border bg-muted/40 flex items-center justify-center">
                  <Mail className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold text-foreground">
                    Subscribe to Our Journey
                  </h3>
                  <p className="text-[12px] text-muted-foreground mt-1 leading-snug">
                    Get the latest Luminexa insights delivered to your inbox.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-11"
                />
                <Button className="h-11 rounded-xl">Subscribe</Button>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                No spam. Only useful updates.
              </p>
            </GlassPanel>

            {/* Quick navigation */}
            <GlassPanel className="p-6">
              <p className="text-[12px] text-muted-foreground">Quick links</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href="/blogs"
                  className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-[13px] text-foreground hover:bg-muted/40 transition"
                >
                  ← Back to all blogs
                </Link>
                <Link
                  href="/services"
                  className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-[13px] text-foreground hover:bg-muted/40 transition"
                >
                  Explore services →
                </Link>
              </div>
            </GlassPanel>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
