import type { PageComponent } from 'rasengan';
import { AboutStory } from '@/components/blocks/about-story';
import { BookingForm } from '@/components/blocks/booking-form';
import { ContactLinks } from '@/components/blocks/contact-links';
import { FooterLocal } from '@/components/blocks/footer-local';
import { GalleryGrid } from '@/components/blocks/gallery-grid';
import { HeroPhoto } from '@/components/blocks/hero-photo';
import { HoursWeek } from '@/components/blocks/hours-week';
import { LocationMap } from '@/components/blocks/location-map';
import { MenuCards } from '@/components/blocks/menu-cards';
import { MenuCategories } from '@/components/blocks/menu-categories';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { OrderBanner } from '@/components/blocks/order-banner';
import { ReviewsRating } from '@/components/blocks/reviews-rating';
import { navbar } from '@/content/restaurant';

/**
 * /examples/restaurant (RFC-0008 lot B, RFC-0009 lot D): a restaurant's site made only of blocks, the storefront ones
 * with their example content (this restaurant), the navbar with the restaurant's, from src/content.
 */
const RestaurantExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroPhoto />
    <MenuCards />
    <MenuCategories className="bg-muted/50" />
    <GalleryGrid />
    <AboutStory className="bg-muted/50" />
    <ReviewsRating />
    <BookingForm className="bg-muted/50" />
    <OrderBanner />
    <div className="grid @container lg:grid-cols-2">
      <HoursWeek />
      <LocationMap />
    </div>
    <ContactLinks className="bg-muted/50" />
    <FooterLocal />
  </main>
);

RestaurantExample.metadata = {
  title: 'Restaurant example · Rasengan UI',
  description:
    "A restaurant's site made only of Rasengan UI blocks: dishes, menu, gallery, story, reviews, booking, ordering, hours, map and contact.",
};

export default RestaurantExample;
