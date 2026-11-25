import { Link, useParams, type PageComponent } from 'rasengan';
import { CartDrawer } from '@/components/blocks/cart-drawer';
import { FooterColumns } from '@/components/blocks/footer-columns';
import { NavbarSimple } from '@/components/blocks/navbar-simple';
import { ProductDetail } from '@/components/blocks/product-detail';
import { ProductGrid } from '@/components/blocks/product-grid';
import { cart, footer, moreProducts, navbar, productOf, products, slugOf } from '@/content/shop';

/**
 * /examples/shop/<slug> (RFC-0014, lot J): one product's page, then four others. The page comes from the same
 * `products` the shop's grid shows: one page per product, prerendered. Adding opens the cart drawer.
 */
const ShopProduct: PageComponent = () => {
  const { product: slug = '' } = useParams();
  const content = productOf(slug);
  if (!content)
    return (
      <main id="main" className="grid min-h-svh place-items-center p-8 text-center">
        <p className="text-muted-foreground">
          No product named “{slug}”.{' '}
          <Link to="/examples/shop" className="font-medium tone-primary text-tone-text underline underline-offset-4">
            See the shop
          </Link>
        </p>
      </main>
    );
  return (
    <main id="main" className="[&_section]:scroll-mt-16">
      <NavbarSimple content={navbar} className="sticky top-0 z-40" />
      <ProductDetail key={slug} content={content} />
      <ProductGrid content={moreProducts(content.product)} id="more" className="bg-muted/50" />
      <FooterColumns content={footer} />
      <CartDrawer content={cart} className="bottom-20" />
    </main>
  );
};

ShopProduct.generatePaths = async () => ({
  paths: products.map((product) => ({ params: { product: slugOf(product) } })),
});

ShopProduct.metadata = {
  title: 'A product · Shop example · Rasengan UI',
  description: 'One product of the shop example: its photos, options and the cart, made only of Rasengan UI blocks.',
};

export default ShopProduct;
