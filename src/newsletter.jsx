import React, { useState } from 'react';
import axios from 'axios';
import './newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await axios.post('http://localhost:4000/hello', { email });
      setStatus('Thank you for subscribing!');
      setEmail(''); // Clear the input field
    } catch (error) {
      setStatus('Email Sent');
    }
  };

  return (
    <div className="newsletter-page">
      <div className="newsletter-container">
        <h1 className="newsletter-title">Welcome to Our Newsletter</h1>
        <p className="newsletter-description">
          Stay updated with the latest news, offers, and more by subscribing to our newsletter.
        </p>
        <div className="newsletter-form">
          <h2>Subscribe Now</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          <p className="status-message">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
