import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  const orderId = `DSR${Date.now().toString().slice(-8)}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="font-sans text-muted-foreground mb-6">
            Thank you for shopping with Dubai SR
          </p>

          {/* Order ID */}
          <div className="bg-secondary rounded-lg p-4 mb-8">
            <p className="text-sm font-sans text-muted-foreground mb-1">
              Order ID
            </p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {orderId}
            </p>
          </div>

          {/* What's Next */}
          <div className="card-luxury rounded-lg p-6 text-left mb-8">
            <h2 className="font-serif font-semibold text-foreground mb-4">
              What happens next?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">
                    Confirmation Email
                  </p>
                  <p className="text-sm font-sans text-muted-foreground">
                    You'll receive an email with order details shortly
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">
                    Order Processing
                  </p>
                  <p className="text-sm font-sans text-muted-foreground">
                    We'll prepare your order within 1-2 business days
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">
                    Tracking Updates
                  </p>
                  <p className="text-sm font-sans text-muted-foreground">
                    You'll get SMS/Email with tracking details once shipped
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary font-sans">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="font-sans">
              <a
                href={`https://wa.me/918595371004?text=${encodeURIComponent(
                  `Hi, I just placed order ${orderId} and would like to know about the status.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Track via WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
