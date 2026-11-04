import { useState, type ComponentType } from 'react';
import { BellIcon, PaletteIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { natures, villages, type Nature, type Village } from '@rasengan-ui/villages';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { VillageScope } from '@/lib/village-scope';
import { cn } from '@/lib/utils';
import { setSettings, useSettings } from '@/settings';

const sections = [
  { id: 'profile', label: 'Profile', Icon: UserIcon },
  { id: 'appearance', label: 'Appearance', Icon: PaletteIcon },
  { id: 'notifications', label: 'Notifications', Icon: BellIcon },
  { id: 'security', label: 'Security', Icon: ShieldIcon },
] as const;

type Section = (typeof sections)[number]['id'];

function Heading({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid gap-1">
      <h3 className="font-display text-lg font-semibold tracking-display case-heading">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const emails = {
  'naruto@konoha.dev': 'naruto@konoha.dev',
  'hokage@konoha.dev': 'hokage@konoha.dev',
};

function Profile() {
  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success('Profile updated');
      }}
    >
      <Heading title="Profile" description="This is how others see you on the site." />
      <Separator />
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input defaultValue="naruto" />
        <FieldDescription>Your public name. You can change it once every 30 days.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Select items={emails} defaultValue="naruto@konoha.dev">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(emails).map((email) => (
              <SelectItem key={email} value={email}>
                {email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>Pick one of your verified addresses.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea defaultValue="I'm going to be Hokage, believe it!" />
      </Field>
      <Button type="submit" className="w-fit">
        Update profile
      </Button>
    </form>
  );
}

/** The real settings of this page: changing them here changes the whole site. */
function Appearance() {
  const { village, nature, dark } = useSettings();
  return (
    <div className="grid gap-6">
      <Heading title="Appearance" description="These change the whole site, not just this card." />
      <Separator />
      <div className="grid gap-3">
        <span className="text-sm font-medium" id="village-label">
          Village
        </span>
        <RadioGroup
          value={village}
          onValueChange={(value) => setSettings({ village: value as Village })}
          aria-labelledby="village-label"
          className="grid gap-3 sm:grid-cols-3"
        >
          {(Object.keys(villages) as Village[]).map((name) => (
            <Label key={name} className="flex-col items-stretch gap-2">
              <VillageScope
                village={name}
                nature={nature}
                scheme={dark ? 'dark' : 'light'}
                as="div"
                className={cn(
                  'grid gap-2 rounded-lg border-village bg-background p-3 transition-shadow duration-fast',
                  village === name && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
                )}
              >
                <div className="grid gap-1.5 rounded-control bg-card p-2 shadow-sm border-village">
                  <div className="h-2 w-3/5 rounded-pill bg-foreground/70" />
                  <div className="h-2 w-4/5 rounded-pill bg-muted-foreground/40" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-4 flex-1 rounded-control bg-primary" />
                  <div className="h-4 flex-1 rounded-control border-village bg-input-bg" />
                </div>
              </VillageScope>
              <span className="flex items-center gap-2">
                <RadioGroupItem value={name} />
                {villages[name].title}
              </span>
            </Label>
          ))}
        </RadioGroup>
        <p className="text-sm text-muted-foreground">{villages[village].description}</p>
      </div>
      <Field>
        <FieldLabel>Nature</FieldLabel>
        <Select
          items={Object.fromEntries(Object.entries(natures).map(([name, n]) => [name, n.title]))}
          value={nature}
          onValueChange={(value) => setSettings({ nature: value as Nature })}
        >
          <SelectTrigger className="sm:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(natures) as Nature[]).map((name) => (
              <SelectItem key={name} value={name}>
                <span className="flex items-center gap-2">
                  <span
                    data-nature={name}
                    className="size-2.5 rounded-full bg-primary"
                    aria-hidden
                  />
                  {natures[name].title}
                  <span className="text-muted-foreground">{natures[name].element}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>The accent colour, for buttons, focus and charts.</FieldDescription>
      </Field>
      <Label className="justify-between sm:w-64">
        Dark mode
        <Switch checked={dark} onCheckedChange={(checked) => setSettings({ dark: checked })} />
      </Label>
    </div>
  );
}

function Notifications() {
  const [channel, setChannel] = useState('mentions');
  return (
    <div className="grid gap-6">
      <Heading title="Notifications" description="Configure how you receive notifications." />
      <Separator />
      <div className="grid gap-3">
        <span className="text-sm font-medium" id="notify-label">
          Notify me about
        </span>
        <RadioGroup
          value={channel}
          onValueChange={(value) => setChannel(value as string)}
          aria-labelledby="notify-label"
        >
          <Label>
            <RadioGroupItem value="all" /> All new messages
          </Label>
          <Label>
            <RadioGroupItem value="mentions" /> Direct messages and mentions
          </Label>
          <Label>
            <RadioGroupItem value="none" /> Nothing
          </Label>
        </RadioGroup>
      </div>
      <div className="grid gap-4">
        {[
          {
            label: 'Deploy emails',
            description: 'A message when a production deploy finishes.',
            checked: true,
          },
          {
            label: 'Security emails',
            description: 'Sign-ins from new devices and key changes.',
            checked: true,
            disabled: true,
          },
          {
            label: 'Product news',
            description: 'New villages, natures and components.',
            checked: false,
          },
        ].map((item) => (
          <Label
            key={item.label}
            className="items-start justify-between gap-6 rounded-lg border-village p-4"
          >
            <span className="grid gap-1">
              {item.label}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground normal-case">
                {item.description}
              </span>
            </span>
            <Switch defaultChecked={item.checked} disabled={item.disabled} />
          </Label>
        ))}
      </div>
      <Label>
        <Checkbox defaultChecked /> Use different settings for my mobile devices
      </Label>
    </div>
  );
}

function Security() {
  return (
    <div className="grid gap-6">
      <Heading title="Security" description="Keep your account safe." />
      <Separator />
      <Field>
        <FieldLabel>Current password</FieldLabel>
        <Input type="password" />
      </Field>
      <Field>
        <FieldLabel>New password</FieldLabel>
        <Input type="password" />
        <FieldDescription>At least 12 characters.</FieldDescription>
      </Field>
      <Label className="items-start justify-between gap-6 rounded-lg border-village p-4">
        <span className="grid gap-1">
          Two-factor authentication
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground normal-case">
            A code from your phone at every sign-in.
          </span>
        </span>
        <Switch defaultChecked />
      </Label>
      <Button className="w-fit" onClick={() => toast.success('Password updated')}>
        Update password
      </Button>
    </div>
  );
}

const panels: Record<Section, ComponentType> = {
  profile: Profile,
  appearance: Appearance,
  notifications: Notifications,
  security: Security,
};

/** An account settings page; its Appearance section drives the site's village, nature and scheme. */
export function SettingsExample() {
  const [section, setSection] = useState<Section>('appearance');
  const Panel = panels[section];
  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h2 className="font-display text-2xl font-semibold tracking-display case-heading">
          Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and how the site looks.
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-[12rem_1fr]">
        <nav
          aria-label="Settings sections"
          className="hide-scrollbar flex gap-1 overflow-x-auto md:flex-col"
        >
          {sections.map(({ id, label, Icon }) => (
            <Button
              key={id}
              variant="ghost"
              aria-current={section === id ? 'page' : undefined}
              onClick={() => setSection(id)}
              className={cn(
                'justify-start',
                section === id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
              )}
            >
              <Icon /> {label}
            </Button>
          ))}
        </nav>
        <div className="max-w-2xl">
          <Panel />
        </div>
      </div>
    </div>
  );
}
