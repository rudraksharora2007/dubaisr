import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Loader2, Minus, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

export default function ShopifyProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setIsLoading(true);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [handle]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="btn-primary">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const compareAtPrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: selectedVariant?.price.currencyCode || 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !isAvailable) return;

    await addItem({
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    toast.success('Added to cart', {
      description: `${product.title} x ${quantity}`,
      position: 'top-center'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
              {product.images.edges[selectedImage] ? (
                <img
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.images.edges[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-primary text-primary-foreground font-sans">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
                {!isAvailable && (
                  <Badge variant="destructive" className="font-sans">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.edges.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-sans text-muted-foreground uppercase tracking-wider mb-2">
                {product.vendor}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-sans font-bold text-accent">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl font-sans text-muted-foreground line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                  <Badge className="bg-primary text-primary-foreground font-sans">
                    Save {discountPercentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-sans text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variants */}
            {product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-4">
                {product.options.map((option, optionIndex) => (
                  <div key={option.name}>
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variantIndex = product.variants.edges.findIndex(
                          (v) => v.node.selectedOptions.some(
                            (o) => o.name === option.name && o.value === value
                          )
                        );
                        const isSelected = selectedVariantIndex === variantIndex;
                        
                        return (
                          <button
                            key={value}
                            onClick={() => setSelectedVariantIndex(variantIndex >= 0 ? variantIndex : 0)}
                            className={`px-4 py-2 rounded-md border-2 font-sans text-sm transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50'
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
              <label className="block text-sm font-sans font-medium text-foreground mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-sans font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!isAvailable || cartLoading}
              className="w-full btn-gold font-sans py-6 text-lg"
              size="lg"
            >
              {cartLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </Button>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-sans">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
