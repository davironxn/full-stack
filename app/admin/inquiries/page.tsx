import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Users } from 'lucide-react';

const inquiries = [
  {
    name: 'Helena Brook',
    email: 'helena@northshore.io',
    company: 'Northshore',
    budget: '$8k - $12k',
    project: 'Product marketing site refresh',
    status: 'Needs reply',
    received: '2 hours ago',
  },
  {
    name: 'Samir Patel',
    email: 'samir@orbital.app',
    company: 'Orbital',
    budget: '$15k+',
    project: 'Customer dashboard overhaul',
    status: 'Discovery booked',
    received: 'Yesterday',
  },
  {
    name: 'Ella Moritz',
    email: 'ella@founderscircle.co',
    company: 'Founders Circle',
    budget: '$5k - $7k',
    project: 'Pitch deck design + microsite',
    status: 'Waiting on brief',
    received: '3 days ago',
  },
];

export default function AdminInquiriesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Inquiries"
        description="Qualify inbound leads, log follow-ups, and keep your response times sharp."
        actions={<Button size="sm">Open contact form</Button>}
      />

      <Card className="border-border/70 bg-card/40">
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Inbox</h2>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
          <Separator />
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.email}
                className="border-border/60 bg-muted/20 space-y-2 rounded-lg border px-4 py-3"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">{inquiry.name}</p>
                    <p className="text-muted-foreground text-xs">{inquiry.company}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      inquiry.status === 'Discovery booked'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : inquiry.status === 'Needs reply'
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-slate-500/10 text-slate-600'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>
                <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {inquiry.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {inquiry.budget}
                  </p>
                  <p className="sm:col-span-2">{inquiry.project}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Reply now
                  </Button>
                  <Button variant="ghost" size="sm">
                    Schedule call
                  </Button>
                  <span className="text-muted-foreground ml-auto text-xs">{inquiry.received}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-border/70 bg-muted/20 mt-6 rounded-lg border px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
              <Users className="h-3.5 w-3.5" />
              Response playbook
            </div>
            Reply within 4 business hours, then log next steps to keep analytics accurate.
          </div>
        </div>
      </Card>
    </div>
  );
}
