import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const notificationSettings = [
  {
    id: 'notify-inquiries',
    label: 'Notify me when a new inquiry arrives',
    description: 'Sends a push notification and email within 5 minutes.',
    checked: true,
  },
  {
    id: 'notify-publish',
    label: 'Alert me when a draft is ready to publish',
    description: 'Keeps you informed about editorial progress.',
    checked: true,
  },
  {
    id: 'notify-errors',
    label: 'System alerts',
    description: 'Receive warnings if the contact form or media sync fails.',
    checked: false,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Site settings"
        description="Manage contact details, automation hooks, and notification preferences."
        actions={<Button size="sm">Save changes</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card className="border-border/70 bg-card/40">
          <div className="space-y-4 p-6">
            <div>
              <h2 className="text-lg font-semibold">Contact details</h2>
              <p className="text-muted-foreground text-sm">
                Update the information shown on the site and used in proposals.
              </p>
            </div>
            <div className="space-y-3">
              <label className="flex flex-col gap-1 text-sm font-medium" htmlFor="studio-email">
                Studio email
                <Input id="studio-email" defaultValue="hello@yourstudio.com" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium" htmlFor="studio-phone">
                Contact phone
                <Input id="studio-phone" defaultValue="+1 (415) 555-0119" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium" htmlFor="studio-booking">
                Booking link
                <Input id="studio-booking" defaultValue="https://cal.com/yourstudio/intro" />
              </label>
            </div>
          </div>
        </Card>

        <Card className="border-border/70 bg-card/40">
          <div className="space-y-4 p-6">
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-muted-foreground text-sm">
                Choose which alerts keep you informed about leads and content.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <label
                  key={setting.id}
                  htmlFor={setting.id}
                  className="border-border/60 bg-muted/20 flex items-start gap-3 rounded-lg border px-4 py-3"
                >
                  <input
                    id={setting.id}
                    type="checkbox"
                    defaultChecked={setting.checked}
                    className="mt-1 size-4 rounded border-border text-primary focus-visible:ring-primary"
                  />
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-muted-foreground text-xs">{setting.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
