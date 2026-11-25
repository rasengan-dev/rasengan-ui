import type { PageComponent } from 'rasengan';
import { ContactForm } from '@/components/blocks/contact-form';
import { FaqAccordion } from '@/components/blocks/faq-accordion';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { contact, faq, footer, navbar } from '@/content/shop';

/**
 * /examples/shop (RFC-0014, lot J0): a home goods shop made only of blocks, with its content in src/content/shop.ts. A
 * skeleton for now: lot J adds the products grid from the same `products` array, a page per product and the cart.
 */
const ShopExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <FaqAccordion content={faq} id="faq" />
    <ContactForm content={contact} id="contact" className="bg-muted/50" />
    <FooterColumns content={footer} />
  </main>
);

ShopExample.metadata = {
  title: 'Shop example · Rasengan UI',
  description: 'A home goods shop made only of Rasengan UI blocks: its products, each product, the cart, and how to reach the shop.',
};

export default ShopExample;
