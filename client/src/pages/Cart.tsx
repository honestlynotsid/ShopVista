import React, { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/Product/ProductCard';

interface CartProps {
  onQuickView?: (product: any) => void;
}

const Cart: React.FC<CartProps> = ({ onQuickView }) => {
  const { items, subtotal, shipping, tax, total, updateQuantity, removeFromCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured products for carousel (first 6 products)
  const featuredProducts = products.slice(0, 6);
  const productsPerSlide = 3;
  const totalSlides = Math.ceil(featuredProducts.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const start = currentSlide * productsPerSlide;
    return featuredProducts.slice(start, start + productsPerSlide);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-5" data-testid="empty-cart-page">
        {/* Featured Products Carousel */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>You might also like</h3>
            <div className="carousel-controls">
              <button 
                className="btn btn-outline-primary me-2" 
                onClick={prevSlide}
                data-testid="carousel-prev"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={nextSlide}
                data-testid="carousel-next"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="row" data-testid="featured-carousel">
            {getCurrentProducts().map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView || (() => {})}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
          <h2>Your cart is empty</h2>
          <p className="lead text-muted mb-4">Start shopping to add items to your cart.</p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" data-testid="cart-page">
      {/* Featured Products Carousel */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Recommended for you</h3>
          <div className="carousel-controls">
            <button 
              className="btn btn-outline-primary me-2" 
              onClick={prevSlide}
              data-testid="carousel-prev"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={nextSlide}
              data-testid="carousel-next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="row" data-testid="featured-carousel">
          {getCurrentProducts().map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView || (() => {})}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4">Shopping Cart</h2>
          <div className="card">
            <div className="card-body">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="row align-items-center cart-item-row py-3">
                  <div className="col-md-2">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="img-fluid rounded"
                      data-testid={`cart-page-image-${index}`}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 data-testid={`cart-page-name-${index}`}>{item.product.name}</h5>
                    {item.selectedSize && (
                      <small className="text-muted d-block" data-testid={`cart-page-size-${index}`}>
                        Size: {item.selectedSize}
                      </small>
                    )}
                    {item.selectedColor && (
                      <small className="text-muted d-block" data-testid={`cart-page-color-${index}`}>
                        Color: {item.selectedColor}
                      </small>
                    )}
                  </div>
                  <div className="col-md-2">
                    <div className="price-text fs-5" data-testid={`cart-page-price-${index}`}>
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group">
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        data-testid={`cart-page-decrease-${index}`}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center" 
                        value={item.quantity}
                        readOnly
                        data-testid={`cart-page-quantity-${index}`}
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        data-testid={`cart-page-increase-${index}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <div className="fw-bold fs-5 mb-2" data-testid={`cart-page-total-${index}`}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      className="btn btn-outline-danger btn-sm" 
                      onClick={() => removeFromCart(item.product.id)}
                      data-testid={`cart-page-remove-${index}`}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span data-testid="cart-page-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span data-testid="cart-page-shipping">${shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span data-testid="cart-page-tax">${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-4 fw-bold">
                <span>Total:</span>
                <span data-testid="cart-page-total">${total.toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2 mt-4">
                <Link href="/checkout" className="btn btn-primary btn-lg" data-testid="cart-page-checkout">
                  <i className="fas fa-credit-card me-2"></i>Proceed to Checkout
                </Link>
                <Link href="/products" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
