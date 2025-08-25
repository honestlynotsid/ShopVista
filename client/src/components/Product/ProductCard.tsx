import React from 'react';
import { Link } from 'wouter';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    
    // Visual feedback
    const button = e.target as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <div className="col-lg-4 col-md-6 mb-4" data-testid={`product-card-${product.id}`}>
      <div className="card product-card h-100 position-relative">
        <button 
          className={`wishlist-btn ${isInWishlist(product.id) ? 'text-danger' : ''}`}
          onClick={handleWishlistToggle}
          data-testid={`wishlist-btn-${product.id}`}
        >
          <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart`}></i>
        </button>
        <span className={`category-badge position-absolute ${getCategoryColor(product.category)}`} 
              style={{ top: '10px', left: '10px', zIndex: 1 }}
              data-testid={`category-badge-${product.id}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="card-img-top product-image"
            data-testid={`product-image-${product.id}`}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h5>
          <p className="card-text text-muted" data-testid={`product-description-${product.id}`}>
            {product.description}
          </p>
          <div className="mb-2">
            <span className="rating-stars" data-testid={`product-rating-${product.id}`}>
              {renderStars(product.rating)}
            </span>
            <small className="text-muted ms-2" data-testid={`product-reviews-${product.id}`}>
              ({product.reviewCount} reviews)
            </small>
          </div>
          <div className="mb-3">
            <span className="price-text fs-5" data-testid={`product-price-${product.id}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="original-price ms-2" data-testid={`product-original-price-${product.id}`}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-auto">
            <button 
              className="btn btn-primary w-100 mb-2" 
              onClick={handleAddToCart}
              data-testid={`add-to-cart-${product.id}`}
            >
              <i className="fas fa-cart-plus me-2"></i>Add to Cart
            </button>
            <button 
              className="btn btn-outline-primary w-100" 
              onClick={() => onQuickView(product)}
              data-testid={`quick-view-${product.id}`}
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
