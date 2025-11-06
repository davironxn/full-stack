import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, ClipboardList, Cog, Target } from 'lucide-react';

const servicePackages = [
  {
    name: 'Product launch sprint',
    timeline: '4 weeks',
    price: '$12,500',
    focus: 'Design, build, and launch a conversion-ready marketing site.',
    highlights: ['Story-driven messaging workshop', 'Responsive marketing site', 'Analytics & automation setup'],
  },
  {
    name: 'SaaS dashboard revamp',
    timeline: '6 weeks',
    price: '$18,000',
    focus: 'Upgrade onboarding, navigation, and data visualization for SaaS teams.',
    highlights: ['User interviews & UX audit', 'Design system refinements', 'Implementation-ready React views'],
  },
  {
    name: 'Ongoing product partnership',
    timeline: 'Retainer',
    price: '$4,200/mo',
    focus: 'Embed design & engineering to iterate quickly with your product team.',
    highlights: ['Bi-weekly roadmap alignment', 'Feature delivery & QA', 'Growth experiments & reporting'],
  },
];

export default function AdminServicesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Services"
        description="Adjust the services, packages, and retainers that prospective clients can book."
        actions={<Button size="sm">Add new service</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          {servicePackages.map((service) => (
            <Card key={service.name} className="border-border/70 bg-card/40">
              <div className="space-y-3 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{service.name}</h2>
                    <p className="text-muted-foreground text-sm">{service.focus}</p>
                  </div>
                  <div className="text-sm text-right text-muted-foreground">
                    <span className="block font-medium text-foreground">{service.price}</span>
                    <span>{service.timeline}</span>
                  </div>
                </div>
                <Separator />
                <ul className="grid gap-2 text-sm">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" size="sm">
                    Edit package
                  </Button>
                  <Button variant="ghost" size="sm">
                    Duplicate
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-border/70 bg-card/40 p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Sales enablement</h2>
              <p className="text-muted-foreground text-sm">
                Keep your proposals, onboarding steps, and collaboration rituals in sync with the services above.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="border-border/60 bg-muted/40 flex items-start gap-3 rounded-lg border px-4 py-3">
                <ClipboardList className="mt-0.5 h-4 w-4 text-sky-500" />
                <div>
                  <p className="font-medium">Proposal templates</p>
                  <p className="text-muted-foreground text-xs">
                    Standardize goals, scope, and success metrics. Last updated 3 days ago.
                  </p>
                </div>
              </div>
              <div className="border-border/60 bg-muted/40 flex items-start gap-3 rounded-lg border px-4 py-3">
                <Target className="mt-0.5 h-4 w-4 text-purple-500" />
                <div>
                  <p className="font-medium">Discovery ritual</p>
                  <p className="text-muted-foreground text-xs">
                    90-minute workshop outline with stakeholder prompts and homework.
                  </p>
                </div>
              </div>
              <div className="border-border/60 bg-muted/40 flex items-start gap-3 rounded-lg border px-4 py-3">
                <Cog className="mt-0.5 h-4 w-4 text-amber-500" />
                <div>
                  <p className="font-medium">Onboarding automation</p>
                  <p className="text-muted-foreground text-xs">
                    Zapier workflow syncs invoices, Notion templates, and kickoff agenda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
