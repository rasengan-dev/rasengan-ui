import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';

/*
 * The restaurant example's own content, for the navbar, whose example is about the marketing product (Senbon): this
 * is how a real page passes `content`. The storefront blocks keep their example, which is this restaurant already.
 */

export const navbar: NavbarSimpleContent = {
  brand: { name: "Mama Ngono's", href: '/examples/restaurant' },
  links: [
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Our story', href: '#about' },
    { label: 'Book', href: '#booking' },
    { label: 'Find us', href: '#location' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Order', href: '#order' },
};
