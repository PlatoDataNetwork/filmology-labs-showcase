import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import logoBlack from '@/assets/filmology-logo-black.png';
import logoWhite from '@/assets/filmology-logo-white.png';
import { useTheme } from '@/hooks/use-theme';

const Merch = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const addItem = useCartStore(state => state.addItem);

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <nav className="container-wide flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/" className="flex items-center">
              <img
                src={isDark ? logoWhite : logoBlack}
                alt="Filmology Labs"
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <h1 className="text-lg md:text-xl font-medium">Merch Store</h1>
            <CartDrawer />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container-wide">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <p className="label-editorial mb-4">Official Merchandise</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Filmology Labs Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wear your passion for content creation. Premium apparel and accessories featuring the Filmology Labs brand.
            </p>
          </div>

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
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Check back soon for new merchandise!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const variant = product.node.variants.edges[0]?.node;
                const image = product.node.images.edges[0]?.node;
                const price = variant?.price.amount;
                
                return (
                  <Card key={product.node.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingCart className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-medium mb-1 hover:text-primary transition-colors">
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
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-wide text-center text-sm text-muted-foreground">
          <p>© 2026 Filmology Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Merch;
