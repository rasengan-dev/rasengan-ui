import type { PageComponent } from 'rasengan';
import { ContactForm } from '@/components/blocks/contact-form';
import { FaqAccordion } from '@/components/blocks/faq-accordion';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { contact, faq, footer, navbar } from '@/content/homes';

/**
 * /examples/homes (RFC-0014, lot J0): a property agency's site made only of blocks, with its content in
 * src/content/homes.ts. A skeleton for now: lot K adds the search, the filters, the cards and a page per listing.
 */
const HomesExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <FaqAccordion content={faq} id="faq" />
    <ContactForm content={contact} id="contact" className="bg-muted/50" />
    <FooterColumns content={footer} />
  </main>
);

HomesExample.metadata = {
  title: 'Homes example · Rasengan UI',
  description: 'A property agency made only of Rasengan UI blocks: search, filters, listings and a page per home.',
};

export default HomesExample;
