"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Compass, Layers, MousePointerClick, ShieldCheck, Workflow, Wrench } from "lucide-react";
import { INNER, Mono, PAD, PRIMARY_BTN, SECONDARY_BTN, Section, THEME } from "@/components/services/editorial/shell";

const capabilities = [
  { icon: Compass, title: "Make the big picture clear.", label: "Immersive experiences", description: "Bring places and products into focus with interactive maps, 3D property views and virtual tours that invite people to explore." },
  { icon: MousePointerClick, title: "Make every next step feel natural.", label: "Thoughtful design", description: "Clear navigation, considered layouts and useful interactions help visitors find what matters and know what to do next." },
  { icon: Workflow, title: "Keep your work connected.", label: "Business workflows", description: "Bring enquiries, project information and everyday tasks together in tools shaped around how your team actually works." },
  { icon: Layers, title: "Build around your business.", label: "Made to fit", description: "Your goals, brand and processes guide the solution, from a focused website to a custom application with room to evolve." },
  { icon: ShieldCheck, title: "Give the right people access.", label: "Considered access", description: "Plan who can view, update and manage information, with clear roles that support your team's responsibilities." },
  { icon: Wrench, title: "Keep improving after launch.", label: "Ongoing care", description: "Plan for maintenance, useful updates and changing needs so your digital experience continues to serve your business." },
];

const steps = [
  { title: "Understand", text: "We start with your audience, the problem to solve and what success should look like." },
  { title: "Shape", text: "Content, journeys and visual direction come together in a clear plan you can review." },
  { title: "Build", text: "We turn the agreed direction into a working experience, with feedback along the way." },
  { title: "Refine", text: "We check the details, prepare for launch and agree on the support your project needs." },
];

const faqs = [
  { question: "What can Luminexa help us build?", answer: "We work on websites, custom web applications, business management tools, automation and immersive visual experiences. The starting point is the problem your team or customers need to solve." },
  { question: "Can we start with one specific requirement?", answer: "Yes. A project can begin with a focused experience, such as a property presentation or an enquiry workflow. We can discuss additional requirements as your priorities develop." },
  { question: "Can the experience follow our brand?", answer: "Yes. We shape the visual direction, content and user journey around your brand and audience, with designs for you to review before implementation." },
  { question: "What happens after launch?", answer: "We agree on handover, maintenance and support as part of the project scope. This gives your team a clear understanding of how updates and future improvements will be handled." },
];

export default function FeaturesPage() {
  return (
    <main style={THEME} className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased">
      <section className={`${PAD} border-b border-[var(--im-line)] py-12 md:py-20`}>
        <div className={INNER}>
          <div>
            <Mono className="text-xs uppercase tracking-[0.14em] text-[var(--im-deep)]">Why nex / The Luminexa approach</Mono>
            <h1 className="mt-6 max-w-[900px] font-[family-name:var(--im-display)] text-[40px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[52px] lg:text-[64px]">Good ideas deserve<br className="hidden sm:block" /> a better <span className="underline decoration-lumen decoration-[6px] underline-offset-8">experience.</span></h1>
            <p className="mt-7 max-w-[650px] text-base leading-relaxed text-[var(--im-muted)] md:text-lg">Help people see your vision, understand your offering and take the next step. We bring design, immersive storytelling and practical business tools together.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us" className={`${PRIMARY_BTN} inline-flex items-center gap-2`}>Let’s talk about your project <ArrowUpRight className="size-4" /></Link>
              <a href="#difference" className={`${SECONDARY_BTN} inline-flex items-center gap-2`}>Explore the difference <ArrowDown className="size-4" /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--im-line)] pt-5">
              {["Purposeful design", "Connected experiences", "Built around you"].map((label) => <span key={label} className="flex items-center gap-2 text-xs text-[var(--im-muted)]"><Check className="size-3.5 text-[var(--im-deep)]" />{label}</span>)}
            </div>
          </div>
        </div>
      </section>

      <Section id="difference" index="01" label="The difference" note="Useful by design. Considered in every detail.">
        <h2 className="max-w-[720px] font-[family-name:var(--im-display)] text-3xl font-bold leading-tight tracking-[-0.03em] md:text-[42px]">More than a feature list.<br />A better way to connect.</h2>
        <p className="mt-5 max-w-[650px] text-base leading-relaxed text-[var(--im-muted)]">The right digital experience makes a complex offering easier to understand and everyday work easier to manage. These are the principles we bring to each project.</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--im-line-strong)] bg-[var(--im-line-strong)] sm:grid-cols-2">
          {capabilities.map(({ icon: Icon, title, label, description }, i) => (
            <article key={label} className="bg-background p-6 md:p-8">
              <div className="flex items-center justify-between"><Icon className="size-6 text-[var(--im-deep)]" strokeWidth={1.5} /><Mono className="text-xs text-[var(--im-dim)]">0{i + 1}</Mono></div>
              <Mono className="mt-7 block text-[10px] uppercase tracking-widest text-[var(--im-deep)]">{label}</Mono>
              <h3 className="mt-3 font-[family-name:var(--im-display)] text-xl font-semibold leading-snug tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--im-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="approach" index="02" label="Working together" note="A clear path from the first conversation to launch.">
        <h2 className="font-[family-name:var(--im-display)] text-3xl font-bold leading-tight tracking-[-0.03em] md:text-[42px]">Your ambition. A shared plan.</h2>
        <div className="mt-8 border-t border-[var(--im-line-strong)]">
          {steps.map((step, i) => <div key={step.title} className="grid gap-3 border-b border-[var(--im-line-strong)] py-6 sm:grid-cols-[40px_150px_1fr] sm:gap-5"><Mono className="text-xs text-[var(--im-deep)]">0{i + 1}</Mono><h3 className="font-[family-name:var(--im-display)] text-xl font-semibold">{step.title}</h3><p className="text-sm leading-7 text-[var(--im-muted)]">{step.text}</p></div>)}
        </div>
        <Link href="/services" className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-medium">Explore our services <ArrowUpRight className="size-4" /></Link>
      </Section>

      <Section id="questions" index="03" label="Good to know" note="A few answers before we begin.">
        <h2 className="font-[family-name:var(--im-display)] text-3xl font-bold tracking-[-0.03em] md:text-[42px]">Start with clarity.</h2>
        <div className="mt-8 border-t border-[var(--im-line-strong)]">
          {faqs.map((faq) => <details key={faq.question} className="group border-b border-[var(--im-line-strong)]"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-6 text-base font-semibold [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="shrink-0 text-xl font-normal text-[var(--im-deep)]"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span></summary><p className="max-w-[700px] pb-6 pr-6 text-sm leading-7 text-[var(--im-muted)]">{faq.answer}</p></details>)}
        </div>
      </Section>

      <section className={`${PAD} py-12 md:py-20`}>
        <div className={`${INNER} overflow-hidden rounded-xl bg-[var(--im-ink)] p-7 text-white md:p-12`}>
          <Mono className="text-xs uppercase tracking-widest text-lumen">Let’s make it happen</Mono>
          <div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-[650px]"><h2 className="font-[family-name:var(--im-display)] text-3xl font-bold leading-tight tracking-[-0.03em] md:text-[44px]">What could a better experience do for your business?</h2><p className="mt-5 max-w-[530px] text-base leading-relaxed text-white/70">Tell us what you have in mind. We’ll help you shape the next step.</p></div>
            <Link href="/contact-us" className={`${PRIMARY_BTN} inline-flex shrink-0 items-center gap-3`}>Start a conversation <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}


