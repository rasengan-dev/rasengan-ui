import { Link, useParams, type PageComponent } from 'rasengan';
import { CaseStudy } from '@/components/blocks/case-study';
import { FooterWordmark } from '@/components/blocks/footer-wordmark';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ProjectsList } from '@/components/blocks/projects-list';
import { caseOf, footer, moreWork, navbar, projects, slugOf } from '@/content/portfolio';

/**
 * /examples/portfolio/<slug> (RFC-0013, lot G): one project's case study, then the other projects as a list. The page
 * and its content come from the same `projects` the portfolio's grid shows: one page per project, prerendered.
 */
const PortfolioProject: PageComponent = () => {
  const { project: slug = '' } = useParams();
  const content = caseOf(slug);
  if (!content)
    return (
      <main id="main" className="grid min-h-svh place-items-center p-8 text-center">
        <p className="text-muted-foreground">
          No project named “{slug}”.{' '}
          <Link to="/examples/portfolio" className="font-medium tone-primary text-tone-text underline underline-offset-4">
            See the work
          </Link>
        </p>
      </main>
    );
  return (
    <main id="main" className="[&_section]:scroll-mt-16">
      <NavbarSimple content={navbar} className="sticky top-0 z-40" />
      <CaseStudy content={content} headingLevel={1} />
      <ProjectsList content={moreWork(content.project)} className="bg-muted/50" />
      <FooterWordmark content={footer} />
    </main>
  );
};

PortfolioProject.generatePaths = async () => ({
  paths: projects.map((project) => ({ params: { project: slugOf(project) } })),
});

PortfolioProject.metadata = {
  title: 'A project · Portfolio example · Rasengan UI',
  description: "One project of the portfolio example: a case study made only of Rasengan UI blocks.",
};

export default PortfolioProject;
