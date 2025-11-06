'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialForm = {
  title: '',
  slug: '',
  description: '',
  url: '',
  tags: '',
  imageUrl: '',
};

type FormState = typeof initialForm;

type StatusMessage = { tone: 'success' | 'error'; message: string } | null;

export function ProjectForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<StatusMessage>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? 'Unable to save project');
      }

      setForm(initialForm);
      setStatus({ tone: 'success', message: 'Project saved to portfolio.' });
    } catch (error) {
      setStatus({
        tone: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">
            Project title
          </label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Business Website redesign"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">
            Slug
          </label>
          <Input
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="business-website"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="description">
          Overview
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Summarize the impact and outcome of the engagement."
          required
          rows={4}
          className="border-input focus-visible:ring-ring/50 focus-visible:border-ring min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition focus-visible:ring-[3px]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="url">
            Case study URL
          </label>
          <Input
            id="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://example.com/case-study"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="tags">
            Tags
          </label>
          <Input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Next.js, SaaS, product design"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="imageUrl">
          Cover image URL
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          Slug and title power the public /projects routes. Keep tags comma separated.
        </div>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Publish project'}
        </Button>
      </div>

      {status ? (
        <p
          className={`text-sm ${
            status.tone === 'success' ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
