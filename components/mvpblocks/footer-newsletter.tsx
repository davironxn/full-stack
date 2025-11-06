'use client';

import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';

const footerColumns = [
  {
    title: 'Projects',
    links: [
      'Portfolio Website',
      'Business Landing Page',
      'E-commerce Platform',
      'SaaS Dashboard',
      'API Integrations',
    ],
  },
  {
    title: 'Services',
    links: [
      'Full-Stack Development',
      'UI/UX Implementation',
      'Backend APIs',
      'Website Deployment',
      'SEO Optimization',
    ],
  },
  {
    title: 'Explore',
    links: ['About Me', 'Blog', 'Resume', 'Testimonials', 'Contact'],
  },
];

const legalLinks = ['Terms', 'Privacy', 'Cookies', 'Licensing'];

const socialIcons = [
  { icon: <Instagram className="h-5 w-5" />, href: '#' },
  { icon: <Twitter className="h-5 w-5" />, href: '#' },
  { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  { icon: <Github className="h-5 w-5" />, href: '#' },
];

export default function FooterPortfolio() {
  return (
    <footer className="relative w-full bg-[var(--bg-soft)] text-[var(--text-primary)] pt-20 pb-10">
      {/* background glow */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="mb-16 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)]/40 p-8 shadow-sm backdrop-blur-md md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Stay updated with my latest projects
              </h3>
              <p className="mb-6 text-[var(--text-muted)]">
                Subscribe to get portfolio updates, tutorials, and behind-the-scenes insights from my development journey.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-[var(--text-on-accent)] shadow-md transition hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="hidden justify-end md:flex">
              <div className="relative">
                <div className="absolute inset-0 rotate-6 rounded-xl bg-[var(--accent)]/20" />
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=240&q=80"
                  alt="Developer workspace"
                  className="relative w-80 rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand + Social */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[var(--text-on-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">Idowu Makinde</span>
            </div>
            <p className="mb-6 text-[var(--text-muted)]">
              Full-stack web developer crafting modern business websites, landing pages, and scalable apps.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--accent)]/10"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-lg font-semibold">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between border-t border-[var(--border)] pt-8 md:flex-row">
          <p className="mb-4 text-sm text-[var(--text-muted)] md:mb-0">
            © {new Date().getFullYear()} Idowu Makinde. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((text) => (
              <a
                key={text}
                href="#"
                className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
