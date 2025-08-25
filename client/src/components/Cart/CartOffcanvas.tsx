import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'wouter';

interface CartOffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartOffcanvas: React.FC<CartOffcanvasProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, subtotal, shipping, tax, total, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={onClose}></div>}
      <div 
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        data-testid="cart-offcanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Shopping Cart</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            data-testid="cart-close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {items.length === 0 ? (
            <div className="text-center py-5" data-testid="empty-cart">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <h5>Your cart is empty</h5>
              <p className="text-muted">Start shopping to add items to your cart.</p>
              <Link href="/products" className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items" data-testid="cart-items">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                    <div className="row align-items-center">
                      <div className="col-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="img-fluid rounded"
                          data-testid={`cart-item-image-${index}`}
                        />
                      </div>
                      <div className="col-6">
                        <h6 data-testid={`cart-item-name-${index}`}>{item.product.name}</h6>
                        {item.selectedSize && (
                          <small className="text-muted" data-testid={`cart-item-size-${index}`}>
                            Size: {item.selectedSize}
                          </small>
                        )}
                        {item.selectedColor && (
                          <small className="text-muted d-block" data-testid={`cart-item-color-${index}`}>
                            Color: {item.selectedColor}
                          </small>
                        )}
                        <div className="price-text" data-testid={`cart-item-price-${index}`}>
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="input-group input-group-sm mb-2">
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            data-testid={`decrease-quantity-${index}`}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="form-control text-center" 
                            value={item.quantity}
                            readOnly
                            data-testid={`quantity-${index}`}
                          />
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            data-testid={`increase-quantity-${index}`}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-danger w-100" 
                          onClick={() => removeFromCart(item.product.id)}
                          data-testid={`remove-item-${index}`}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr />
              
              <div className="cart-summary" data-testid="cart-summary">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span data-testid="cart-shipping">${shipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span data-testid="cart-tax">${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total:</span>
                  <span data-testid="cart-total">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <button 
                  className="btn btn-primary w-100 mb-2" 
                  onClick={onCheckout}
                  data-testid="proceed-to-checkout"
                >
                  <i className="fas fa-credit-card me-2"></i>Proceed to Checkout
                </button>
                <button 
                  className="btn btn-outline-secondary w-100" 
                  onClick={onClose}
                  data-testid="continue-shopping"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartOffcanvas;
