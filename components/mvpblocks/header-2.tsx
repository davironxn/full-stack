'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Menu, X, ArrowRight, Zap, Search, Code } from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/home' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: easeInOut } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeInOut, staggerChildren: 0.1 } },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-border/50 bg-[var(--bg-soft)] border-b shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + Name */}
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] shadow-lg shadow-[rgba(255,61,113,0.25)]">
                    <Code className="h-5 w-5 text-[var(--text-on-accent)]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-[var(--text-strong)]">
                    Idowu Makinde
                  </span>
                  <span className="-mt-1 text-xs font-medium tracking-wide text-[var(--text-muted)]">
                    Full-Stack Developer
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="relative rounded-lg px-4 py-2 text-sm font-semibold text-[var(--text-emphasis)] transition-colors duration-200 hover:text-[var(--text-strong)]"
                  >
                    {hoveredItem === item.name && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-[var(--bg-hover)]/80"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <motion.div className="hidden items-center space-x-3 lg:flex" variants={itemVariants}>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--text-on-accent)] shadow-sm shadow-[rgba(255,61,113,0.2)] transition-all duration-200 hover:opacity-90"
              >
                <span>Let’s Connect</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Mobile Button */}
            <motion.button
              className="rounded-lg p-2 text-[var(--text-strong)] transition-colors duration-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-3 font-semibold text-[var(--text-emphasis)] transition-colors duration-200 hover:bg-[var(--bg-hover)] hover:text-[var(--text-strong)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="space-y-3 border-t border-[var(--border)] pt-6"
                  variants={mobileItemVariants}
                >
                  <Link
                    href="/contact"
                    className="block w-full rounded-lg bg-[var(--accent)] py-3 text-center font-semibold text-[var(--text-on-accent)] transition-all duration-200 hover:opacity-90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Let’s Connect
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
