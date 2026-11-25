import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { FaqAccordionContent } from '@/components/blocks/faq-accordion/schema';
import type { FooterColumnsContent } from '@/components/blocks/footer-columns/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { Product } from '@/lib/block-fields';

/*
 * The shop example's content (RFC-0014, lot J0): Kaya, a small shop of objects for the home in Douala. One array of
 * products feeds the grid (lot J), each product's page and the cart. The page is a skeleton until lot J.
 */

const xaf = (amount: number) => ({ amount, currency: 'XAF' });
const photo = (name: string, alt: string) => ({ src: `/placeholders/shop-${name}.svg`, alt, width: 1000, height: 1250 });

export const products: Product[] = [
  {
    title: 'Clay vases, set of three',
    sku: 'KAYA-VASES',
    price: xaf(42000),
    images: [photo('vase', 'Three hand-shaped clay vases on a concrete plinth')],
    badge: 'Bestseller',
    category: 'Ceramics',
    variants: [{ name: 'Finish', options: ['Natural', 'Sand'] }],
    rating: { score: 4.8, count: 64 },
    summary: 'Shaped by hand in Foumban, fired twice, left unglazed.',
    href: '/examples/shop/clay-vases',
  },
  {
    title: 'Terracotta cup',
    sku: 'KAYA-CUP',
    price: xaf(6500),
    was: xaf(8000),
    images: [photo('mug', 'A small terracotta cup on a white table in the sun')],
    category: 'Ceramics',
    rating: { score: 4.6, count: 31 },
    summary: 'A coffee cup glazed inside only, warm to hold.',
    href: '/examples/shop/terracotta-cup',
  },
  {
    title: 'Oak dining chair',
    sku: 'KAYA-CHAIR',
    price: xaf(95000),
    images: [photo('chair', 'A light oak chair with a curved back, against a pale wall')],
    badge: 'New',
    category: 'Furniture',
    variants: [{ name: 'Wood', options: ['Oak', 'Iroko'], soldOut: ['Iroko'] }],
    summary: 'Solid oak, joined without screws by our carpenter in Bonabéri.',
    href: '/examples/shop/oak-chair',
  },
  {
    title: 'Reading lamp',
    sku: 'KAYA-LAMP',
    price: xaf(38000),
    images: [photo('lamp', 'A black desk lamp lighting a dark room')],
    category: 'Lighting',
    rating: { score: 4.7, count: 18 },
    summary: 'A steel arm that holds where you put it.',
    href: '/examples/shop/reading-lamp',
  },
  {
    title: 'Woven baskets',
    sku: 'KAYA-BASKETS',
    price: xaf(15000),
    images: [photo('baskets', 'Round and oval woven baskets laid on white boards')],
    category: 'Textiles',
    variants: [{ name: 'Size', options: ['S', 'M', 'L'] }],
    summary: 'Raffia woven in Bamenda, in three sizes that nest.',
    href: '/examples/shop/woven-baskets',
  },
  {
    title: 'Linen cushion',
    sku: 'KAYA-CUSHION',
    price: xaf(18000),
    images: [photo('cushion', 'A rust linen cushion under a white one, on a woven rug')],
    category: 'Textiles',
    variants: [{ name: 'Colour', options: ['Rust', 'Natural', 'Ink'] }],
    rating: { score: 4.9, count: 42 },
    summary: 'Washed linen, a cover that comes off, a feather insert.',
    href: '/examples/shop/linen-cushion',
  },
];

export const navbar: NavbarSimpleContent = {
  brand: { name: 'Kaya', href: '/examples/shop' },
  links: [
    { label: 'Shop', href: '/examples/shop#products' },
    { label: 'Questions', href: '/examples/shop#faq' },
    { label: 'Contact', href: '/examples/shop#contact' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Shop all', href: '/examples/shop#products' },
};

export const faq: FaqAccordionContent = {
  title: 'Before you order',
  items: [
    { question: 'Do you deliver outside Douala?', answer: 'Yes, to every city in Cameroon, in two to five days. Delivery in Douala is free from 50,000 XAF.' },
    { question: 'How do I pay?', answer: 'Your order opens as a WhatsApp message; we confirm it and send a mobile money or card link.' },
    { question: 'Can I return something?', answer: 'Within fourteen days, unused and in its box. We collect it in Douala; elsewhere the return is yours.' },
  ],
};

export const contact: ContactFormContent = {
  title: 'Visit or write',
  subline: 'The shop is open Tuesday to Saturday, ten to seven. We answer messages the same day.',
  channel: { kind: 'whatsapp', to: '+237 6 90 00 00 00' },
  fields: {
    name: { label: 'Your name', placeholder: 'Nadia Ekotto' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    topic: { label: 'About', options: ['An order', 'A custom piece', 'Something else'] },
    message: { label: 'Your message', placeholder: 'Tell us what you need…' },
  },
  submit: 'Send',
  details: [{ label: 'Shop', value: 'Rue Njo-Njo, Bonapriso, Douala' }],
  labels: {
    intro: 'Hello Kaya, I am writing from your website.',
    required: 'Required',
    invalidEmail: 'Enter an email like name@example.com',
    sent: 'Your message is ready in WhatsApp: send it, and we answer the same day.',
  },
};

export const footer: FooterColumnsContent = {
  brand: { name: 'Kaya', href: '/examples/shop', tagline: 'Objects for the home, made in Cameroon.' },
  columns: [
    { title: 'Shop', links: [{ label: 'Ceramics', href: '/examples/shop#products' }, { label: 'Furniture', href: '/examples/shop#products' }] },
    { title: 'Help', links: [{ label: 'Delivery and returns', href: '/examples/shop#faq' }, { label: 'Contact', href: '/examples/shop#contact' }] },
  ],
  legal: '© 2026 Kaya. Photographs used as placeholders, credited in CREDITS.md.',
};
