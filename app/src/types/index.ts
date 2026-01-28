// src/types/index.ts
export interface Shop {
  id: string;
  name: string;
  shopNameUrdu?: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  category: string;
  description: string;
  story: string;
  image: string;
  ownerImage?: string;
  isVerified: boolean;
  isFeatured: boolean;
  joinedDate: string;
  productsCount: number;
  ordersCompleted: number;
  rating: number;
  userId: string; // Link to Firebase Auth user
  status: 'active' | 'pending' | 'suspended';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  image: string;
  images?: string[];
  shopId: string;
  shopName: string;
  isAvailable: boolean;
  views: number;
  orders: number;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  productId: string;
  product: string;
  productImage: string;
  shopId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  quantity: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  notes?: string;
  createdAt: string;
}

export interface Story {
  id: string;
  ownerName: string;
  shopName: string;
  category: string;
  city: string;
  quote: string;
  fullStory: string;
  image: string;
  shopImage: string;
  productsCount: number;
  ordersCompleted: number;
  impact: string;
  order: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'vendor' | 'admin' | 'customer';
  shopId?: string;
  createdAt: string;
}
