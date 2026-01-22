import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export default function ShopifyProductCard({ product, index = 0 }: ShopifyProductCardProps) {
  const { addItem, isLoading } = useCartStore();
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice 
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount) 
    : null;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;
  
  const mainImage = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale ?? false;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: node.priceRange.minVariantPrice.currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant || !isAvailable) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success('Added to cart', {
      description: node.title,
      position: 'top-center'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative card-luxury rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Link to={`/product/${node.handle}`}>
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          {/* Gold shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge className="bg-primary text-primary-foreground font-sans text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {!isAvailable && (
            <Badge variant="outline" className="bg-background/90 font-sans text-xs border-destructive text-destructive">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={!isAvailable || isLoading}
            className="w-full btn-primary font-sans shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                {isAvailable ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-1">
          {node.vendor}
        </p>
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-serif text-base font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {node.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-sans font-semibold text-accent">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="font-sans text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
