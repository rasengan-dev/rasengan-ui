import type { BookingFormContent } from '@/components/blocks/booking-form/schema';
import type { FooterLocalContent } from '@/components/blocks/footer-local/schema';
import type { GallerySocialContent } from '@/components/blocks/gallery-social/schema';
import type { HeroPhotoContent } from '@/components/blocks/hero-photo/schema';
import type { LocationBranchesContent } from '@/components/blocks/location-branches/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { ReviewsRatingContent } from '@/components/blocks/reviews-rating/schema';
import type { ServicesPricelistContent } from '@/components/blocks/services-pricelist/schema';

/*
 * The salon example's content (RFC-0009, lot D): a barber and braiding studio in Douala, Junior & Co. The team block
 * keeps its example, which is this studio's team already; every other block gets the studio's content here.
 */

const xaf = (amount: number) => ({ amount, currency: 'XAF' });
const portrait = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });
const workday = [{ open: '09:00', close: '20:00' }];
const days = (slots: { open: string; close: string }[]) => [
  { day: 'monday' as const, slots: [] },
  ...(['tuesday', 'wednesday', 'thursday', 'friday'] as const).map((day) => ({ day, slots })),
  { day: 'saturday' as const, slots: [{ open: '08:00', close: '21:00' }] },
  { day: 'sunday' as const, slots: [{ open: '14:00', close: '19:00' }] },
];
const channel = { kind: 'whatsapp' as const, to: '+237 6 77 00 00 00' };

export const navbar: NavbarSimpleContent = {
  brand: { name: 'Junior & Co', href: '/examples/salon' },
  links: [
    { label: 'Prices', href: '#prices' },
    { label: 'Team', href: '#team' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Find us', href: '#locations' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Book', href: '#booking' },
};

export const hero: HeroPhotoContent = {
  eyebrow: 'Barbers and braiders · Douala',
  headline: 'Sharp cuts, patient braids, no waiting',
  subline: 'Book your chair in a minute: we confirm on WhatsApp and you walk straight in.',
  primary: { label: 'Book a chair', href: '#booking' },
  secondary: { label: 'See the prices', href: '#prices' },
  highlights: ['Open six days a week', 'Two studios', 'Kids welcome'],
  image: portrait('barber', 'Junior trimming a client’s hair in the Akwa studio.'),
};

export const prices: ServicesPricelistContent = {
  title: 'Prices',
  subline: 'Every visit starts with a short talk, so we agree on the style before the clippers come out.',
  image: portrait('beauty', 'A client with a full afro, smiling, her hands in her hair.'),
  groups: [
    {
      name: 'Cuts',
      services: [
        { name: 'Haircut', description: 'Wash, cut and style.', duration: 45, price: xaf(3000) },
        { name: 'Skin fade', duration: 60, price: xaf(4000) },
        { name: 'Kids’ cut', description: 'Under twelve.', duration: 30, price: xaf(2000) },
      ],
    },
    {
      name: 'Braids and locs',
      services: [
        { name: 'Knotless braids', description: 'Shoulder length, hair included.', duration: 240, price: xaf(25000) },
        { name: 'Cornrows', duration: 90, price: xaf(8000) },
        { name: 'Locs retwist', duration: 120, price: xaf(12000) },
      ],
    },
    {
      name: 'Beard and care',
      services: [
        { name: 'Beard design', duration: 30, price: xaf(2500) },
        { name: 'Hot towel shave', duration: 40, price: xaf(3500) },
      ],
    },
  ],
  minutes: 'min',
  cta: { label: 'Book a chair', href: '#booking' },
  locale: 'en-CM',
  note: 'A deposit of 5,000 FCFA confirms braids over two hours.',
};

export const booking: BookingFormContent = {
  title: 'Book a chair',
  subline: 'Pick a service and a time: your WhatsApp opens with the request written, and we confirm within the hour.',
  image: portrait('man-3', 'A client in a blue suit, freshly cut, smiling.'),
  channel,
  hours: { days: days(workday) },
  interval: 30,
  daysAhead: 30,
  fields: {
    name: { label: 'Your name', placeholder: 'Paul Mbarga' },
    date: { label: 'Day', placeholder: 'Pick a day' },
    time: { label: 'Time', placeholder: 'Pick a time' },
    services: {
      label: 'Service',
      items: [
        { name: 'Haircut', duration: 45, price: xaf(3000) },
        { name: 'Skin fade', duration: 60, price: xaf(4000) },
        { name: 'Cornrows', duration: 90, price: xaf(8000) },
        { name: 'Knotless braids', duration: 240, price: xaf(25000) },
      ],
    },
    note: { label: 'With someone in particular?', placeholder: 'Junior, Grace…' },
  },
  submit: 'Send my request on WhatsApp',
  locale: 'en-CM',
  smallPrint: 'Running late? Tell us on WhatsApp and we keep your chair for fifteen minutes.',
  labels: {
    intro: 'Hello, I would like to book a chair.',
    required: 'Required',
    sent: 'Your request is ready in WhatsApp: send it, and we confirm within the hour.',
  },
};

export const reviews: ReviewsRatingContent = {
  title: 'What clients say',
  summary: { score: 4.9, count: 212, source: 'Google', href: 'https://maps.google.com' },
  reviews: [
    { author: 'Eric N.', rating: 5, text: 'Best fade in Douala. Junior takes his time and it shows.', date: '2026-10-21', source: 'Google' },
    { author: 'Mireille K.', rating: 5, text: 'Grace did my knotless braids in under four hours, neat and light. Booked again already.', date: '2026-10-09', source: 'Google' },
    { author: 'Thomas B.', rating: 5, text: 'Booked on WhatsApp at noon, sat in the chair at two. No waiting at all.', date: '2026-09-30', source: 'Google' },
    { author: 'Esther M.', rating: 4, text: 'My son loves it here. Busy on Saturdays, so book ahead.', date: '2026-09-18', source: 'In the shop' },
    { author: 'Didier T.', rating: 5, text: 'Hot towel shave like nowhere else in town. Worth every franc.', date: '2026-09-02', source: 'Google' },
    { author: 'Aïcha N.', rating: 5, text: 'Clean, friendly, on time. The retwist lasted weeks.', date: '2026-08-25', source: 'Google' },
  ],
  locale: 'en-CM',
  labels: { outOf: 'out of 5', reviews: 'reviews', on: 'on', readAll: 'Read all reviews' },
};

export const gallery: GallerySocialContent = {
  title: 'Fresh from the chair',
  subline: 'This week’s cuts and braids. Tag us when you leave looking sharp.',
  account: { handle: '@juniorandco', href: 'https://www.instagram.com/', follow: 'Follow us' },
  photos: [
    portrait('man-1', 'A client with a fresh high-top, smiling.'),
    portrait('woman-2', 'Long box braids and glasses.'),
    portrait('man-2', 'A short crop with a sharp line-up.'),
    portrait('woman-1', 'A client laughing, her hair freshly pressed.'),
    portrait('barber', 'Junior at work on a fade.'),
    portrait('woman-3', 'Short natural hair, freshly shaped.'),
  ],
};

export const locations: LocationBranchesContent = {
  title: 'Two studios',
  subline: 'Same team, same prices. Walk-ins welcome when a chair is free.',
  branches: [
    {
      name: 'Akwa',
      address: { lines: ['Boulevard de la Liberté', 'Akwa, Douala'], landmark: 'Above the bakery, first floor', mapUrl: 'https://www.openstreetmap.org/?mlat=4.0485&mlon=9.6978#map=17/4.0485/9.6978' },
      openingHours: { days: days(workday) },
      phone: '+237 6 77 00 00 00',
      image: portrait('founder', 'The Akwa studio’s manager at the front desk.'),
    },
    {
      name: 'Bonamoussadi',
      address: { lines: ['Carrefour Kotto', 'Bonamoussadi, Douala'], landmark: 'Next to the Total station', mapUrl: 'https://www.openstreetmap.org/?mlat=4.0911&mlon=9.7442#map=17/4.0911/9.7442' },
      openingHours: { days: days([{ open: '10:00', close: '20:00' }]) },
      phone: '+237 6 78 00 00 00',
      image: portrait('man-2', 'Samuel, who runs the Bonamoussadi chairs.'),
    },
  ],
  timeZone: 'Africa/Douala',
  locale: 'en-CM',
  labels: { today: 'Today', closedToday: 'Closed today', openNow: 'Open now', closedNow: 'Closed now', directions: 'Directions', call: 'Call' },
};

export const footer: FooterLocalContent = {
  name: 'Junior & Co',
  tagline: 'Barbers and braiders in Akwa and Bonamoussadi.',
  address: locations.branches[0].address,
  hours: { days: days(workday) },
  contacts: [
    { kind: 'whatsapp', value: channel.to },
    { kind: 'instagram', value: 'https://www.instagram.com/' },
  ],
  links: navbar.links,
  copyright: '© 2026 Junior & Co. An example made with Rasengan UI blocks.',
  locale: 'en-CM',
  labels: { visit: 'Visit us', hours: 'Opening hours', contact: 'Contact', closed: 'Closed', directions: 'Directions' },
};
