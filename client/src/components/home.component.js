import React, { Component } from 'react';
import { s3env } from '../config';

export default class Home extends Component {

  render(){
    const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
    const heroImg = urlPrefix + "landing.jpeg";
    return (
      <div className="animated fadeIn delay-1s hero-landing-img" style={{"backgroundImage": `url(${heroImg})`}}>
        <div className="hero-landing-overlay"></div>
        <div className="hero-landing-text-container">
          <p className="hero-img-text">Em Thomson</p>
          <p className="hero-img-subtext">Yoga teacher</p>
        </div>
      </div>
    )
  }
}
