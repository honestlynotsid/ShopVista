import React from 'react';
import { Link } from 'wouter';
import { products } from '../data/products';
import ProductCard from '../components/Product/ProductCard';

interface HomeProps {
  onQuickView: (product: any) => void;
}

const Home: React.FC<HomeProps> = ({ onQuickView }) => {
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4" data-testid="hero-title">
                Discover Amazing Products
              </h1>
              <p className="lead mb-4" data-testid="hero-description">
                Shop from thousands of products with fast delivery and great prices. 
                Find everything you need in one place.
              </p>
              <button 
                className="btn btn-light btn-lg me-3" 
                onClick={scrollToProducts}
                data-testid="hero-shop-now"
              >
                Shop Now
              </button>
              <Link href="/products" className="btn btn-outline-light btn-lg" data-testid="hero-special-offers">
                Special Offers
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Shopping experience illustration" 
                className="img-fluid rounded-3 shadow-lg"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5" id="featured-products" data-testid="featured-products">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" data-testid="featured-title">Featured Products</h2>
            <p className="lead text-muted" data-testid="featured-subtitle">
              Discover our most popular items
            </p>
          </div>
          <div className="row">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/products" className="btn btn-primary btn-lg" data-testid="view-all-products">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5 bg-light" data-testid="categories-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold" data-testid="categories-title">Shop by Category</h2>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <Link href="/products?category=fashion" className="text-decoration-none">
                <div className="card category-card h-100 text-center" data-testid="category-fashion-card">
                  <img 
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                    alt="Fashion category" 
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Fashion</h5>
                    <p className="card-text text-muted">Clothing, shoes, and accessories</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link href="/products?category=electronics" className="text-decoration-none">
                <div className="card category-card h-100 text-center" data-testid="category-electronics-card">
                  <img 
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                    alt="Electronics category" 
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Electronics</h5>
                    <p className="card-text text-muted">Gadgets, phones, and tech accessories</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link href="/products?category=home" className="text-decoration-none">
                <div className="card category-card h-100 text-center" data-testid="category-home-card">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                    alt="Home category" 
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Home & Decor</h5>
                    <p className="card-text text-muted">Furniture, lighting, and home accessories</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
