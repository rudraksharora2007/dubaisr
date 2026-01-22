import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'New Arrivals', href: '/shop?filter=new' },
  { name: 'Sale', href: '/shop?filter=sale' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const location = useLocation();
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-sans">
        <p>✨ Free Shipping on Orders Above ₹2999 | Use Code: DUBAI10 for 10% Off ✨</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={logo}
              alt="Dubai SR Fashion"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-sans font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:text-primary transition-colors hidden md:block">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="p-2 hover:text-primary transition-colors hidden md:block relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>
            <button className="p-2 hover:text-primary transition-colors hidden md:block">
              <User className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-sans font-medium py-2 transition-colors hover:text-primary ${
                    location.pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
