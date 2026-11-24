import type { PageComponent } from 'rasengan';
import { AwardsList } from '@/components/blocks/awards-list';
import { ContactForm } from '@/components/blocks/contact-form';
import { ExperienceTimeline } from '@/components/blocks/experience-timeline';
import { FooterWordmark } from '@/components/blocks/footer-wordmark';
import { GalleryHorizontal } from '@/components/blocks/gallery-horizontal';
import { HeroWordmark } from '@/components/blocks/hero-wordmark';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ProjectsGrid } from '@/components/blocks/projects-grid';
import { awards, contact, experience, footer, hero, navbar, series, work } from '@/content/portfolio';

/**
 * /examples/portfolio (RFC-0013, lots G0 and G): a design studio's site made only of blocks, with its content in
 * src/content/portfolio.ts. Each project opens its case study at /examples/portfolio/<slug>, from the same projects.
 */
const PortfolioExample: PageComponent = () => (
  <main id="main" className="[&_section]:scroll-mt-16">
    <NavbarSimple content={navbar} className="sticky top-0 z-40" />
    <HeroWordmark content={hero} />
    <ProjectsGrid content={work} id="work" />
    <GalleryHorizontal content={series} className="bg-muted/50" />
    <ExperienceTimeline content={experience} id="studio" />
    <AwardsList content={awards} className="bg-muted/50" />
    <ContactForm content={contact} id="contact" />
    <FooterWordmark content={footer} />
  </main>
);

PortfolioExample.metadata = {
  title: 'Portfolio example · Rasengan UI',
  description: "A design studio's site made only of Rasengan UI blocks: its work, a series of pictures, the studio's story, awards and a way to start a project.",
};

export default PortfolioExample;
