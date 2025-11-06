import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Quote, Sparkles, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Amelia Chen',
    company: 'Lumen AI',
    quote:
      'Idowu translated a dense product into a joyful experience. We shipped two weeks early and customer satisfaction soared.',
    status: 'Published',
  },
  {
    name: 'Marcus Allen',
    company: 'Northshore',
    quote:
      'From strategy to delivery, he gave our team confidence. Traffic doubled and the new brand has opened enterprise doors.',
    status: 'Draft',
  },
  {
    name: 'Sara Vélez',
    company: 'Waveform',
    quote:
      'Clean code, crisp design systems, and excellent communication—hand-off was seamless for our engineers.',
    status: 'Scheduled',
  },
];

export default function AdminTestimonialsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Testimonials"
        description="Capture social proof and publish quotes across the site and proposals."
        actions={<Button size="sm">Request feedback</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card className="border-border/70 bg-card/40 p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Pipeline</h2>
              <p className="text-muted-foreground text-sm">
                Automate outreach and track responses from recent client engagements.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="border-border/60 bg-muted/30 flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Send follow-up to Northshore</span>
                <Button variant="ghost" size="sm">
                  Send
                </Button>
              </div>
              <div className="border-border/60 bg-muted/30 flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Invite product partner for case study quote</span>
                <Button variant="ghost" size="sm">
                  Copy link
                </Button>
              </div>
              <div className="border-border/60 bg-muted/30 flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Outline testimonial for Waveform</span>
                <Button variant="ghost" size="sm">
                  Draft
                </Button>
              </div>
            </div>

            <div className="border-border/60 bg-muted/20 rounded-lg border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
                <Users className="h-3.5 w-3.5" />
                Collaboration tip
              </div>
              Pair a Loom walkthrough with your request so clients remember the experience you delivered.
            </div>
          </div>
        </Card>

        <Card className="border-border/70 bg-card/40">
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Quotes</h2>
              <Button variant="outline" size="sm">
                Export library
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="border-border/50 bg-muted/20 space-y-3 rounded-lg border px-4 py-3"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.company}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                        testimonial.status === 'Published'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : testimonial.status === 'Scheduled'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-slate-500/10 text-slate-600'
                      }`}
                    >
                      {testimonial.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90">“{testimonial.quote}”</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Feature on hero
                    </Button>
                    <Button variant="ghost" size="sm">
                      Copy snippet
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-border/70 bg-muted/20 rounded-lg border px-4 py-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
                <Quote className="h-3.5 w-3.5" />
                Voice & tone
              </div>
              Lead with the client outcome, then reinforce with how collaboration felt. Sprinkle a Sparkles callout to note any awards.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
