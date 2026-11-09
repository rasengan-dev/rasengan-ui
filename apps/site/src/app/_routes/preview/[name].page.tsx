import { Link, useParams, type PageComponent } from 'rasengan';
import { blocks } from '@/blocks-catalogue';

/**
 * /preview/<name>: one block alone, full window, as it would open a real page; the floating toolbar sets its theme.
 * The block pages' full-screen button opens it. One page per block, generated from the catalogue.
 */
const BlockPreviewPage: PageComponent = () => {
  const { name } = useParams();
  const block = blocks.find((b) => b.name === name);
  if (!block?.Demo)
    return (
      <main id="main" className="grid min-h-svh place-items-center p-8 text-center">
        <p className="text-muted-foreground">
          No block named “{name}”.{' '}
          <Link
            to="/blocks"
            className="font-medium tone-primary text-tone-text underline underline-offset-4"
          >
            See all blocks
          </Link>
        </p>
      </main>
    );
  return (
    <main id="main" aria-label={block.title}>
      <block.Demo />
    </main>
  );
};

BlockPreviewPage.generatePaths = async () => ({
  paths: blocks.map((b) => ({ params: { name: b.name } })),
});

BlockPreviewPage.metadata = {
  title: 'Block preview · Rasengan UI',
  description: 'A Rasengan UI block, full window, in the village of your choice.',
};

export default BlockPreviewPage;
