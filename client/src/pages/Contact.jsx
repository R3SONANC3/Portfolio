import React from 'react';
import '../styles/Contact.css';

const ContactForm = () => {
  return (
    <>
      <div className="contact-form-container">
        <div className="contact-form">
          <div className="form-left">
            <h3>Send us a message</h3>
            <form>
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="form-right">
            <h3>Contact us</h3>
            <p>We're open for any suggestion or just to have a chat</p>
            <p><i className="fa fa-map-marker"></i> Address: 198 West 21th Street, Suite 721 New York NY 10016</p>
            <p><i className="fa fa-phone"></i> Phone: +66 65 608 9783</p>
            <p><i className="fa fa-envelope"></i> Email: jeerapat5870@gmail.com</p>
            <p><i className="fa fa-globe"></i> Website: yoursite.com</p>
          </div>
        </div>
      </div>
    </>

  );
};

export default ContactForm;
