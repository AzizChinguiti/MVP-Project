import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us for any inquiries or feedback!</p>
      <div className="contact-info">
        <p>Email: contact@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
      <div className="newsletter-form">
        <h2>Subscribe to Our Newsletter</h2>
        <form>
          <input type="email" placeholder="Your Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
