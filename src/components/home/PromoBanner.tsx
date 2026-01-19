import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import product3 from '@/assets/product-3.jpg';

export default function PromoBanner() {
  return (
    <section className="py-16 md:py-24 bg-rose-light/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={product3}
                alt="Bridal Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-center p-4 shadow-lg border-4 border-gold-light">
              <span className="font-serif text-white font-bold text-lg leading-tight drop-shadow-sm">
                Up to 30% Off
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <span className="text-sm font-sans text-accent font-medium tracking-[0.3em] uppercase">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2 mb-4">
              Bridal Collection
              <br />
              <span className="text-primary">Sale is Live</span>
            </h2>
            <p className="text-lg font-sans text-muted-foreground mb-8 max-w-md">
              Discover our exquisite bridal lehengas and wedding suits. Premium quality, 
              handcrafted with love. Make your special day truly memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary font-sans">
                <Link to="/shop?category=lehengas">
                  Shop Bridal Wear
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Countdown placeholder */}
            <div className="mt-8 flex gap-4">
              {[
                { label: 'Days', value: '05' },
                { label: 'Hours', value: '12' },
                { label: 'Mins', value: '34' },
                { label: 'Secs', value: '56' },
              ].map((item) => (
                <div key={item.label} className="text-center group">
                  <div className="w-14 h-14 bg-background rounded-lg flex items-center justify-center shadow-sm border border-gold/30 group-hover:border-gold transition-colors">
                    <span className="font-serif text-xl font-bold text-accent">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted-foreground mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
