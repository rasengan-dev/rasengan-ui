import type { PageComponent } from 'rasengan';
import { BookingForm } from '@/components/blocks/booking-form';
import { FooterLocal } from '@/components/blocks/footer-local';
import { GallerySocial } from '@/components/blocks/gallery-social';
import { HeroPhoto } from '@/components/blocks/hero-photo';
import { LocationBranches } from '@/components/blocks/location-branches';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ReviewsRating } from '@/components/blocks/reviews-rating';
import { ServicesPricelist } from '@/components/blocks/services-pricelist';
import { TeamStaff } from '@/components/blocks/team-staff';
import { booking, footer, gallery, hero, locations, navbar, prices, reviews } from '@/content/salon';

/**
 * /examples/salon (RFC-0009, lot D): a barber and braiding studio's site made only of storefront blocks, with its
 * content in src/content/salon.ts; the team block keeps its example, which is this studio's team.
 */
const SalonExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroPhoto content={hero} />
    <ServicesPricelist content={prices} className="bg-muted/50" />
    <TeamStaff />
    <BookingForm content={booking} className="bg-muted/50" />
    <ReviewsRating content={reviews} />
    <GallerySocial content={gallery} className="bg-muted/50" />
    <LocationBranches content={locations} />
    <FooterLocal content={footer} />
  </main>
);

SalonExample.metadata = {
  title: 'Salon example · Rasengan UI',
  description: "A barber and braiding studio's site made only of Rasengan UI blocks: prices, team, booking, reviews, gallery and studios.",
};

export default SalonExample;
