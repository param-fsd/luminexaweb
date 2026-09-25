"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Laptop, Route, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

// Match the footer's content width and responsive horizontal padding.
const container = "mx-auto max-w-7xl px-4 md:px-8";
const heading = "text-3xl font-semibold tracking-tight sm:text-4xl";
const deviceIcons = { Laptop, Tablet, Mobile: Smartphone };

export default function ThreeDImmersivePage({ subService: content }) {
  return (
    <main className="bg-background text-foreground">
      <section className={`${container} py-10 md:py-16`}>
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Link href="/services" className="hover:text-foreground">Services</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services/3d-visualization" className="hover:text-foreground">3D Visualization</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">{content.title}</span>
        </nav>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{content.heroBadge}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">{content.title}</h1>
            <p className="mt-5 text-2xl font-medium leading-snug">Showcase your complete real estate project in 3D.</p>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full"><Link href={content.cta.primaryLink}>{content.cta.primaryText}<ArrowRight className="ml-2 size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full"><Link href="#project-experiences">Explore the experience</Link></Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <Image src={content.heroImage} alt="Aerial 3D visualization of a residential development" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t pt-6">
          {content.highlightTags.map((tag) => <li key={tag} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0" />{tag}</li>)}
        </ul>
      </section>

      <section id="project-experiences" className="scroll-mt-28 bg-muted/40 py-16 md:py-24">
        <div className={container}>
          <div className="mb-12 max-w-3xl">
            <h2 className={heading}>Let buyers explore your complete project in 3D.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{content.overview}</p>
          </div>
          <ul className="mb-12 grid gap-5 sm:grid-cols-2">
            {content.projectHighlights.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="grid gap-8 md:grid-cols-2">
            {content.features.map((feature) => (
              <article key={feature.title} className="overflow-hidden rounded-2xl border bg-background">
                <div className="relative aspect-[16/10]"><Image src={feature.image} alt={feature.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{feature.description}</p>
                  <ul className="mt-6 space-y-3">{feature.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0" />{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} grid items-stretch gap-8 py-16 md:py-24 lg:grid-cols-2 lg:gap-12`}>
        <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-3xl bg-muted lg:aspect-auto lg:min-h-[480px]">
          <Image src={content.customization.image} alt="Bedroom interior with wood finishes, a furnished bed, and balcony views" fill sizes="(max-width: 1023px) 100vw, (max-width: 1280px) 50vw, 584px" className="object-cover object-[65%_center]" />
        </div>
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">Interior customization</p>
          <h2 className={heading}>{content.customization.title}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{content.customization.description}</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">{content.customization.options.map((option) => <div key={option.title}><h3 className="font-semibold">{option.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{option.description}</p></div>)}</div>
          <p className="mt-7 border-t pt-5 text-sm leading-6 text-muted-foreground">{content.customization.note}</p>
        </div>
      </section>

      <section className="bg-muted/40 py-16 md:py-24">
        <div className={container}>
          <Route className="mb-5 size-9" aria-hidden="true" />
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">Our project routing system</p>
          <h2 className={heading}>{content.routing.title}</h2>
          <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{content.routing.description}</p>
          <div className="mt-10 overflow-hidden rounded-3xl border">
            <Image
              src="/project-routing-map.png"
              alt="Satellite project map showing the project boundary, nearby landmarks, roads, and distance rings"
              width={1128}
              height={726}
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="h-auto w-full"
            />
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">{content.routing.steps.map((step, index) => <li key={step.title} className="rounded-2xl border bg-background p-6 sm:p-8"><span className="flex size-10 items-center justify-center rounded-full bg-lumen text-lumen-foreground font-semibold">{index + 1}</span><h3 className="mt-6 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{step.description}</p></li>)}</ol>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">{content.routing.note}</p>
        </div>
      </section>

      <section className={`${container} py-16 md:py-24`}>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">Cross-device compatibility</p>
          <h2 className={heading}>{content.compatibility.title}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{content.compatibility.description}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.compatibility.devices.map((device) => {
            const Icon = deviceIcons[device.title];
            return (
              <article key={device.title} className="rounded-2xl border p-6 sm:p-8">
                <Icon className="size-8" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">{device.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{device.description}</p>
              </article>
            );
          })}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {content.compatibility.highlights.map((item) => <li key={item} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0" aria-hidden="true" />{item}</li>)}
        </ul>
      </section>

      <section className={`${container} pb-16 md:pb-24`}>
        <div className="mx-auto max-w-3xl">
          <h2 className={`${heading} mb-8`}>Planning your 3D experience</h2>
          {content.faqs.map((faq) => <details key={faq.question} className="border-b py-5"><summary className="cursor-pointer text-lg font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{faq.question}</summary><p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p></details>)}
        </div>
      </section>

      <section className={`${container} pb-16 md:pb-24`}>
        <div className="rounded-3xl bg-foreground px-6 py-12 text-center text-background sm:px-12 md:py-16">
          <h2 className={`${heading} mx-auto max-w-3xl`}>{content.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-80">{content.cta.description}</p>
          <Link href={content.cta.primaryLink} className="mt-8 inline-flex items-center gap-2 rounded-full bg-lumen px-6 py-3 font-medium text-lumen-foreground">{content.cta.primaryText}<ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}
