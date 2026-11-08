import type { PageComponent } from 'rasengan';
import { AboutStory } from '@/components/blocks/about-story';
import { ContactLinks } from '@/components/blocks/contact-links';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { GalleryGrid } from '@/components/blocks/gallery-grid';
import { HeroPhoto } from '@/components/blocks/hero-photo';
import { HoursWeek } from '@/components/blocks/hours-week';
import { LocationMap } from '@/components/blocks/location-map';
import { MenuCategories } from '@/components/blocks/menu-categories';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { OrderBanner } from '@/components/blocks/order-banner';
import { TestimonialsCarousel } from '@/components/blocks/testimonials-carousel';
import { footer, navbar, testimonials } from '@/content/restaurant';

/**
 * /examples/restaurant (RFC-0008, lot B): a restaurant's site made only of blocks, the storefront ones with their
 * example content, the marketing ones (navbar, testimonials, footer) with the restaurant's, from src/content.
 */
const RestaurantExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroPhoto />
    <MenuCategories className="bg-muted/50" />
    <GalleryGrid />
    <AboutStory className="bg-muted/50" />
    <TestimonialsCarousel content={testimonials} />
    <OrderBanner />
    <div className="grid @container lg:grid-cols-2">
      <HoursWeek />
      <LocationMap />
    </div>
    <ContactLinks className="bg-muted/50" />
    <FooterColumns content={footer} />
  </main>
);

RestaurantExample.metadata = {
  title: 'Restaurant example · Rasengan UI',
  description:
    "A restaurant's site made only of Rasengan UI blocks: menu, gallery, story, reviews, ordering, hours, map and contact.",
};

export default RestaurantExample;
