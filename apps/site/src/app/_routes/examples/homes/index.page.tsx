import type { PageComponent } from 'rasengan';
import { ContactForm } from '@/components/blocks/contact-form';
import { FaqAccordion } from '@/components/blocks/faq-accordion';
import { FilterBar } from '@/components/blocks/filter-bar';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { ListingCards } from '@/components/blocks/listing-cards';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { SearchHero } from '@/components/blocks/search-hero';
import { cards, contact, faq, filters, footer, navbar, search } from '@/content/homes';

/**
 * /examples/homes (RFC-0014, lot K): a property agency made only of blocks, with its content in src/content/homes.ts.
 * The search and the filters write the page's address; the cards follow it, so a shortlist is a link. Each card opens
 * the home's page (/examples/homes/<slug>).
 */
const HomesExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <SearchHero content={search} />
    <FilterBar content={filters} className="pb-0" />
    <ListingCards content={cards} className="pt-8 @3xl:pt-10" />
    <FaqAccordion content={faq} id="faq" className="bg-muted/50" />
    <ContactForm content={contact} id="contact" />
    <FooterColumns content={footer} />
  </main>
);

HomesExample.metadata = {
  title: 'Homes example · Rasengan UI',
  description: "A property agency made only of Rasengan UI blocks: a search, filters in the address, the homes, and each home's page.",
};

export default HomesExample;
