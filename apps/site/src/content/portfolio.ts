import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { FooterWordmarkContent } from '@/components/blocks/footer-wordmark/schema';
import type { HeroWordmarkContent } from '@/components/blocks/hero-wordmark/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { Project } from '@/lib/block-fields';

/*
 * The portfolio example's content (RFC-0013, lot G0): Nkam, a small design studio in Douala working on spaces, objects
 * and identities. One array of projects feeds the list blocks and each project's case study (lot G), so a project is
 * written once. The page is a skeleton until lot G brings the projects blocks.
 */

const cover = (name: string, alt: string) => ({ src: `/placeholders/project-${name}.svg`, alt, width: 1200, height: 900 });

export const projects: Project[] = [
  {
    title: 'Maison Bonapriso',
    client: 'A private client',
    year: 2026,
    kinds: ['Interior'],
    summary: 'A family house opened to the garden: one long room, oak frames, and a fireplace at its heart.',
    cover: cover('interior', 'A bright living room with oak window frames, a black fireplace and low sofas'),
    href: '/examples/portfolio/maison-bonapriso',
    results: [{ label: 'Months on site', value: 7, format: 'number' }],
  },
  {
    title: 'Court of Steps',
    client: 'Kribi Residences',
    year: 2025,
    kinds: ['Architecture'],
    summary: 'A white courtyard of stairs and shade for a seaside residence, built to stay cool at noon.',
    cover: cover('architecture', 'White walls and an outdoor staircase casting long shadows under a blue sky'),
    href: '/examples/portfolio/court-of-steps',
  },
  {
    title: 'Oil of the Coast',
    client: 'Wouri Botanics',
    year: 2025,
    kinds: ['Product', 'Photography'],
    summary: 'A body oil and its launch pictures: amber glass, driftwood and one warm light.',
    cover: cover('product', 'An amber bottle on a piece of driftwood, lit by a single studio light'),
    href: '/examples/portfolio/oil-of-the-coast',
    results: [{ label: 'Days to sell out', value: 9, format: 'number' }],
  },
  {
    title: 'Glaze Studies',
    client: 'Poterie de Mbalmayo',
    year: 2024,
    kinds: ['Photography'],
    summary: "A catalogue of a potters' workshop: crackled glazes shot in the light of the shelves they dry on.",
    cover: cover('ceramics', 'Crackled ceramic bottles in ochre, green and grey on a dark shelf'),
    href: '/examples/portfolio/glaze-studies',
  },
  {
    title: 'Plain Box',
    client: 'Nkam',
    year: 2024,
    kinds: ['Packaging'],
    summary: 'Our own shipping box: one white board, no glue, no ink, opened in one move.',
    cover: cover('packaging', 'An open white cardboard box on a white table'),
    href: '/examples/portfolio/plain-box',
  },
  {
    title: 'Lone Hill',
    client: 'Self-initiated',
    year: 2023,
    kinds: ['Photography'],
    summary: 'A black and white series on the hills west of Bafoussam, one tree at a time.',
    cover: cover('landscape', 'A single tree on a dark hill under a grey, cloudy sky'),
    href: '/examples/portfolio/lone-hill',
  },
];

export const navbar: NavbarSimpleContent = {
  brand: { name: 'Nkam', href: '/examples/portfolio' },
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Start a project', href: '#contact' },
};

export const hero: HeroWordmarkContent = {
  word: 'Nkam',
  headline: 'Spaces, objects and identities, made slowly in Douala',
  subline: 'A studio of four. We design rooms, the things in them and the names on the door.',
  primary: { label: 'See the work', href: '#work' },
  secondary: { label: 'Start a project', href: '#contact' },
  image: projects[0].cover,
};

export const contact: ContactFormContent = {
  title: 'Start a project',
  subline: 'Tell us about the place or the thing. We answer every message within two working days.',
  channel: { kind: 'email', to: 'studio@nkam.example' },
  fields: {
    name: { label: 'Your name', placeholder: 'Nadia Ekotto' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    topic: { label: 'About', options: ['An interior', 'A product or packaging', 'Photography', 'Something else'] },
    message: { label: 'Your project', placeholder: 'Where, what, and when…' },
  },
  submit: 'Send',
  details: [
    { label: 'Email', value: 'studio@nkam.example', href: 'mailto:studio@nkam.example' },
    { label: 'Studio', value: 'Rue Joss, Bonanjo, Douala' },
  ],
  labels: {
    intro: 'Hello Nkam, I am writing from your website.',
    required: 'Required',
    invalidEmail: 'Enter an email like name@example.com',
    sent: 'Your message is ready in your mail app: send it, and we answer within two working days.',
  },
};

export const footer: FooterWordmarkContent = {
  brand: { name: 'Nkam', href: '/examples/portfolio', tagline: 'Spaces, objects and identities. Douala.' },
  columns: [
    { title: 'Studio', links: [{ label: 'Work', href: '#work' }, { label: 'Studio', href: '#studio' }, { label: 'Contact', href: '#contact' }] },
    { title: 'Elsewhere', links: [{ label: 'Instagram', href: 'https://www.instagram.com/' }, { label: 'Behance', href: 'https://www.behance.net/' }] },
  ],
  legal: '© 2026 Nkam. Photographs used as placeholders, credited in CREDITS.md.',
};
