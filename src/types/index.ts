export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  isOnSale: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  sizes?: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  icon?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minCartValue: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  courierName?: string;
  trackingNumber?: string;
  trackingLink?: string;
  createdAt: string;
  updatedAt: string;
}
