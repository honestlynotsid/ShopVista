import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface NavbarProps {
  onCartToggle: () => void;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartToggle, onSearchChange }) => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleCategoryClick = (category: string) => {
    setLocation(`/products?category=${category}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm" data-testid="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand text-primary" data-testid="brand-link">
          <i className="fas fa-shopping-bag me-2"></i>ShopHub
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          data-testid="navbar-toggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <Link href="/" className="nav-link" data-testid="nav-home">Home</Link>
            <div className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                data-bs-toggle="dropdown"
                data-testid="nav-categories"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleCategoryClick('fashion')}
                    data-testid="category-fashion"
                  >
                    Fashion
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleCategoryClick('electronics')}
                    data-testid="category-electronics"
                  >
                    Electronics
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleCategoryClick('home')}
                    data-testid="category-home"
                  >
                    Home & Decor
                  </button>
                </li>
                <li>
                  <Link href="/products" className="dropdown-item" data-testid="category-all">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/products" className="nav-link" data-testid="nav-products">Products</Link>
          </div>
          
          <div className="d-flex align-items-center">
            <div className="me-3">
              <input 
                type="text" 
                className="form-control search-bar" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={handleSearchChange}
                data-testid="search-input"
              />
            </div>
            <Link href="/wishlist" className="btn btn-outline-primary me-2 position-relative" data-testid="wishlist-button">
              <i className="fas fa-heart"></i>
              {getWishlistCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge" data-testid="wishlist-count">
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            <Link href="/cart" className="btn btn-primary position-relative me-2" data-testid="cart-button">
              <i className="fas fa-shopping-cart"></i>
              {getItemCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning cart-badge" data-testid="cart-count">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                data-bs-toggle="dropdown"
                data-testid="user-menu"
              >
                <i className="fas fa-user"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#" data-testid="profile-link">My Profile</a></li>
                <li><a className="dropdown-item" href="#" data-testid="orders-link">My Orders</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" data-testid="logout-link">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
