import type { FooterColumnsContent } from '@/components/blocks/footer-columns/schema';
import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';
import type { TestimonialsCarouselContent } from '@/components/blocks/testimonials-carousel/schema';

/*
 * The restaurant example's own content, for the blocks whose example is about the marketing product (Senbon): this is
 * how a real page passes `content`. The storefront blocks keep their example, which is this restaurant already.
 */

export const navbar: NavbarSimpleContent = {
  brand: { name: "Mama Ngono's", href: '/examples/restaurant' },
  links: [
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Our story', href: '#about' },
    { label: 'Hours', href: '#hours' },
    { label: 'Find us', href: '#location' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Order', href: '#order' },
};

export const testimonials: TestimonialsCarouselContent = {
  title: 'What our guests say',
  subline: 'From the neighbours who come every Friday to visitors who found us by chance.',
  testimonials: [
    {
      quote:
        'The best ndolé in Douala, and I have tried them all. Come early on Friday, it runs out.',
      name: 'Patrick Essomba',
      role: 'Regular since 2012',
    },
    {
      quote: 'We ordered for a family lunch of twenty people. Everything arrived hot and on time.',
      name: 'Grace Mbarga',
      role: 'Bonapriso',
    },
    {
      quote: 'A warm welcome, a quiet terrace and grilled fish that tastes of the sea.',
      name: 'Julien Laurent',
      role: 'Visiting from Lyon',
    },
    {
      quote: 'Simple food, done properly. The plantains are perfect every single time.',
      name: 'Aïcha Bello',
      role: 'Akwa',
    },
  ],
};

export const footer: FooterColumnsContent = {
  brand: {
    name: "Mama Ngono's",
    href: '/examples/restaurant',
    tagline: 'Cameroonian home cooking in Akwa, Douala, since 2009.',
  },
  columns: [
    {
      title: 'Visit',
      links: [
        { label: 'Menu', href: '#menu' },
        { label: 'Opening hours', href: '#hours' },
        { label: 'Find us', href: '#location' },
      ],
    },
    {
      title: 'Order',
      links: [
        { label: 'WhatsApp', href: '#order' },
        { label: 'Events and catering', href: '#contact' },
      ],
    },
  ],
  legal: "© 2026 Mama Ngono's. An example made with Rasengan UI blocks.",
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
};
