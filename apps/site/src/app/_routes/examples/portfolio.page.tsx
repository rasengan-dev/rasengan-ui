import type { PageComponent } from 'rasengan';
import { ContactForm } from '@/components/blocks/contact-form';
import { FooterWordmark } from '@/components/blocks/footer-wordmark';
import { HeroWordmark } from '@/components/blocks/hero-wordmark';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { contact, footer, hero, navbar } from '@/content/portfolio';

/**
 * /examples/portfolio (RFC-0013, lot G0): a design studio's site made only of blocks, with its content in
 * src/content/portfolio.ts. A skeleton for now: lot G adds the projects between the hero and the contact form, from the
 * same `projects` array, and a case study page per project.
 */
const PortfolioExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroWordmark content={hero} />
    <ContactForm content={contact} id="contact" className="bg-muted/50" />
    <FooterWordmark content={footer} />
  </main>
);

PortfolioExample.metadata = {
  title: 'Portfolio example · Rasengan UI',
  description: "A design studio's site made only of Rasengan UI blocks: its work, its studio and a way to start a project.",
};

export default PortfolioExample;
