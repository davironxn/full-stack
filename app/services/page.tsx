import Link from "next/link"
import { Users, CheckCircle2, Layers } from "lucide-react"

export const metadata = {
  title: "Services",
}

const services = [
  {
    title: "High-converting product websites",
    description:
      "Story-driven marketing sites and product launches that highlight your value, increase signups, and look beautiful on every device.",
    href: "/projects/business-website",
  },
  {
    title: "Data-rich SaaS dashboards",
    description:
      "Interactive dashboards, customer portals, and internal tools with delightful UX and reliable backend integrations.",
    href: "/projects",
  },
  {
    title: "End-to-end product partnerships",
    description:
      "Collaborative roadmap, delivery, and launch support so your team ships with confidence and keeps improving after release.",
    href: "/contact",
  },
]

export default function ServicesPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Users className="h-3.5 w-3.5" /> Services
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Partnerships that take ideas from first sketch to polished product
        </h1>
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
                <Layers className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>Design systems built with Tailwind and Shadcn UI</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>Headless CMS, analytics, and automation integrations</span>
              </li>
            </ul>
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:text-emerald-700"
            >
              Explore this service
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
