export interface ShopOwner {
  id: string;
  uid: string;
  name: string;
  shopName: string;
  shopNameUrdu?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  category: string;
  story: string;
  storyUrdu?: string;
  photoURL: string;
  shopURL: string;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  shopId: string;
  shopOwnerId: string;
  name: string;
  nameUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  shopId: string;
  shopOwnerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail?: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  shopOwnerId: string;
  shopOwnerName: string;
  shopName: string;
  content: string;
  contentUrdu?: string;
  photoURL?: string;
  isFeatured: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  image: string;
  count: number;
}
