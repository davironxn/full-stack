'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';

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

export function ProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusMessage>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      return;
    }

    // Validate type
    if (!f.type.startsWith('image/')) {
      toast.push({ title: 'Invalid file', description: 'Only image files are allowed.', variant: 'error' });
      setFile(null);
      return;
    }

    // Validate size (max 5MB)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (f.size > MAX_BYTES) {
      toast.push({ title: 'File too large', description: 'Max file size is 5 MB.', variant: 'error' });
      setFile(null);
      return;
    }

    setFile(f);
  };

  // preview effect
  useEffect(() => {
    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);

    try {
      // Build multipart/form-data payload using FormData
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('slug', form.slug);
      fd.append('description', form.description);
      if (form.url) fd.append('url', form.url);
      const tagsArray = form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
      fd.append('tags', JSON.stringify(tagsArray));
      if (file) {
        fd.append('image', file, file.name);
      } else if (form.imageUrl) {
        fd.append('imageUrl', form.imageUrl);
      }

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        body: fd,
      });

      if (!response.ok) {
        // Try to parse JSON body, fallback to text for helpful debugging
        let parsed: any = null;
        try {
          parsed = await response.json();
        } catch (e) {
          try {
            parsed = { text: await response.text() };
          } catch (e2) {
            parsed = null;
          }
        }

        const serverMessage = parsed?.error ?? parsed?.message ?? parsed?.text ?? null;
        const errMsg = `Request failed: ${response.status} ${response.statusText}${serverMessage ? ' — ' + serverMessage : ''}`;
        console.error('Project create failed', { status: response.status, statusText: response.statusText, body: parsed });
        toast.push({ title: 'Create failed', description: serverMessage ?? `Status ${response.status}`, variant: 'error' });
        setStatus({ tone: 'error', message: errMsg });
        setIsSaving(false);
        return;
      }

      setForm(initialForm);
      // clear uploaded file + preview
      setFile(null);
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {}
        setPreviewUrl(null);
      }
      setStatus({ tone: 'success', message: 'Project saved to portfolio.' });
      toast.push({ title: 'Project created', description: 'Project was published', variant: 'success' });
      onSuccess?.();
    } catch (error) {
      setStatus({
        tone: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
      console.error('Project create exception', error);
      toast.push({ title: 'Create failed', description: (error instanceof Error ? error.message : 'Server error'), variant: 'error' });
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

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="image">Cover image file</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-foreground"
        />
        <p className="text-xs text-muted-foreground">You can upload an image file instead of providing a URL. Max 5 MB.</p>

        {previewUrl ? (
          <div className="pt-2">
            <img src={previewUrl} alt="preview" className="max-h-40 rounded-md object-cover" />
          </div>
        ) : null}
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
