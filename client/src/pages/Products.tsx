import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { products } from '../data/products';
import { Product, FilterState } from '../types';
import FilterSidebar from '../components/Product/FilterSidebar';
import ProductGrid from '../components/Product/ProductGrid';

interface ProductsProps {
  searchQuery: string;
  onQuickView: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ searchQuery, onQuickView }) => {
  const [location] = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    searchQuery: '',
    sortBy: 'featured'
  });

  // Update search query from props
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const category = urlParams.get('category');
    if (category && !filters.categories.includes(category)) {
      setFilters(prev => ({ 
        ...prev, 
        categories: category ? [category] : [] 
      }));
    }
  }, [location]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );

    // Filter by rating
    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, reverse the order to simulate newest first
        result.reverse();
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [filters]);

  // Calculate product counts by category
  const productCounts = useMemo(() => {
    return {
      fashion: products.filter(p => p.category === 'fashion').length,
      electronics: products.filter(p => p.category === 'electronics').length,
      home: products.filter(p => p.category === 'home').length
    };
  }, []);

  return (
    <div className="py-5" data-testid="products-page">
      <div className="container-fluid">
        <div className="row">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            productCounts={productCounts}
          />
          <ProductGrid
            products={filteredProducts}
            filters={filters}
            onFilterChange={setFilters}
            onQuickView={onQuickView}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
