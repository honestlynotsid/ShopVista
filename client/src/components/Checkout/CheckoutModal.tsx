import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { ShippingInfo } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const { items, subtotal, shipping, tax, total, clearCart } = useCart();

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCompleteOrder = () => {
    // Mock order completion
    alert('Order placed successfully!');
    clearCart();
    onClose();
    setStep(1);
  };

  const getProgressWidth = () => {
    return `${(step / 3) * 100}%`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block' }}
      data-testid="checkout-modal"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Checkout</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              data-testid="checkout-close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-8">
                <div className="checkout-steps mb-4">
                  <div className="progress mb-3">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: getProgressWidth() }}
                      data-testid="checkout-progress"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className={step >= 1 ? 'text-primary fw-bold' : 'text-muted'}>
                      1. Shipping
                    </span>
                    <span className={step >= 2 ? 'text-primary fw-bold' : 'text-muted'}>
                      2. Payment
                    </span>
                    <span className={step >= 3 ? 'text-primary fw-bold' : 'text-muted'}>
                      3. Review
                    </span>
                  </div>
                </div>

                {step === 1 && (
                  <div className="checkout-step" data-testid="shipping-step">
                    <h6 className="mb-3">Shipping Information</h6>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={shippingInfo.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            data-testid="first-name"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Last Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={shippingInfo.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                            data-testid="last-name"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          data-testid="email"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          value={shippingInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          data-testid="phone"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                          data-testid="address"
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={shippingInfo.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                            data-testid="city"
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">State</label>
                          <select 
                            className="form-select" 
                            value={shippingInfo.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            required
                            data-testid="state"
                          >
                            <option value="">Select State</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">ZIP Code</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={shippingInfo.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            required
                            data-testid="zip-code"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div className="checkout-step" data-testid="payment-step">
                    <h6 className="mb-3">Payment Information</h6>
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      This is a demo checkout. No actual payment will be processed.
                    </div>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="1234 5678 9012 3456"
                          data-testid="card-number"
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Expiry Date</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="MM/YY"
                            data-testid="expiry-date"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="123"
                            data-testid="cvv"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cardholder Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="John Doe"
                          data-testid="cardholder-name"
                        />
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="checkout-step" data-testid="review-step">
                    <h6 className="mb-3">Order Review</h6>
                    <div className="card mb-3">
                      <div className="card-header">
                        <h6 className="mb-0">Shipping Address</h6>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">
                          {shippingInfo.firstName} {shippingInfo.lastName}<br />
                          {shippingInfo.address}<br />
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                          {shippingInfo.phone}
                        </p>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0">Order Items</h6>
                      </div>
                      <div className="card-body">
                        {items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between mb-2">
                            <span>{item.product.name} × {item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Order Summary</h6>
                    <div className="order-items mb-3">
                      {items.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between mb-2">
                          <span data-testid={`summary-item-${index}`}>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span data-testid={`summary-price-${index}`}>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span data-testid="summary-subtotal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span data-testid="summary-shipping">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax:</span>
                      <span data-testid="summary-tax">${tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fs-5 fw-bold">
                      <span>Total:</span>
                      <span data-testid="summary-total">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex justify-content-between w-100">
              <div>
                {step > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handlePreviousStep}
                    data-testid="previous-step"
                  >
                    <i className="fas fa-arrow-left me-2"></i>Previous
                  </button>
                )}
              </div>
              <div>
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Close
                </button>
                {step < 3 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleNextStep}
                    data-testid="next-step"
                  >
                    Continue <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={handleCompleteOrder}
                    data-testid="complete-order"
                  >
                    Complete Order <i className="fas fa-check ms-2"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
