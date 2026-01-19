import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    appliedCoupon,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 2999 ? 0 : 199;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success('Coupon applied successfully!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon or minimum cart value not met');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
              Your Cart is Empty
            </h1>
            <p className="font-sans text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="btn-primary font-sans">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </nav>

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury rounded-lg p-4 flex gap-4"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 h-32 shrink-0 rounded-md overflow-hidden bg-secondary"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-serif font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.size && (
                        <p className="text-sm font-sans text-muted-foreground mt-1">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1.5 hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-sans font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.min(item.product.stock, item.quantity + 1)
                          )
                        }
                        className="p-1.5 hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="font-sans font-semibold text-foreground">
                        {formatPrice(
                          (item.product.salePrice || item.product.price) *
                            item.quantity
                        )}
                      </span>
                      {item.product.salePrice && (
                        <span className="block text-xs font-sans text-muted-foreground line-through">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-luxury rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-serif font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-rose-light rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-sm font-sans font-medium text-foreground">
                        {appliedCoupon}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-sm font-sans text-primary hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="font-sans"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      variant="outline"
                      className="font-sans shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs font-sans text-muted-foreground mt-2">
                  Try: DUBAI10, FLAT500, NEW15
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-primary">Discount</span>
                    <span className="text-primary">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs font-sans text-muted-foreground">
                    Add {formatPrice(2999 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-sans font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-sans font-bold text-lg text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                asChild
                className="w-full mt-6 btn-primary font-sans"
                size="lg"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 text-center">
                <p className="text-xs font-sans text-muted-foreground">
                  Secure checkout • 7-day returns • COD available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
