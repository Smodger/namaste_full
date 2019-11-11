import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Images } from './images.component'

export const Contact = (props) => {
  return (
    <div>
      <div className="hero-info-img">
        <div className="hero-info-overlay"></div>
        <div className="hero-landing-text-container">
          <p className="hero-img-text">Em Thomson</p>
          <p className="hero-img-subtext">Yoga teacher</p>
        </div>
      </div>
      <div className="page-container" style={{ 'textAlign': 'center' }}>
        <h3 className="page-heading">Contact</h3>
        <p>For any enquiries please contact me at: <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a>.</p>
        <p>Or check out my social media!</p>
        <div>
          <span className="social-media-icons"><SocialIcon url="http://facebook.com/emthomsonyoga"></SocialIcon></span>
          <span className="social-media-icons"><SocialIcon url="https://www.instagram.com/em_c_thomson/?hl=en"></SocialIcon></span>
        </div>
        <p style={{ 'marginTop': 16 }}>Also available for private classes, group hire or corporate events - basically if you want yoga let's chat</p>
      </div>
      <div className="contact-logo"></div>

      <Images page="contact"></Images>
    </div>
  )
}
