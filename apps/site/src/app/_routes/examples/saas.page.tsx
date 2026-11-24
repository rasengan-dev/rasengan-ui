import type { PageComponent } from 'rasengan';
import { Careers } from '@/components/blocks/careers';
import { Changelog } from '@/components/blocks/changelog';
import { CustomerStories } from '@/components/blocks/customer-stories';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { HeroProduct } from '@/components/blocks/hero-product';
import { IntegrationsGrid } from '@/components/blocks/integrations-grid';
import { LogosGrid } from '@/components/blocks/logos-grid';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ProcessSteps } from '@/components/blocks/process-steps';
import { SecurityBadges } from '@/components/blocks/security-badges';
import { TestimonialsMarquee } from '@/components/blocks/testimonials-marquee';
import { Waitlist } from '@/components/blocks/waitlist';
import { navbar } from '@/content/saas';

/** The demo's waitlist: it waits a moment and says you joined; a real page calls its provider here. */
const join = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

/**
 * /examples/saas (RFC-0013, lots H and I): a SaaS site made only of marketing blocks, around the pages a product grows
 * into: its screen and how it works, customer stories, integrations, security, a changelog, what customers say, open
 * roles, and a waitlist for its next plan.
 */
const SaasExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroProduct />
    <LogosGrid />
    <ProcessSteps />
    <CustomerStories className="bg-muted/50" />
    <IntegrationsGrid />
    <SecurityBadges className="bg-muted/50" />
    <Changelog />
    <TestimonialsMarquee />
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
