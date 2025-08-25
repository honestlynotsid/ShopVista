import React from 'react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  productCounts: {
    fashion: number;
    electronics: number;
    home: number;
  };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, productCounts }) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (max: number) => {
    onFilterChange({ 
      ...filters, 
      priceRange: { ...filters.priceRange, max } 
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      searchQuery: '',
      sortBy: 'featured'
    });
  };

  return (
    <div className="col-lg-3 col-md-4 mb-4" data-testid="filter-sidebar">
      <div className="filter-sidebar">
        <h5 className="mb-3"><i className="fas fa-filter me-2"></i>Filters</h5>
        
        <div className="mb-4">
          <h6>Categories</h6>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="fashion"
              checked={filters.categories.includes('fashion')}
              onChange={(e) => handleCategoryChange('fashion', e.target.checked)}
              data-testid="filter-fashion"
            />
            <label className="form-check-label" htmlFor="fashion">
              Fashion ({productCounts.fashion})
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="electronics"
              checked={filters.categories.includes('electronics')}
              onChange={(e) => handleCategoryChange('electronics', e.target.checked)}
              data-testid="filter-electronics"
            />
            <label className="form-check-label" htmlFor="electronics">
              Electronics ({productCounts.electronics})
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="home-decor"
              checked={filters.categories.includes('home')}
              onChange={(e) => handleCategoryChange('home', e.target.checked)}
              data-testid="filter-home"
            />
            <label className="form-check-label" htmlFor="home-decor">
              Home & Decor ({productCounts.home})
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h6>Price Range</h6>
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="1000" 
            step="10"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
            data-testid="price-range"
          />
          <div className="d-flex justify-content-between">
            <span>$0</span>
            <span data-testid="price-max">${filters.priceRange.max}</span>
          </div>
        </div>

        <div className="mb-4">
          <h6>Rating</h6>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="rating" 
              id="rating4"
              checked={filters.rating === 4}
              onChange={() => handleRatingChange(4)}
              data-testid="rating-4"
            />
            <label className="form-check-label" htmlFor="rating4">
              <span className="rating-stars text-warning">★★★★</span> & up
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="rating" 
              id="rating3"
              checked={filters.rating === 3}
              onChange={() => handleRatingChange(3)}
              data-testid="rating-3"
            />
            <label className="form-check-label" htmlFor="rating3">
              <span className="rating-stars text-warning">★★★</span> & up
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="rating" 
              id="rating-all"
              checked={filters.rating === 0}
              onChange={() => handleRatingChange(0)}
              data-testid="rating-all"
            />
            <label className="form-check-label" htmlFor="rating-all">
              All Ratings
            </label>
          </div>
        </div>

        <button 
          className="btn btn-outline-secondary w-100" 
          onClick={clearFilters}
          data-testid="clear-filters"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
