import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹2999',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'UPI, Cards & COD accepted',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'WhatsApp assistance',
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-light flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
