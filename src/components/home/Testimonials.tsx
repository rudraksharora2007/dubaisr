import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning collection! The quality of the suits exceeded my expectations. Will definitely shop again.',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Aisha Khan',
    location: 'Delhi',
    rating: 5,
    text: 'Found my dream bridal lehenga here. The customer service was exceptional and delivery was on time.',
    avatar: 'AK',
  },
  {
    id: 3,
    name: 'Neha Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'Best ethnic wear boutique online. The Maria B collection is authentic and beautifully crafted.',
    avatar: 'NP',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-sans text-accent font-medium tracking-[0.3em] uppercase"
          >
            Customer Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2"
          >
            What Our Customers Say
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury p-6 rounded-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
                  <span className="font-sans font-semibold text-primary text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm font-sans text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
