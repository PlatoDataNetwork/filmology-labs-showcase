import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BrandedMerchImage } from '@/components/BrandedMerchImage';

const Merch = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const addItem = useCartStore(state => state.addItem);

  const visibleProducts = products.filter(
    (p) => p.node.handle !== 'filmology-swiss-army-tool'
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success('Added to cart', {
      description: product.node.title,
      position: 'top-center'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      {/* Cart Drawer - floating */}
      <div className="fixed top-3 right-20 sm:top-4 sm:right-24 z-50">
        <CartDrawer />
      </div>

      {/* Main Content */}
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container-wide">
          {/* Hero Section */}
          <header className="text-center mb-12 md:mb-16">
            <p className="label-editorial mb-4">Official Merchandise</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Filmology Labs Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wear your passion for content creation. Premium apparel and accessories featuring the Filmology Labs brand.
            </p>
          </header>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-5 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground">Check back soon for new merchandise!</p>
            </div>
          ) : (
            <section aria-label="Merchandise products">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => {
                  const variant = product.node.variants.edges[0]?.node;
                  const image = product.node.images.edges[0]?.node;
                  const price = variant?.price.amount;

                  return (
                    <Card key={product.node.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <Link to={`/product/${product.node.handle}`}>
                        <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                          {image ? (
                            <BrandedMerchImage
                              handle={product.node.handle}
                              fallbackSrc={image.url}
                              alt={image.altText || product.node.title}
                              size="card"
                              className="w-full h-full"
                              imageClassName="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/product/${product.node.handle}`}>
                          <h3 className="text-sm font-medium mb-1 hover:text-primary transition-colors truncate">
                            {product.node.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.node.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            ${parseFloat(price || '0').toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
};

export default Merch;
