import { Link, useParams, type PageComponent } from 'rasengan';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { ListingCards } from '@/components/blocks/listing-cards';
import { ListingDetail } from '@/components/blocks/listing-detail';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { footer, listingOf, listings, moreHomes, navbar, slugOf } from '@/content/homes';

/**
 * /examples/homes/<slug> (RFC-0014, lot K): one home's page, then three others. The page comes from the same
 * `listings` the agency's cards show: one page per home, prerendered. The enquiry opens WhatsApp.
 */
const HomesListing: PageComponent = () => {
  const { listing: slug = '' } = useParams();
  const content = listingOf(slug);
  if (!content)
    return (
      <main id="main" className="grid min-h-svh place-items-center p-8 text-center">
        <p className="text-muted-foreground">
          No home named “{slug}”.{' '}
          <Link to="/examples/homes" className="font-medium tone-primary text-tone-text underline underline-offset-4">
            See the homes
          </Link>
        </p>
      </main>
    );
  return (
    <main id="main" className="[&_section]:scroll-mt-16">
      <NavbarSimple content={navbar} className="sticky top-0 z-40" />
      <ListingDetail key={slug} content={content} />
      <ListingCards content={moreHomes(content.listing)} id="more" className="bg-muted/50" />
      <FooterColumns content={footer} />
    </main>
  );
};

HomesListing.generatePaths = async () => ({
  paths: listings.map((listing) => ({ params: { listing: slugOf(listing) } })),
});

HomesListing.metadata = {
  title: 'A home · Homes example · Rasengan UI',
  description: 'One home of the agency example: its photos, facts and an enquiry, made only of Rasengan UI blocks.',
};

export default HomesListing;
