import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, Loader2, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ShopifyProductCard from '@/components/products/ShopifyProductCard';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [sortBy, setSortBy] = useState('featured');

  // Fetch products from Shopify
  const { products, isLoading, error } = useShopifyProducts(100);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
    
    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'title-az':
        return a.node.title.localeCompare(b.node.title);
      case 'title-za':
        return b.node.title.localeCompare(a.node.title);
      default:
        return 0;
    }
  });

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center"
          >
            {filterParam === 'new'
              ? 'New Arrivals'
              : filterParam === 'sale'
              ? 'Sale Collection'
              : 'Shop All'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center font-sans text-muted-foreground mt-2"
          >
            Discover our exquisite collection of premium ethnic wear
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-sans text-muted-foreground">
                {isLoading ? 'Loading...' : `${sortedProducts.length} products`}
              </p>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] font-sans">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="title-az">Name: A to Z</SelectItem>
                    <SelectItem value="title-za">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="font-sans text-muted-foreground">Loading products...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="font-sans text-destructive text-lg mb-2">Error loading products</p>
                <p className="font-sans text-muted-foreground">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && sortedProducts.length === 0 && (
              <div className="text-center py-24">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">No Products Found</h3>
                <p className="font-sans text-muted-foreground max-w-md mx-auto">
                  Your store doesn't have any products yet. Tell me what products you'd like to add - just describe the product and price!
                </p>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && sortedProducts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {sortedProducts.map((product, index) => (
                  <ShopifyProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
