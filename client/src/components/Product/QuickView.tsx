import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    
    // Enhanced visual feedback with animation
    const button = document.querySelector('[data-testid="quick-view-add-to-cart"]') as HTMLButtonElement;
    if (button) {
      const originalText = button.innerHTML;
      
      // Add animation class
      button.classList.add('adding');
      button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
      button.disabled = true;
      
      // Trigger cart icon animation in navbar
      const cartIcon = document.querySelector('[data-testid="cart-button-header"] i');
      if (cartIcon) {
        cartIcon.classList.add('cart-icon-pulse');
        setTimeout(() => {
          cartIcon.classList.remove('cart-icon-pulse');
        }, 600);
      }
      
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
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
    <div 
      className={`modal fade ${isOpen ? 'show' : ''}`} 
      style={{ display: isOpen ? 'block' : 'none' }}
      data-testid="quick-view-modal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" data-testid="quick-view-title">{product.name}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              data-testid="quick-view-close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="product-images">
                  <img 
                    src={product.images[currentImageIndex] || product.image} 
                    alt={product.name}
                    className="img-fluid rounded mb-3"
                    data-testid="quick-view-image"
                  />
                  {product.images.length > 1 && (
                    <div className="d-flex gap-2">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className={`img-thumbnail cursor-pointer ${index === currentImageIndex ? 'border-primary' : ''}`}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          onClick={() => setCurrentImageIndex(index)}
                          data-testid={`quick-view-thumbnail-${index}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <span className={`category-badge ${getCategoryColor(product.category)}`} data-testid="quick-view-category">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                </div>
                <h4 data-testid="quick-view-name">{product.name}</h4>
                <div className="mb-3">
                  <span className="rating-stars" data-testid="quick-view-rating">
                    {renderStars(product.rating)}
                  </span>
                  <small className="text-muted ms-2">({product.reviewCount} reviews)</small>
                </div>
                <div className="mb-3">
                  <span className="price-text fs-3" data-testid="quick-view-price">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price ms-2" data-testid="quick-view-original-price">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-muted" data-testid="quick-view-description">
                  {product.description}
                </p>
                
                {product.sizes && (
                  <div className="mb-3">
                    <label className="form-label">Size:</label>
                    <div className="btn-group" role="group">
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
                          <label className="btn btn-outline-primary" htmlFor={`size${size}`}>
                            {size}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && (
                  <div className="mb-3">
                    <label className="form-label">Color:</label>
                    <div className="btn-group" role="group">
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
                          <label className="btn btn-outline-primary" htmlFor={`color${color}`}>
                            {color}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label">Quantity:</label>
                  <div className="input-group" style={{ maxWidth: '120px' }}>
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

                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary btn-add-to-cart" 
                    onClick={handleAddToCart}
                    data-testid="quick-view-add-to-cart"
                  >
                    <i className="fas fa-cart-plus me-2"></i>Add to Cart
                  </button>
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={handleAddToWishlist}
                    disabled={isInWishlist(product.id)}
                    data-testid="quick-view-add-to-wishlist"
                  >
                    <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart me-2`}></i>
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
