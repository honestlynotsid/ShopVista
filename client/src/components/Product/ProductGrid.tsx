import React from 'react';
import { Product, FilterState } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onQuickView: (product: Product) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  filters, 
  onFilterChange, 
  onQuickView,
  viewMode,
  onViewModeChange
}) => {
  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="col-lg-9 col-md-8" data-testid="product-grid-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Products</li>
            </ol>
          </nav>
          <h2 data-testid="product-count">Showing {products.length} products</h2>
        </div>
        <div className="d-flex align-items-center">
          <select 
            className="form-select me-3" 
            style={{ width: 'auto' }}
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            data-testid="sort-select"
          >
            <option value="featured">Sort by Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Best Rating</option>
          </select>
          <div className="btn-group">
            <button 
              className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              data-testid="grid-view-btn"
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              data-testid="list-view-btn"
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5" data-testid="no-products">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>No products found</h4>
          <p className="text-muted">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className={`row ${viewMode === 'list' ? 'flex-column' : ''}`} data-testid="product-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <nav className="mt-5" data-testid="pagination">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#" data-testid="page-1">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" data-testid="page-2">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" data-testid="page-3">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" data-testid="page-next">Next</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductGrid;
