"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"

type FormState = { name: string; email: string; message: string }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) {
        setResult({ ok: false, message: json?.errors ? JSON.stringify(json.errors) : json?.error ?? 'Error' })
      } else {
        setResult({ ok: true, message: 'Message sent' })
        setForm({ name: '', email: '', message: '' })
      }
    } catch (err: any) {
      setResult({ ok: false, message: err?.message ?? 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          required
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full justify-center bg-emerald-500 text-white shadow-lg hover:bg-emerald-600"
      >
        {loading ? 'Sending…' : 'Send message'}
      </Button>
      {result && (
        <p
          className={`text-sm ${
            result.ok ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
          }`}
        >
          {result.message}
        </p>
      )}
    </form>
  )
}
