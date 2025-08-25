import React from 'react';
import CheckoutModal from '../components/Checkout/CheckoutModal';

const Checkout: React.FC = () => {
  return (
    <div data-testid="checkout-page">
      <CheckoutModal isOpen={true} onClose={() => window.history.back()} />
    </div>
  );
};

export default Checkout;
