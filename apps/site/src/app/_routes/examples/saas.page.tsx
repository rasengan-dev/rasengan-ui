import type { PageComponent } from 'rasengan';
import { Careers } from '@/components/blocks/careers';
import { Changelog } from '@/components/blocks/changelog';
import { CustomerStories } from '@/components/blocks/customer-stories';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { HeroSplit } from '@/components/blocks/hero-split';
import { IntegrationsGrid } from '@/components/blocks/integrations-grid';
import { LogosGrid } from '@/components/blocks/logos-grid';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { SecurityBadges } from '@/components/blocks/security-badges';
import { Waitlist } from '@/components/blocks/waitlist';
import { navbar } from '@/content/saas';

/** The demo's waitlist: it waits a moment and says you joined; a real page calls its provider here. */
const join = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

/**
 * /examples/saas (RFC-0013, lot H): a SaaS site made only of marketing blocks, around the pages a product grows into:
 * customer stories, integrations, security, a changelog, open roles, and a waitlist for its next plan.
 */
const SaasExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroSplit />
    <LogosGrid />
    <CustomerStories className="bg-muted/50" />
    <IntegrationsGrid />
    <SecurityBadges className="bg-muted/50" />
    <Changelog />
    <Careers className="bg-muted/50" />
    <Waitlist onSubmit={join} />
    <FooterColumns />
  </main>
);

SaasExample.metadata = {
  title: 'SaaS example · Rasengan UI',
  description:
    'A SaaS site made only of Rasengan UI blocks: customer stories, integrations, security, changelog, careers and a waitlist.',
};

export default SaasExample;
