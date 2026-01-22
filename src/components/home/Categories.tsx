import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shirt, Scissors, Gem, ShoppingBag, Sparkles } from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="h-6 w-6" />,
  Scissors: <Scissors className="h-6 w-6" />,
  Gem: <Gem className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
};

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-sans text-accent font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-3"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
            Browse by Category
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2"
          >
            Shop Our <span className="text-accent">Collections</span>
          </motion.h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="group relative aspect-[3/4] block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent group-hover:from-foreground/95 transition-all duration-500" />
                
                {/* Gold shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1s' }} />
                
                {/* Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-accent border border-gold/30 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300 shadow-lg">
                  {category.icon && iconMap[category.icon]}
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-background mb-1 group-hover:text-gold-light transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-background/70 font-sans mb-3 hidden sm:block">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-sans text-background group-hover:text-gold transition-colors duration-300">
                    Shop Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
