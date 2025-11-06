import React from "react"

import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
      <div className="space-y-4 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Let&apos;s talk
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Start a project, ask a question, or just say hello
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-600">
          I read every message that comes through this form and typically respond within one business day.
          Share a few details about what you&apos;re working on and I&apos;ll take it from there.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.25)] backdrop-blur sm:p-10">
        <ContactForm />
      </div>
    </main>
  )
}
