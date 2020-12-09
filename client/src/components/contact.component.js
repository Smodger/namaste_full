import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Images } from './images.component'
import { s3env } from '../config';

export const Contact = (props) => {
  const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
  const heroImg = urlPrefix + "contact-hero.jpeg";
  return (
    <div>
      <div className="animated fadeIn delay-1s hero-info-img-contact" style={{"backgroundImage": `url(${heroImg})`}}>
        <div className="hero-landing-text-container">
          <p className="hero-img-text">Em Thomson</p>
          <p className="hero-img-subtext">Yoga teacher</p>
        </div>
      </div>
      <div className="page-container" style={{ 'textAlign': 'center' }}>
        <h3 className="page-heading">Contact</h3>
        <p>For any enquiries or to join my mailing list email me at: <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a>.</p>
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
