import { Suspense } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowUpRight,
  CheckCircle2,
  Layout,
  Layers,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react"

import ContactForm from "@/components/ContactForm"
import ProjectsList from "@/components/ProjectsList"
import Header2 from "@/components/mvpblocks/header-2"
import FooterPortfolio from "@/components/mvpblocks/footer-newsletter"
import HeroPortfolio from "@/components/hero"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata = {
  title: "Portfolio",
}

type Service = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  highlights: string[]
}

type ProcessStep = {
  title: string
  description: string
  result: string
}

type Stat = {
  label: string
  value: string
  hint: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

const services: Service[] = [
  {
    title: "High-converting product websites",
    description:
      "Story-driven marketing sites and product launches that highlight your value, increase signups, and look beautiful on every device.",
    href: "/projects/business-website",
    icon: Layout,
    highlights: [
      "Design systems built with Tailwind and Shadcn UI",
      "Headless CMS, analytics, and automation integrations",
      "Performance budgets that keep Lighthouse scores high",
    ],
  },
  {
    title: "Data-rich SaaS dashboards",
    description:
      "Interactive dashboards, customer portals, and internal tools with delightful UX and reliable backend integrations.",
    href: "/projects",
    icon: Layers,
    highlights: [
      "Reusable component libraries for fast iteration",
      "Realtime features powered by robust APIs",
      "Accessibility-first experiences that scale",
    ],
  },
  {
    title: "End-to-end product partnerships",
    description:
      "Collaborative roadmap, delivery, and launch support so your team ships with confidence and keeps improving after release.",
    href: "#contact",
    icon: ShieldCheck,
    highlights: [
      "Strategy, discovery workshops, and user flows",
      "Build, QA, and deploy with modern DevOps practices",
      "Ongoing optimization with metrics and user feedback",
    ],
  },
]

const process: ProcessStep[] = [
  {
    title: "Discovery & direction",
    description:
      "We collaborate on goals, audiences, and success metrics. I map technical requirements and propose a clear delivery plan.",
    result: "Aligned roadmap and sprint schedule",
  },
  {
    title: "Design & build",
    description:
      "Rapid prototyping and component-driven development keep stakeholders involved while we craft polished interactions.",
    result: "Production-ready interface with clean code",
  },
  {
    title: "Launch & iteration",
    description:
      "I handle deployment, instrumentation, and knowledge transfer, then iterate on insights from analytics and user feedback.",
    result: "Measured improvements and confident team",
  },
]

const stats: Stat[] = [
  {
    label: "Projects launched",
    value: "24+",
    hint: "Across startups, agencies, and enterprise teams",
  },
  {
    label: "Average Lighthouse score",
    value: "95",
    hint: "Measured across performance, accessibility & SEO",
  },
  {
    label: "Client retention",
    value: "90%",
    hint: "Long-term partners who continue to ship together",
  },
]

const testimonials: Testimonial[] = [
  {
    quote:
      "Idowu was the engine behind our SaaS redesign. He translated complex data flows into a dashboard users actually enjoy, and he shipped every milestone ahead of schedule.",
    name: "Amelia Chen",
    role: "Product Lead",
    company: "Lumen AI",
  },
  {
    quote:
      "From discovery to launch, Idowu guided us through every step. Our marketing site now loads twice as fast and leads have doubled since the refresh.",
    name: "Marcus Allen",
    role: "Head of Growth",
    company: "Northshore",
  },
  {
    quote:
      "He treated our team like partners. The codebase is a joy to work with and the onboarding he provided made handoff seamless.",
    name: "Sara Vélez",
    role: "Engineering Manager",
    company: "Waveform",
  },
  {
    quote:
      "Attention to detail, clear communication, and a relentless focus on outcomes. We continue to work with Idowu on every new product initiative.",
    name: "Tom Walker",
    role: "Founder",
    company: "Clerq",
  },
]

const toolStack = [
  "Next.js & React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma & PostgreSQL",
  "tRPC / REST APIs",
  "Vercel & CI/CD",
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] z-0 h-[480px] rounded-[50%] bg-gradient-to-br from-sky-100 via-transparent to-emerald-100 blur-3xl" />
      <Header2 />
      <main className="relative z-10 flex flex-col gap-24 pt-24 sm:pt-32">
        <div className="px-0">
          <HeroPortfolio />
        </div>

        <section id="services" className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Users className="h-3.5 w-3.5" /> Services
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Partnerships that take ideas from first sketch to polished product
            </h2>
            <p className="mt-4 text-base text-slate-600">
              I embed with your team to design, build, and launch web experiences that are fast, accessible, and ready to scale.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:text-emerald-700"
                >
                  Explore this service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="relative w-full bg-slate-50 py-24">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/60 to-transparent" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <Rocket className="h-3.5 w-3.5" /> Process
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                A collaborative process built for clarity and momentum
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Transparent communication, async updates, and tight feedback loops keep projects aligned. You know what shipped, what’s next, and how the work ladders up to your goals.
              </p>
              <div className="mt-10 space-y-8">
                {process.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold text-emerald-600">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step.title}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                    <p className="text-sm font-medium text-slate-900">Outcome: {step.result}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="grid gap-6 rounded-3xl border border-white/70 bg-white/90 p-10 shadow-xl shadow-emerald-100/40">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Impact metrics</span>
                <div className="grid gap-6 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-center shadow-sm">
                      <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
                      <p className="mt-2 text-sm font-semibold text-slate-700">{stat.label}</p>
                      <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Tool stack
                </span>
                <p className="mt-3 text-base text-slate-700">
                  Modern tooling that keeps teams productive and codebases maintainable.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {toolStack.map((tool) => (
                    <li key={tool} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <Layers className="h-3.5 w-3.5" /> Featured work
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Interfaces and systems crafted for performance and polish
              </h2>
              <p className="mt-4 text-base text-slate-600">
                A snapshot of the products I’ve designed and built recently. Each project blends thoughtful UX, clean architecture, and measurable results.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              Browse all projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-10 text-center text-sm text-slate-500">
                  Loading featured projects…
                </div>
              }
            >
              <ProjectsList />
            </Suspense>
          </div>
        </section>

        <section id="testimonials" className="w-full bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <Users className="h-3.5 w-3.5" /> Client feedback
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Trusted by founders, product teams, and agencies
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Partnerships are built on transparency and outcomes. Here’s what collaborators say about working together.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <figure
                  key={`${testimonial.name}-${testimonial.company}`}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)]"
                >
                  <blockquote className="text-sm leading-relaxed text-slate-700">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative w-full overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-100 via-white to-sky-100" />
          <div className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Let’s build together
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Tell me about your next launch
              </h2>
              <p className="mt-4 text-base text-slate-700">
                Share a few details about your timeline, goals, and what success looks like. I’ll respond within two business days with next steps.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>Project roadmapping, audits, and long-term retainers available.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>Based in Lagos, collaborating with teams across time zones.</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-emerald-100/40 backdrop-blur">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <FooterPortfolio />
      <div className="pointer-events-none fixed bottom-6 right-6 z-50">
              <ThemeToggle />
            </div>
    </div>
  )
}
