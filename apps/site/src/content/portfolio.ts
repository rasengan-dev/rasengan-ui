import type { AwardsListContent } from '@/components/blocks/awards-list/schema';
import type { CaseStudyContent } from '@/components/blocks/case-study/schema';
import type { ContactFormContent } from '@/components/blocks/contact-form/schema';
import type { ExperienceTimelineContent } from '@/components/blocks/experience-timeline/schema';
import type { FooterWordmarkContent } from '@/components/blocks/footer-wordmark/schema';
import type { HeroWordmarkContent } from '@/components/blocks/hero-wordmark/schema';
import type { GalleryHorizontalContent } from '@/components/blocks/gallery-horizontal/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { ProjectsGridContent } from '@/components/blocks/projects-grid/schema';
import type { ProjectsListContent } from '@/components/blocks/projects-list/schema';
import type { Project } from '@/lib/block-fields';

/*
 * The portfolio example's content (RFC-0013, lots G0 and G): Nkam, a small design studio in Douala working on spaces,
 * objects and identities. One array of projects feeds the grid on /examples/portfolio, the "more work" list and each
 * project's case study on /examples/portfolio/<slug>, so a project is written once.
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
    { label: 'Work', href: '/examples/portfolio#work' },
    { label: 'Studio', href: '/examples/portfolio#studio' },
    { label: 'Contact', href: '/examples/portfolio#contact' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Start a project', href: '/examples/portfolio#contact' },
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
    {
      title: 'Studio',
      links: [
        { label: 'Work', href: '/examples/portfolio#work' },
        { label: 'Studio', href: '/examples/portfolio#studio' },
        { label: 'Contact', href: '/examples/portfolio#contact' },
      ],
    },
    { title: 'Elsewhere', links: [{ label: 'Instagram', href: 'https://www.instagram.com/' }, { label: 'Behance', href: 'https://www.behance.net/' }] },
  ],
  legal: '© 2026 Nkam. Photographs used as placeholders, credited in CREDITS.md.',
};

/** The slug of a project's case study: the last part of its href. */
export const slugOf = (project: Project) => project.href.split('/').pop() ?? '';

export const work: ProjectsGridContent = {
  eyebrow: 'Selected work',
  title: 'Work',
  subline: 'Rooms, objects and pictures, made with people who care about the details.',
  projects,
  labels: { all: 'All', filter: 'Filter projects by kind', shown: '{count} projects shown' },
};

export const series: GalleryHorizontalContent = {
  eyebrow: 'Pictures',
  title: 'A year at the studio',
  subline: 'What we photographed between two projects.',
  photos: projects.map((project) => ({ ...project.cover, caption: project.title })),
  labels: { photos: 'Photos from the studio' },
};

export const experience: ExperienceTimelineContent = {
  eyebrow: 'The studio',
  title: 'How Nkam grew',
  subline: 'Four people, two cities, one room at a time.',
  entries: [
    { from: '2024-09', to: 'now', title: 'Opened a second studio', organisation: 'Kribi', description: 'A small workshop by the sea for the furniture we make ourselves.' },
    { from: '2021-03', to: '2024-08', title: 'Interiors and objects', organisation: 'Douala', description: 'From one-room projects to whole houses, with our own carpenter.' },
    { from: '2019', to: '2021', title: 'Photography for makers', organisation: 'Freelance', description: 'Catalogues for potters, weavers and perfumers across the country.' },
    { from: '2017', title: 'Founded Nkam', organisation: 'Bonanjo, Douala' },
  ],
  labels: { now: 'Now' },
};

export const awards: AwardsListContent = {
  eyebrow: 'Recognition',
  title: 'Awards',
  awards: [
    { year: 2026, name: 'Interior of the Year, shortlisted', by: 'Afrika Design Awards', project: 'Maison Bonapriso', href: projects[0].href },
    { year: 2025, name: 'Best Packaging, gold', by: 'Lagos Design Week', project: 'Plain Box', href: projects[4].href },
    { year: 2025, name: 'Product photography, finalist', by: 'Still Life Annual', project: 'Oil of the Coast', href: projects[2].href },
    { year: 2023, name: 'Series of the year, honourable mention', by: 'Lens & Light', project: 'Lone Hill', href: projects[5].href },
  ],
  labels: { year: 'Year', award: 'Award', project: 'Project' },
};

/** Under a case study: the other projects, as a list. */
export const moreWork = (current: Project): ProjectsListContent => ({
  title: 'More work',
  projects: projects.filter((project) => project.href !== current.href),
  cta: { label: 'All work', href: '/examples/portfolio#work' },
});

const caseLabels = { client: 'Client', kind: 'Kind', year: 'Year', results: 'Results', gallery: 'Gallery', next: 'Next project' };

/** Each project's story; the case study takes the project itself from `projects`. */
const stories: Record<string, Omit<CaseStudyContent, 'project' | 'next' | 'labels'>> = {
  'maison-bonapriso': {
    facts: [{ label: 'Role', value: 'Interior architecture' }],
    sections: [
      { kind: 'context', title: 'A house of small rooms', paragraphs: ['Built in the eighties, the house turned its back on a garden its owners loved: three small rooms, each with one window.'] },
      { kind: 'approach', title: 'One long room, deep frames', paragraphs: ['We took down two walls and set oak frames deep enough to shade their own glass. The fireplace holds the middle of the room.'] },
      { kind: 'results', title: 'A room the family lives in', paragraphs: ['The house now opens on the garden from end to end, and stays cool until late afternoon.'] },
    ],
    gallery: [projects[1].cover, projects[3].cover],
  },
  'court-of-steps': {
    facts: [{ label: 'Role', value: 'Architecture, landscape' }],
    sections: [
      { kind: 'problem', title: 'Noon by the sea', paragraphs: ['The residents had a courtyard nobody used: at noon the sun turned it into an oven.'] },
      { kind: 'approach', title: 'Stairs as shade', paragraphs: ['White walls, high and close, and stairs that cast their own shadow across the day. Every surface stays cool to the hand.'] },
    ],
  },
  'oil-of-the-coast': {
    facts: [{ label: 'Role', value: 'Product design, photography' }],
    sections: [
      { kind: 'context', title: 'A first product', paragraphs: ['Wouri Botanics makes body oil from coastal plants and wanted a bottle that looked like the coast it came from.'] },
      { kind: 'approach', title: 'Amber and driftwood', paragraphs: ['Amber glass keeps the oil from the light; we shot it on driftwood from the beach it was named after, under one warm lamp.'] },
    ],
  },
  'glaze-studies': {
    facts: [{ label: 'Role', value: 'Photography' }],
    sections: [{ kind: 'approach', title: 'The light of the shelves', paragraphs: ['We photographed every piece where it dries, in the workshop light the potters know, so the catalogue looks like the place.'] }],
  },
  'plain-box': {
    facts: [{ label: 'Role', value: 'Packaging design' }],
    sections: [
      { kind: 'problem', title: 'Boxes that cost more than they hold', paragraphs: ['Our samples travelled in boxes with glue, tape and ink, all thrown away on arrival.'] },
      { kind: 'results', title: 'One board, one move', paragraphs: ['One white board, folded, no glue, no ink: it opens in one move and folds flat to come back.'] },
    ],
  },
  'lone-hill': {
    facts: [{ label: 'Role', value: 'Photography' }],
    sections: [{ kind: 'context', title: 'One tree at a time', paragraphs: ['Three years of walks in the hills west of Bafoussam, in black and white, waiting for the clouds to sit right.'] }],
  },
};

/** A project's case study, with the next project after it (the first after the last). */
export function caseOf(slug: string): CaseStudyContent | undefined {
  const index = projects.findIndex((project) => slugOf(project) === slug);
  if (index < 0) return undefined;
  const next = projects[(index + 1) % projects.length];
  return { project: projects[index], ...stories[slug], next: { title: next.title, href: next.href }, labels: caseLabels };
}
