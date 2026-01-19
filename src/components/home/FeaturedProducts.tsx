import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-sans text-accent font-medium tracking-[0.3em] uppercase flex items-center gap-2"
            >
              <span className="w-8 h-px bg-accent" />
              Curated for You
              <span className="w-8 h-px bg-accent" />
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2"
            >
              Featured <span className="text-accent">Collection</span>
            </motion.h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden md:flex font-sans text-primary hover:text-primary/80"
          >
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild className="btn-primary font-sans">
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
