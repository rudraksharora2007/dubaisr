import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Join Our Style Circle
          </h2>
          <p className="font-sans text-primary-foreground/80 mb-8">
            Subscribe to get exclusive offers, new arrivals updates, and 10% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 font-sans"
              required
            />
            <Button type="submit" className="btn-gold font-sans px-8">
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-xs font-sans text-primary-foreground/60">
            By subscribing, you agree to receive marketing communications from Dubai SR.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
