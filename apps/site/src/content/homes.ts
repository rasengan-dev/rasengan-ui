import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { FaqAccordionContent } from '@/components/blocks/faq-accordion/schema';
import type { FilterBarContent } from '@/components/blocks/filter-bar/schema';
import type { FooterColumnsContent } from '@/components/blocks/footer-columns/schema';
import type { ListingCardsContent } from '@/components/blocks/listing-cards/schema';
import type { ListingDetailContent } from '@/components/blocks/listing-detail/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { SearchHeroContent } from '@/components/blocks/search-hero/schema';
import type { Listing } from '@/lib/block-fields';

/*
 * The listings example's content (RFC-0014, lots J0 and K): Nyanga, an agency renting and selling homes in Douala and
 * Kribi. One array of listings feeds the filters, the cards on /examples/homes and each listing's page on
 * /examples/homes/<slug>. The photos are placeholders: a listing's second and third show other rooms, not its own.
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
    images: [
      photo('living-room', 'A bright living room with tall windows and a long sofa'),
      photo('bedroom', 'A calm bedroom with wood panels and a plant'),
      photo('kitchen', 'A long kitchen in pale wood opening onto a garden'),
    ],
    tags: ['Furnished', 'Generator'],
    summary: 'On the third floor of a quiet street, with a balcony over the trees.',
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
    images: [
      photo('house', 'A white house with a wide porch and glass garage doors'),
      photo('living-room', 'A bright living room with tall windows and a long sofa'),
      photo('kitchen', 'A long kitchen in pale wood opening onto a garden'),
    ],
    summary: 'Four bedrooms, a porch and a walled garden on a closed street.',
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
    summary: 'Furnished, two streets from the market, ready to move into.',
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
    summary: 'Two levels in a converted warehouse, opening onto a shared garden.',
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
    images: [
      photo('villa', 'A white villa with a pool and loungers among palm trees'),
      photo('bedroom', 'A calm bedroom with wood panels and a plant'),
      photo('living-room', 'A bright living room with tall windows and a long sofa'),
    ],
    rating: { score: 4.9, count: 37 },
    summary: 'Five bedrooms and a pool, across the road from the beach.',
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
    summary: 'A corner café let with its furniture, ready to open.',
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

const locale = 'en-CM';
const periods = { once: '', month: 'a month', week: 'a week', night: 'a night' };

export const search: SearchHeroContent = {
  eyebrow: 'Nyanga · homes in Douala and Kribi',
  title: 'Find the home that fits your days',
  subline: 'Flats, houses and villas to rent or buy, visited by us before they are listed.',
  image: { src: '/placeholders/place-villa.svg', alt: 'A white villa with a pool and loungers among palm trees', width: 1200, height: 900 },
  action: '/examples/homes#listings',
  fields: {
    query: { label: 'What are you looking for?', placeholder: 'A balcony, a garden, a pool…' },
    kind: { label: 'Type', any: 'Any type', options: ['Apartment', 'House', 'Studio', 'Villa', 'Commercial'] },
    place: { label: 'Where', any: 'Anywhere', options: ['Douala', 'Kribi'] },
  },
  submit: 'Search',
  suggestions: [
    { label: 'Furnished', href: '/examples/homes?q=furnished#listings' },
    { label: 'By the sea', href: '/examples/homes?place=Kribi#listings' },
    { label: 'To buy', href: '/examples/homes?status=For%20sale#listings' },
  ],
  labels: { search: 'Search homes', suggestions: 'Popular' },
};

export const filters: FilterBarContent = {
  items: listings,
  facets: [
    { key: 'status', label: 'For', kind: 'choice', options: ['To let', 'For sale'] },
    { key: 'kind', label: 'Type', kind: 'choice' },
    { key: 'beds', label: 'Bedrooms', kind: 'atLeast' },
  ],
  search: { label: 'Search', placeholder: 'Balcony, pool, Akwa…' },
  locale,
  labels: {
    filters: 'Filter homes',
    reset: 'Reset',
    sort: 'Sort by',
    sorts: { featured: 'Recommended', priceLow: 'Lowest price', priceHigh: 'Highest price', rating: 'Top rated' },
    shown: '{count} homes',
    atLeast: 'or more',
  },
};

export const cards: ListingCardsContent = {
  eyebrow: 'Homes',
  title: 'To rent and to buy',
  subline: 'Every home visited by one of us before it is listed.',
  listings,
  locale,
  labels: {
    periods,
    reviews: '{count} reviews',
    none: 'No home matches these filters.',
    reset: 'Show every home',
    shown: '{count} homes',
  },
};

/** The slug of a listing's page: the last part of its href. */
export const slugOf = (listing: Listing) => listing.href.split('/').pop() ?? '';

/** What each home's page adds to its listing. */
const pages: Record<string, Pick<ListingDetailContent, 'description' | 'amenities' | 'details'>> = {
  'bonapriso-flat': {
    description: [
      'The flat takes the whole third floor of a small building on a quiet street in Bonapriso. The living room opens on a balcony over the trees and gets the morning sun.',
      "Two bedrooms with built-in wardrobes, a bathroom with a walk-in shower, and a kitchen fitted last year. It is let furnished, and the building's generator takes over when the power cuts.",
    ],
    amenities: ['Balcony', 'Generator', 'Water tank', 'Guard at night', 'Parking for one car', 'Fitted kitchen'],
    details: [
      { label: 'Floor', value: 'Third, no lift' },
      { label: 'Lease', value: 'One year at least' },
      { label: 'Deposit', value: 'Two months' },
    ],
  },
  'bonamoussadi-house': {
    description: [
      'A family house on a closed street, built in 2018: four bedrooms upstairs, a living room that opens onto the porch, and a garage for two cars.',
      'The garden is small and walled, with a mango tree and room for a table. Title deed in order, visits on weekdays.',
    ],
    amenities: ['Garage for two cars', 'Garden', 'Borehole', 'Solar water heater'],
    details: [
      { label: 'Built', value: '2018' },
      { label: 'Plot', value: '400 m²' },
      { label: 'Title', value: 'Land title in order' },
    ],
  },
  'akwa-studio': {
    description: [
      'A furnished studio on the second floor, two streets from the market: a bed, a desk by the window, a small kitchen and a shower room.',
      'Water and electricity are on the tenant, the internet box is already there.',
    ],
    amenities: ['Furnished', 'Internet box', 'Water tank'],
    details: [
      { label: 'Floor', value: 'Second' },
      { label: 'Lease', value: 'Six months at least' },
    ],
  },
  'bali-loft': {
    description: [
      'A loft on two levels in a converted warehouse in Bali: a long kitchen open onto a shared garden, and two bedrooms on the mezzanine.',
      'High ceilings keep it cool; the building has a lift and a guard day and night.',
    ],
    amenities: ['Shared garden', 'Lift', 'Guard day and night', 'Air conditioning'],
    details: [
      { label: 'Floor', value: 'Ground and mezzanine' },
      { label: 'Charges', value: '25,000 XAF a month' },
    ],
  },
  'kribi-villa': {
    description: [
      'A white villa on the beach road south of Kribi, with a pool among the palm trees and five bedrooms that each open onto the garden.',
      'Rented by the night, with a cook on request. The sea is across the road, two minutes on foot.',
    ],
    amenities: ['Pool', 'Garden', 'Cook on request', 'Generator', 'Parking for three cars'],
    details: [
      { label: 'Check-in', value: 'From 2 pm' },
      { label: 'Minimum stay', value: 'Two nights' },
    ],
  },
  'bonanjo-cafe': {
    description: [
      'A corner café in Bonanjo, let with its benches, tables and counter: the space is ready to open.',
      'A street-level room with two windows on the corner, a back kitchen, and a storeroom. Office workers walk past from seven in the morning.',
    ],
    amenities: ['Fitted counter', 'Back kitchen', 'Storeroom', 'Two street windows'],
    details: [
      { label: 'Use', value: 'Café, restaurant, shop' },
      { label: 'Lease', value: 'Three years, renewable' },
    ],
  },
};

/** A listing's page content, or undefined for a slug the agency does not list. */
export function listingOf(slug: string): ListingDetailContent | undefined {
  const listing = listings.find((item) => slugOf(item) === slug);
  if (!listing) return undefined;
  return {
    listing,
    ...pages[slug],
    enquiry: {
      title: 'Ask about this home',
      subline: 'We answer the same day, and visits are free.',
      channel: { kind: 'whatsapp', to: '+237 6 91 00 00 00' },
      fields: {
        name: { label: 'Your name', placeholder: 'Paul Ngono' },
        phone: { label: 'Phone', placeholder: '+237 6 …' },
        message: { label: 'Your message', placeholder: 'When could you visit? For how long?' },
      },
      submit: 'Send my request',
    },
    locale,
    labels: {
      periods,
      about: 'About this home',
      amenities: 'What it comes with',
      details: 'Details',
      reviews: '{count} reviews',
      photos: 'Photos of the home',
      all: 'All {count} photos',
      open: 'Open photo {n} full screen',
      previous: 'Previous photo',
      next: 'Next photo',
      close: 'Close',
      required: 'Required',
      intro: 'Hello Nyanga, I am writing about {title}.',
      sent: 'Your message is ready in WhatsApp: send it, and we answer the same day.',
    },
  };
}

/** Under a listing: others of the same status, as cards. */
export const moreHomes = (current: Listing): ListingCardsContent => ({
  ...cards,
  eyebrow: undefined,
  title: 'More homes',
  subline: undefined,
  listings: listings.filter((listing) => listing.href !== current.href).slice(0, 3),
});
