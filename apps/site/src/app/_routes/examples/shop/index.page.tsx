import type { PageComponent } from 'rasengan';
import { CartDrawer } from '@/components/blocks/cart-drawer';
import { ContactForm } from '@/components/blocks/contact-form';
import { FaqAccordion } from '@/components/blocks/faq-accordion';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ProductGrid } from '@/components/blocks/product-grid';
import { cart, contact, faq, footer, grid, navbar } from '@/content/shop';

/**
 * /examples/shop (RFC-0014, lot J): a home goods shop made only of blocks, with its content in src/content/shop.ts.
 * The grid opens a page per product (/examples/shop/<slug>); the cart, shared by both, orders on WhatsApp. Its button
 * sits above the example toolbar.
 */
const ShopExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <ProductGrid content={grid} headingLevel={1} />
    <FaqAccordion content={faq} id="faq" className="bg-muted/50" />
    <ContactForm content={contact} id="contact" />
    <FooterColumns content={footer} />
    <CartDrawer content={cart} className="bottom-20" />
  </main>
);

ShopExample.metadata = {
  title: 'Shop example · Rasengan UI',
  description: 'A home goods shop made only of Rasengan UI blocks: its products, each product, the cart, and how to reach the shop.',
};

export default ShopExample;
