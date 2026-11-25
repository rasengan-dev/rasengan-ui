import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { FaqAccordionContent } from '@/components/blocks/faq-accordion/schema';
import type { FooterColumnsContent } from '@/components/blocks/footer-columns/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { Listing } from '@/lib/block-fields';

/*
 * The listings example's content (RFC-0014, lot J0): Nyanga, an agency renting and selling homes in Douala and Kribi.
 * One array of listings feeds the search, the filters, the cards and each listing's page (lot K). A skeleton until then.
 */

const xaf = (amount: number) => ({ amount, currency: 'XAF' });
const photo = (name: string, alt: string) => ({ src: `/placeholders/place-${name}.svg`, alt, width: 1200, height: 900 });

export const listings: Listing[] = [
  {
    title: 'Bright flat with a balcony',
    kind: 'Apartment',
    status: 'To let',
    place: 'Bonapriso, Douala',
    price: xaf(450000),
    period: 'month',
    facts: [{ label: 'beds', value: 2 }, { label: 'baths', value: 1 }, { label: 'm²', value: 95 }],
    images: [photo('living-room', 'A bright living room with tall windows and a long sofa')],
    tags: ['Furnished', 'Generator'],
    href: '/examples/homes/bonapriso-flat',
  },
  {
    title: 'Family house with a garage',
    kind: 'House',
    status: 'For sale',
    place: 'Bonamoussadi, Douala',
    price: xaf(185000000),
    period: 'once',
    facts: [{ label: 'beds', value: 4 }, { label: 'baths', value: 3 }, { label: 'm²', value: 260 }],
    images: [photo('house', 'A white house with a wide porch and glass garage doors')],
    href: '/examples/homes/bonamoussadi-house',
  },
  {
    title: 'Quiet studio near the market',
    kind: 'Studio',
    status: 'To let',
    place: 'Akwa, Douala',
    price: xaf(180000),
    period: 'month',
    facts: [{ label: 'beds', value: 1 }, { label: 'baths', value: 1 }, { label: 'm²', value: 38 }],
    images: [photo('bedroom', 'A calm bedroom with wood panels and a plant')],
    tags: ['Furnished'],
    href: '/examples/homes/akwa-studio',
  },
  {
    title: 'Open kitchen loft',
    kind: 'Apartment',
    status: 'For sale',
    place: 'Bali, Douala',
    price: xaf(92000000),
    period: 'once',
    facts: [{ label: 'beds', value: 2 }, { label: 'baths', value: 2 }, { label: 'm²', value: 120 }],
    images: [photo('kitchen', 'A long kitchen in pale wood opening onto a garden')],
    href: '/examples/homes/bali-loft',
  },
  {
    title: 'Villa with a pool by the sea',
    kind: 'Villa',
    status: 'To let',
    place: 'Kribi',
    price: xaf(120000),
    period: 'night',
    facts: [{ label: 'beds', value: 5 }, { label: 'baths', value: 4 }, { label: 'm²', value: 340 }],
    images: [photo('villa', 'A white villa with a pool and loungers among palm trees')],
    rating: { score: 4.9, count: 37 },
    href: '/examples/homes/kribi-villa',
  },
  {
    title: 'Café space on a corner',
    kind: 'Commercial',
    status: 'To let',
    place: 'Bonanjo, Douala',
    price: xaf(900000),
    period: 'month',
    facts: [{ label: 'm²', value: 150 }],
    images: [photo('cafe', 'A furnished café with a long bench and round tables')],
    href: '/examples/homes/bonanjo-cafe',
  },
];

export const navbar: NavbarSimpleContent = {
  brand: { name: 'Nyanga', href: '/examples/homes' },
  links: [
    { label: 'Homes', href: '/examples/homes#listings' },
    { label: 'Questions', href: '/examples/homes#faq' },
    { label: 'Contact', href: '/examples/homes#contact' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'List your home', href: '/examples/homes#contact' },
};

export const faq: FaqAccordionContent = {
  title: 'Renting and buying with us',
  items: [
    { question: 'Do you charge tenants a fee?', answer: 'One month of rent when the lease is signed, nothing before. Visits are free.' },
    { question: 'Can I visit before I decide?', answer: 'Yes, every home, with one of us. Ask from its page and we answer the same day.' },
    { question: 'Are the prices final?', answer: 'Prices are the owners\' asks. We can say what similar homes went for, and pass on an offer.' },
  ],
};

export const contact: ContactFormContent = {
  title: 'Find, visit, or list a home',
  subline: 'Tell us what you look for, or about the home you want to rent or sell.',
  channel: { kind: 'whatsapp', to: '+237 6 91 00 00 00' },
  fields: {
    name: { label: 'Your name', placeholder: 'Paul Ngono' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    topic: { label: 'About', options: ['Renting', 'Buying', 'Listing my home'] },
    message: { label: 'Your message', placeholder: 'Where, how big, by when…' },
  },
  submit: 'Send',
  details: [{ label: 'Office', value: 'Boulevard de la Liberté, Akwa, Douala' }],
  labels: {
    intro: 'Hello Nyanga, I am writing from your website.',
    required: 'Required',
    invalidEmail: 'Enter an email like name@example.com',
    sent: 'Your message is ready in WhatsApp: send it, and we answer the same day.',
  },
};

export const footer: FooterColumnsContent = {
  brand: { name: 'Nyanga', href: '/examples/homes', tagline: 'Homes to rent and buy in Douala and Kribi.' },
  columns: [
    { title: 'Homes', links: [{ label: 'To let', href: '/examples/homes#listings' }, { label: 'For sale', href: '/examples/homes#listings' }] },
    { title: 'Agency', links: [{ label: 'Questions', href: '/examples/homes#faq' }, { label: 'Contact', href: '/examples/homes#contact' }] },
  ],
  legal: '© 2026 Nyanga. Photographs used as placeholders, credited in CREDITS.md.',
};
