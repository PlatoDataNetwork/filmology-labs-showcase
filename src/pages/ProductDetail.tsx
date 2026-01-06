import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BrandedMerchImage } from '@/components/BrandedMerchImage';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const fetchedProduct = await fetchProductByHandle(handle);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${quantity}x ${product.title}`,
      position: 'top-center'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Product not found</h2>
          <Link to="/merch" className="text-primary hover:underline">
            Back to Merch Store
          </Link>
        </div>
        <Footer isDark={isDark} />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const images = product.images.edges;
  const hasVariants = product.options.length > 0 && product.options[0].name !== 'Title';
  const hasBrandedOverride =
    product.handle === 'filmology-labs-hoodie' || product.handle === 'filmology-labs-baseball-cap';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Cart Drawer - floating */}
      <div className="fixed top-3 right-20 sm:top-4 sm:right-24 z-50">
        <CartDrawer />
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-24 md:pt-28 pb-16">
        <div className="container-wide">
          {/* Back Link */}
          <Link 
            to="/merch" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Merch Store
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                {hasBrandedOverride ? (
                  <BrandedMerchImage
                    handle={product.handle}
                    alt={product.title}
                    size="detail"
                    className="w-full h-full"
                    imageClassName="w-full h-full object-contain"
                  />
                ) : images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              {!hasBrandedOverride && images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="label-editorial mb-2">Filmology Labs</p>
                <h1 className="text-3xl md:text-4xl font-light mb-4">{product.title}</h1>
                <p className="text-2xl font-bold">
                  ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Size/Variant Selection */}
              {hasVariants && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-3">{option.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isSelected = product.variants.edges[selectedVariantIndex]?.node.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          );
                          return (
                            <button
                              key={value}
                              onClick={() => {
                                const variantIndex = product.variants.edges.findIndex(v =>
                                  v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                                );
                                if (variantIndex !== -1) {
                                  setSelectedVariantIndex(variantIndex);
                                }
                              }}
                              className={`px-4 py-2 rounded-md border transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
};

export default ProductDetail;
