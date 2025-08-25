import React, { useState } from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="footer mt-5" data-testid="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-white mb-3">ShopHub</h5>
            <p className="text-muted">
              Your one-stop shop for fashion, electronics, and home decor. Quality products at competitive prices.
            </p>
            <div className="social-links">
              <a href="#" className="text-white me-3" data-testid="social-facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white me-3" data-testid="social-twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-3" data-testid="social-instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white" data-testid="social-linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-about">About Us</a></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-contact">Contact</a></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-faq">FAQ</a></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-shipping">Shipping Info</a></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-returns">Returns</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-white mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li><Link href="/products?category=fashion" className="text-muted text-decoration-none" data-testid="footer-fashion">Fashion</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted text-decoration-none" data-testid="footer-electronics">Electronics</Link></li>
              <li><Link href="/products?category=home" className="text-muted text-decoration-none" data-testid="footer-home">Home & Decor</Link></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-sports">Sports</a></li>
              <li><a href="#" className="text-muted text-decoration-none" data-testid="footer-books">Books</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-white mb-3">Newsletter</h6>
            <p className="text-muted">Subscribe to get updates on new products and offers.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="newsletter-email"
                />
                <button className="btn btn-primary" type="submit" data-testid="newsletter-submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">
              <a href="#" className="text-muted text-decoration-none" data-testid="privacy-policy">Privacy Policy</a> |{' '}
              <a href="#" className="text-muted text-decoration-none" data-testid="terms-service">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
