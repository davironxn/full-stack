import Link from "next/link";

import { LoginForm } from "@/components/login-form";

const highlights = [
  {
    title: "Instant access",
    description: "Pick up where you left off with saved projects, analytics, and drafts.",
  },
  {
    title: "Secure by design",
    description: "Two-factor ready with device level encryption for sensitive workflows.",
  },
  {
    title: "Team ready",
    description: "Invite collaborators and manage roles without leaving your dashboard.",
  },
];

export function LoginFormHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900/60 via-slate-900/10 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 sm:pt-24 lg:flex-row lg:items-start lg:gap-20 lg:pb-32 lg:pt-28">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Built for teams that ship fast
          </span>
          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Login to your home base and keep momentum going
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Access dashboards, manage launches, and stay aligned with your entire product crew. Sign in once and everything you need is waiting inside your personalized home.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5">
                <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="font-medium text-slate-200">Need an account?</span>
            <Link href="/auth/register" className="inline-flex items-center text-slate-100 underline-offset-4 hover:text-cyan-200 hover:underline">
              Create one in minutes
            </Link>
          </div>
        </div>
        <div className="flex w-full max-w-md shrink-0 flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,1)] backdrop-blur">
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-slate-100">Welcome back</p>
            <p className="mt-1 text-slate-400">
              Sign in to continue to your personalized dashboards and workspace.
            </p>
          </div>
          <LoginForm className="w-full" />
          <p className="text-center text-xs text-slate-500">
            Protected with enterprise-grade security and monitored 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginFormHero;
