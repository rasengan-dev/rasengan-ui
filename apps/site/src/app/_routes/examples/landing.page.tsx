import type { PageComponent } from 'rasengan';
import { CtaBanner } from '@/components/blocks/cta-banner';
import { FaqAccordion } from '@/components/blocks/faq-accordion';
import { FeaturesGrid } from '@/components/blocks/features-grid';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { HeroCentered } from '@/components/blocks/hero-centered';
import { LogosMarquee } from '@/components/blocks/logos-marquee';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { PricingPlans } from '@/components/blocks/pricing-plans';
import { StatsNumbers } from '@/components/blocks/stats-numbers';
import { TestimonialsCarousel } from '@/components/blocks/testimonials-carousel';

/**
 * /examples/landing (RFC-0008, lot A): a whole landing page made only of the marketing blocks, each with its example
 * content, full window. The floating toolbar switches the village and the scheme, and every section follows. A real
 * page passes its own `content` to each.
 */
const LandingExample: PageComponent = () => (
  <main id="main">
    <NavbarSimple className="sticky top-0 z-40" />
    <HeroCentered />
    <LogosMarquee />
    <FeaturesGrid />
    <StatsNumbers className="bg-muted/50" />
    <TestimonialsCarousel />
    <PricingPlans className="bg-muted/50" />
    <FaqAccordion />
    <CtaBanner />
    <FooterColumns />
  </main>
);

LandingExample.metadata = {
  title: 'Landing page example · Rasengan UI',
  description:
    'A startup landing page made only of Rasengan UI blocks: navbar, hero, logos, features, stats, testimonials, pricing, FAQ, call to action, footer.',
};

export default LandingExample;
