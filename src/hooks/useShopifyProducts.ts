import { useState, useEffect } from 'react';
import { ShopifyProduct, fetchShopifyProducts } from '@/lib/shopify';

export function useShopifyProducts(limit: number = 50, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchShopifyProducts(limit, query);
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [limit, query]);

  return { products, isLoading, error };
}
