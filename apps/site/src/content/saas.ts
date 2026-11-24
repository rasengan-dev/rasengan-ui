import type { NavbarSimpleContent } from '@/components/blocks/navbar-simple/schema';

/*
 * The SaaS example's content (RFC-0013, lot H): Senbon, the invoicing product of the landing example, opening a team
 * plan behind a waitlist. Every block keeps its example, which is Senbon's already; only the navbar points at this
 * page's sections.
 */
export const navbar: NavbarSimpleContent = {
  brand: { name: 'Senbon', href: '/examples/saas' },
  links: [
    { label: 'Customers', href: '#customers' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Security', href: '#security' },
    { label: 'Changelog', href: '#changelog' },
    { label: 'Careers', href: '#careers' },
  ],
  menuLabel: 'Menu',
  primary: { label: 'Join the waitlist', href: '#waitlist' },
};
