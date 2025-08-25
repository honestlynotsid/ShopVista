import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Black Dress',
    description: 'Premium quality evening dress perfect for special occasions',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'fashion',
    rating: 5,
    reviewCount: 127,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: '2',
    name: "Men's Casual Shirt",
    description: 'Comfortable cotton blend shirt for everyday wear',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'fashion',
    rating: 4,
    reviewCount: 89,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Grey']
  },
  {
    id: '3',
    name: 'Summer Sandals',
    description: 'Comfortable and stylish sandals for summer',
    price: 65.99,
    originalPrice: 85.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'fashion',
    rating: 5,
    reviewCount: 203,
    inStock: true,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Tan', 'Black', 'Brown']
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    description: 'Premium sound quality with noise cancellation',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'electronics',
    rating: 5,
    reviewCount: 456,
    inStock: true,
    colors: ['Black', 'White', 'Silver']
  },
  {
    id: '5',
    name: 'Smartphone Pro Max',
    description: 'Latest flagship phone with advanced camera system',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'electronics',
    rating: 4,
    reviewCount: 324,
    inStock: true,
    colors: ['Space Gray', 'Silver', 'Gold', 'Deep Purple']
  },
  {
    id: '6',
    name: 'Modern Table Lamp',
    description: 'Elegant lighting solution for your living space',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'home',
    rating: 5,
    reviewCount: 78,
    inStock: true,
    colors: ['Black', 'White', 'Brass']
  },
  {
    id: '7',
    name: 'Leather Handbag',
    description: 'Premium leather handbag with multiple compartments',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'fashion',
    rating: 4,
    reviewCount: 145,
    inStock: true,
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: '8',
    name: 'Classic Watch',
    description: 'Timeless design with premium materials',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'fashion',
    rating: 5,
    reviewCount: 267,
    inStock: true,
    colors: ['Silver', 'Gold', 'Black']
  },
  {
    id: '9',
    name: 'Ultrabook Laptop',
    description: 'High-performance laptop for work and gaming',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'electronics',
    rating: 5,
    reviewCount: 189,
    inStock: true,
    colors: ['Silver', 'Space Gray']
  },
  {
    id: '10',
    name: 'Decorative Plant',
    description: 'Beautiful indoor plant to brighten your space',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'home',
    rating: 4,
    reviewCount: 94,
    inStock: true
  },
  {
    id: '11',
    name: 'Throw Pillow Set',
    description: 'Set of 2 decorative pillows for your sofa',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'home',
    rating: 5,
    reviewCount: 156,
    inStock: true,
    colors: ['Blue', 'Grey', 'Beige']
  },
  {
    id: '12',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with premium sound quality',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    ],
    category: 'electronics',
    rating: 4,
    reviewCount: 234,
    inStock: true,
    colors: ['Black', 'Blue', 'Red']
  }
];
