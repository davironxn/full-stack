import Image from 'next/image';
import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FolderPlus, ImageDown, UploadCloud } from 'lucide-react';

const mediaLibrary = [
  {
    title: 'Hero gradient',
    src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80',
    size: '320 KB',
    updated: '2 days ago',
  },
  {
    title: 'Dashboard mockup',
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
    size: '1.1 MB',
    updated: '5 days ago',
  },
  {
    title: 'Team headshots',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    size: '780 KB',
    updated: 'Last week',
  },
  {
    title: 'Case study cover',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    size: '540 KB',
    updated: 'Yesterday',
  },
];

export default function AdminMediaPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Media library"
        description="Centralize visual assets used across the portfolio and proposals."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FolderPlus className="mr-2 h-4 w-4" />
              New collection
            </Button>
            <Button size="sm">
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        }
      />

      <Card className="border-border/70 bg-card/40">
        <div className="space-y-4 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Asset inventory</h2>
              <p className="text-muted-foreground text-sm">
                Organize hero images, case study visuals, and downloadable resources.
              </p>
            </div>
            <Input placeholder="Search media…" className="max-w-xs" />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mediaLibrary.map((asset) => (
              <div
                key={asset.title}
                className="border-border/60 bg-muted/20 flex flex-col gap-3 rounded-xl border p-4"
              >
                <div className="relative h-36 w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={asset.src}
                    alt={asset.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{asset.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {asset.size} · Updated {asset.updated}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ImageDown className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Use in project
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
