"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import blogs from "@/data/blogData";

const cx = (...c) => c.filter(Boolean).join(" ");

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const BlogPage = ({ limit, showNewsletter = true }) => {
  const displayedBlogs = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? sorted.slice(0, limit) : sorted;
  }, [limit]);

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* ================= GLOBAL BACKGROUND (nexAR vibe) ================= */}
      <div className="absolute inset-0 -z-10">
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
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[620px] w-[620px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2">
            <Badge className="rounded-full px-4 py-1" variant="secondary">
              Blog
            </Badge>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3.5 text-primary" />
              Insights • Updates • Guides
            </span>
          </div>

          <h2 className="mt-2 text-[24px] sm:text-[30px] md:text-[38px] font-bold tracking-tight text-foreground">
            Stay Updated with the Latest
          </h2>

          <p className="mt-0 text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed max-w-2xl">
            Explore expert opinions, industry news, and practical guides to help you grow with Luminexa.
          </p>

          <div className="mt-6 h-px w-full bg-border" />
        </motion.div>

        {/* ================= BLOG GRID ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedBlogs.map((blog, index) => (
            <motion.div key={blog.slug} variants={item}>
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <Card className="relative h-full overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                    {/* top label */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] bg-black/55 text-white border border-white/15 backdrop-blur">
                        {blog.category}
                      </span>
                    </div>

                    {/* corner glow */}
                    <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  </div>

                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] text-muted-foreground">{blog.date}</p>

                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        Read
                        <ArrowUpRight className="size-3.5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <h3 className="mt-2 text-[16px] md:text-[18px] font-semibold text-foreground leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-[12px] md:text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                      {blog.shortDescription}
                    </p>

                    {/* subtle divider */}
                    <div className="mt-5 h-px w-full bg-border" />

                    {/* footer */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] px-3 py-1 rounded-full bg-muted/40 border border-border text-muted-foreground">
                        View Article
                      </span>

                      <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                        Explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= NEWSLETTER ================= */}
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-14"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur shadow-sm p-7 md:p-10">
              {/* inner glow */}
              <div className="absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-gradient-to-br from-primary/18 to-secondary/18 blur-3xl opacity-60" />
              <div className="absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-secondary/18 to-primary/18 blur-3xl opacity-60" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-11 w-11 rounded-2xl border border-border bg-muted/40 flex items-center justify-center">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-[18px] md:text-[22px] font-semibold text-foreground">
                        Subscribe to Our Journey
                      </h3>
                      <p className="mt-1 text-[12px] md:text-[13px] text-muted-foreground">
                        Get Luminexa insights delivered straight to your inbox.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] text-muted-foreground">
                    No spam. Only useful updates.
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 bg-background/70 border-border"
                    />
                    <Button className="h-12 rounded-xl">
                      Subscribe <ArrowUpRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
