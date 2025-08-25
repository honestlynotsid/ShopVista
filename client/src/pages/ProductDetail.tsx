import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetail: React.FC = () => {
  const [match, params] = useRoute('/product/:id');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!match || !params?.id) {
    return (
      <div className="container py-5 text-center" data-testid="product-not-found">
        <h2>Product not found</h2>
        <Link href="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="container py-5 text-center" data-testid="product-not-found">
        <h2>Product not found</h2>
        <Link href="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Visual feedback could be added here
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-warning' : 'text-muted'}>
        ★
      </span>
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fashion': return 'bg-primary';
      case 'electronics': return 'bg-success';
      case 'home': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container py-5" data-testid="product-detail-page">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/products">Products</Link></li>
          <li className="breadcrumb-item active" data-testid="breadcrumb-product-name">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="product-images">
            <img 
              src={product.images[currentImageIndex] || product.image} 
              alt={product.name}
              className="img-fluid rounded mb-3 shadow"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              data-testid="main-product-image"
            />
            {product.images.length > 1 && (
              <div className="d-flex gap-2 justify-content-center">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className={`img-thumbnail cursor-pointer ${index === currentImageIndex ? 'border-primary border-3' : ''}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    onClick={() => setCurrentImageIndex(index)}
                    data-testid={`thumbnail-${index}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="mb-3">
            <span className={`category-badge ${getCategoryColor(product.category)}`} data-testid="product-category">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>

          <h1 className="display-5 mb-3" data-testid="product-detail-name">{product.name}</h1>

          <div className="mb-3">
            <span className="rating-stars fs-5" data-testid="product-detail-rating">
              {renderStars(product.rating)}
            </span>
            <small className="text-muted ms-2">({product.reviewCount} reviews)</small>
          </div>

          <div className="mb-4">
            <span className="price-text display-6" data-testid="product-detail-price">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="original-price fs-4 ms-3" data-testid="product-detail-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="badge bg-danger ms-2">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="lead text-muted mb-4" data-testid="product-detail-description">
            {product.description}
          </p>

          {product.sizes && (
            <div className="mb-4">
              <label className="form-label fw-bold">Size:</label>
              <div className="btn-group d-block" role="group">
                {product.sizes.map(size => (
                  <React.Fragment key={size}>
                    <input 
                      type="radio" 
                      className="btn-check" 
                      name="size" 
                      id={`size${size}`}
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      data-testid={`size-${size}`}
                    />
                    <label className="btn btn-outline-primary me-2 mb-2" htmlFor={`size${size}`}>
                      {size}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="mb-4">
              <label className="form-label fw-bold">Color:</label>
              <div className="btn-group d-block" role="group">
                {product.colors.map(color => (
                  <React.Fragment key={color}>
                    <input 
                      type="radio" 
                      className="btn-check" 
                      name="color" 
                      id={`color${color}`}
                      value={color}
                      checked={selectedColor === color}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      data-testid={`color-${color}`}
                    />
                    <label className="btn btn-outline-primary me-2 mb-2" htmlFor={`color${color}`}>
                      {color}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="form-label fw-bold">Quantity:</label>
            <div className="input-group" style={{ maxWidth: '150px' }}>
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                data-testid="quantity-decrease"
              >
                -
              </button>
              <input 
                type="number" 
                className="form-control text-center" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                data-testid="quantity-input"
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="quantity-increase"
              >
                +
              </button>
            </div>
          </div>

          <div className="d-grid gap-3">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={handleAddToCart}
              data-testid="add-to-cart-detail"
            >
              <i className="fas fa-cart-plus me-2"></i>Add to Cart
            </button>
            <button 
              className="btn btn-outline-primary btn-lg" 
              onClick={handleWishlistToggle}
              data-testid="add-to-wishlist-detail"
            >
              <i className={`${isInWishlist(product.id) ? 'fas text-danger' : 'far'} fa-heart me-2`}></i>
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <div className="row text-center">
              <div className="col-4">
                <i className="fas fa-shipping-fast fa-2x text-primary mb-2"></i>
                <p className="small mb-0">Free Shipping</p>
              </div>
              <div className="col-4">
                <i className="fas fa-undo fa-2x text-primary mb-2"></i>
                <p className="small mb-0">Easy Returns</p>
              </div>
              <div className="col-4">
                <i className="fas fa-shield-alt fa-2x text-primary mb-2"></i>
                <p className="small mb-0">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
