import type { CartDrawerContent } from '@/components/blocks/cart-drawer/schema';
import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { FaqAccordionContent } from '@/components/blocks/faq-accordion/schema';
import type { FooterColumnsContent } from '@/components/blocks/footer-columns/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { ProductDetailContent } from '@/components/blocks/product-detail/schema';
import type { ProductGridContent } from '@/components/blocks/product-grid/schema';
import type { Product } from '@/lib/block-fields';

/*
 * The shop example's content (RFC-0014, lots J0 and J): Kaya, a small shop of objects for the home in Douala. One array
 * of products feeds the grid on /examples/shop and each product's page on /examples/shop/<slug>; the cart is shared by
 * both pages (`shop: 'kaya'`) and orders on WhatsApp.
 */

const xaf = (amount: number) => ({ amount, currency: 'XAF' });
const photo = (name: string, alt: string) => ({ src: `/placeholders/shop-${name}.svg`, alt, width: 1000, height: 1250 });

export const products: Product[] = [
  {
    title: 'Clay vases, set of three',
    sku: 'KAYA-VASES',
    price: xaf(42000),
    images: [
      photo('vase', 'Three hand-shaped clay vases on a concrete plinth'),
      photo('vase-detail', "A close-up of the vases' rough, unglazed clay"),
    ],
    badge: 'Bestseller',
    category: 'Ceramics',
    variants: [{ name: 'Finish', options: ['Natural', 'Sand'] }],
    rating: { score: 4.8, count: 64 },
    summary: 'Shaped by hand in Foumban, fired twice, left unglazed.',
    details: [
      'Three vases from the same clay, 18, 22 and 26 cm tall, made to stand together. Each is shaped by hand, so no two sets are quite alike.',
      'Unglazed outside: for dried stems and branches. For fresh flowers, put a glass inside.',
    ],
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
    details: ['Holds 180 ml, a long coffee or a short tea. Glazed inside, so it washes like any cup; the outside stays bare and warm to the hand.'],
    href: '/examples/shop/terracotta-cup',
  },
  {
    title: 'Oak dining chair',
    sku: 'KAYA-CHAIR',
    price: xaf(95000),
    images: [
      photo('chair', 'A light oak chair with a curved back, against a pale wall'),
      photo('chair-detail', "A close-up of the chair's bolted back and its seat"),
    ],
    badge: 'New',
    category: 'Furniture',
    variants: [{ name: 'Wood', options: ['Oak', 'Iroko'], soldOut: ['Iroko'] }],
    summary: 'Solid oak, bolted at the back, made by our carpenter in Bonabéri.',
    details: [
      'Solid oak, oiled, with a back curved to hold you and bolted so it can be tightened in ten years. Seat height 45 cm.',
      'Made to order in about three weeks. Iroko comes back in January.',
    ],
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
    details: ['A steel arm and shade on a weighted base, with a warm LED bulb and a switch on the cable. 42 cm at rest, 60 cm raised.'],
    href: '/examples/shop/reading-lamp',
  },
  {
    title: 'Woven baskets',
    sku: 'KAYA-BASKETS',
    price: xaf(15000),
    images: [
      photo('baskets', 'Round and oval woven baskets laid on white boards'),
      photo('baskets-detail', "A close-up of a round basket's braided rim"),
    ],
    category: 'Textiles',
    variants: [{ name: 'Size', options: ['S', 'M', 'L'] }],
    summary: 'Raffia woven in Bamenda, in three sizes that nest.',
    details: ['Raffia woven by hand in Bamenda. Small 20 cm, medium 30 cm, large 40 cm across: for bread, for fruit, for everything else.'],
    href: '/examples/shop/woven-baskets',
  },
  {
    title: 'Linen cushion',
    sku: 'KAYA-CUSHION',
    price: xaf(18000),
    images: [
      photo('cushion', 'A rust linen cushion under a white one, on a woven rug'),
      photo('cushion-detail', 'A close-up of the washed linen of the two cushions'),
    ],
    category: 'Textiles',
    variants: [{ name: 'Colour', options: ['Rust', 'Natural', 'Ink'] }],
    rating: { score: 4.9, count: 42 },
    summary: 'Washed linen, a cover that comes off, a feather insert.',
    details: [
      'Linen woven and washed in Bafoussam, so it is soft from the first day. The cover closes with a hidden zip and goes in the machine at 30 °C.',
      'The insert is filled with feathers and keeps its shape; a cotton insert is made on request.',
    ],
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

const locale = 'en-CM';

export const grid: ProductGridContent = {
  eyebrow: 'The shop',
  title: 'Objects for the home',
  subline: 'Made by hand in Cameroon, in small runs. Delivered in Douala within two days.',
  products,
  locale,
  labels: {
    all: 'All',
    filter: 'Filter by category',
    sort: 'Sort by',
    sorts: { featured: 'Featured', priceLow: 'Lowest price', priceHigh: 'Highest price', rating: 'Top rated' },
    shown: '{count} products shown',
    was: 'Was',
    reviews: '{count} reviews',
  },
};

export const cart: CartDrawerContent = {
  title: 'Your bag',
  shop: 'kaya',
  checkout: { kind: 'message', channel: { kind: 'whatsapp', to: '+237 6 90 00 00 00' } },
  freeDelivery: { amount: 50000, currency: 'XAF' },
  locale,
  labels: {
    open: '{title}, {count} items',
    empty: 'Your bag is empty.',
    emptyLine: 'What you add waits here, even if you close the page.',
    browse: 'Browse the shop',
    subtotal: 'Subtotal',
    note: 'Delivery is worked out when we confirm your order.',
    checkout: 'Order on WhatsApp',
    continue: 'Continue shopping',
    remove: 'Remove',
    quantity: 'Quantity',
    less: 'One less',
    more: 'One more',
    close: 'Close',
    away: '{amount} away from free delivery',
    free: 'Free delivery unlocked',
    intro: 'Hello Kaya, I would like to order:',
    total: 'Total',
  },
};

/** The slug of a product's page: the last part of its href. */
export const slugOf = (product: Product) => product.href.split('/').pop() ?? '';

/** A product's page content, or undefined for a slug the shop does not sell. */
export function productOf(slug: string): ProductDetailContent | undefined {
  const product = products.find((item) => slugOf(item) === slug);
  if (!product) return undefined;
  return {
    product,
    shop: 'kaya',
    notes: [
      { icon: 'truck', text: 'Delivered in Douala within two days, free from 50,000 XAF' },
      { icon: 'return', text: 'Fourteen days to change your mind' },
    ],
    locale,
    labels: {
      add: 'Add to bag',
      added: 'Added to your bag',
      pick: 'Pick a {name} first',
      soldOut: 'Sold out',
      quantity: 'Quantity',
      less: 'One less',
      more: 'One more',
      was: 'Was',
      reviews: '{count} reviews',
      details: 'Details',
      photos: 'Photos of the product',
      open: 'Open the photos full screen',
      previous: 'Previous photo',
      next: 'Next photo',
      close: 'Close',
    },
  };
}

/** Under a product: the others, as a smaller grid. */
export const moreProducts = (current: Product): ProductGridContent => ({
  ...grid,
  eyebrow: undefined,
  title: 'You may also like',
  subline: undefined,
  controls: false,
  products: products.filter((product) => product.href !== current.href).slice(0, 4),
});
