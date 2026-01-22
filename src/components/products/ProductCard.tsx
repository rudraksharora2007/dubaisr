import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gold shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewArrival && (
            <Badge className="bg-accent text-accent-foreground font-sans text-xs">
              New
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-primary text-primary-foreground font-sans text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <Badge variant="outline" className="bg-background/90 font-sans text-xs border-destructive text-destructive">
              Only {product.stock} left
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlistToggle}
            className={`p-2.5 rounded-full transition-all duration-300 shadow-lg ${
              inWishlist 
                ? 'bg-primary text-primary-foreground scale-110' 
                : 'bg-background/95 hover:bg-gold hover:text-white text-foreground opacity-0 group-hover:opacity-100 hover:scale-110'
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="w-full btn-primary font-sans shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-sans font-semibold text-accent">
            {formatPrice(product.salePrice || product.price)}
          </span>
          {hasDiscount && (
            <span className="font-sans text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
