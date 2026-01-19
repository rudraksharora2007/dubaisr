import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              <span className="text-rose-light">Dubai</span> <span className="text-gold">SR</span>
            </h3>
            <p className="text-xs tracking-[0.2em] text-gold mb-4 uppercase">
              ✦ Elegance in Every Thread ✦
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium Indian ethnic fashion boutique offering exquisite stitched and
              unstitched suits from top designers.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Shop All', 'New Arrivals', 'Sale', 'Stitched Suits', 'Unstitched Suits'].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/shop"
                      className="text-sm text-muted hover:text-rose-light transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping Policy', 'Returns & Exchange', 'Size Guide', 'FAQs'].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/contact"
                      className="text-sm text-muted hover:text-rose-light transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-background mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 text-gold" />
                <a href="tel:8595371004" className="hover:text-gold transition-colors">
                  +91 8595371004
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 text-gold" />
                <a href="mailto:hello@dubaisr.com" className="hover:text-gold transition-colors">
                  hello@dubaisr.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-gold mt-0.5" />
                <span>Dubai SR Boutique, Fashion Street, Mumbai - 400001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/20">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © 2024 Dubai SR. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-muted hover:text-rose-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-muted hover:text-rose-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
