"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/landing/animated-group"
import { AnimatedText } from "@/components/landing/animated-text"

interface HeroProductProps {
  heading?: string
  description?: string
  primaryButton?: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  imageSrc?: string
  imageAlt?: string
}

export function HeroProduct({
  heading = "I Build Modern & Scalable Web Experiences",
  description = "I'm Idowu Makinde — a Full-Stack Web Developer passionate about creating fast, elegant, and scalable web applications that help businesses grow and stand out online.",
  primaryButton = {
    text: "View My Work",
    url: "#projects",
  },
  secondaryButton = {
    text: "Let’s Collaborate",
    url: "#contact",
  },
  imageSrc = "https://res.cloudinary.com/dyzxnud9z/image/upload/v1757947683/smoothui/hero-smoothui.png",
  imageAlt = "Portfolio project preview",
}: HeroProductProps) {
  return (
    <div className="relative bg-[var(--bg-soft)] text-[var(--text-primary)]">
      <main>
        <motion.section
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="py-20 md:py-36">
            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
              <AnimatedGroup preset="blur-slide" className="space-y-8">
                {/* Heading */}
                <AnimatedText
                  as="h1"
                  className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                  delay={0.2}
                >
                  {heading}
                </AnimatedText>

                {/* Description */}
                <AnimatedText
                  as="p"
                  className="mx-auto my-6 max-w-2xl text-pretty text-lg font-medium text-[var(--text-emphasis)] sm:text-xl"
                  delay={0.3}
                >
                  {description}
                </AnimatedText>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-[var(--accent)] text-[var(--text-on-accent)] shadow-md shadow-[rgba(255,61,113,0.2)] transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-[var(--background)] font-semibold">
                      <Link href={primaryButton.url}>{primaryButton.text}</Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-[var(--accent)] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--text-on-accent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-[var(--background)] font-semibold">
                      <Link href={secondaryButton.url}>
                        {secondaryButton.text}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatedGroup>
            </div>

            {/* Hero Image Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="relative z-10 mx-auto max-w-5xl px-6">
                <motion.div
                  className="mt-12 md:mt-16"
                  whileHover={{
                    scale: 1.02,
                    rotateY: 2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="relative mx-auto overflow-hidden rounded-[calc(var(--radius)*1.5)] border border-[var(--border)] bg-[var(--bg-soft)] shadow-lg shadow-black/10 ring-1 ring-[var(--border)]"
                    initial={{
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    }}
                    whileHover={{
                      boxShadow:
                        "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <motion.div
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={2880}
                        height={1842}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default HeroProduct
