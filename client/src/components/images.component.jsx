import React from 'react';
import ReactTooltip from 'react-tooltip';
import { s3env } from '../config';

export const Images = (props) => {

  const lidoYoga = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/lidoYoga2.jpeg';
  const battersea = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/battersea.jpg';
  const revive = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/revive.jpg';
  const aboutOne = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/about-one.jpg';
  const aboutTwo = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/about-two.jpeg';
  const aboutThree = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/about-three.jpeg';
  const contactOne = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/contactOne.jpeg';
  const contactTwo = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/contactTwo.jpg';
  const contactThree = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/contactThree.jpg';

  if(props.page === "lessons"){
    return (
      <div className="image-container">
        <img className="stock-image" src={lidoYoga} alt="yoga studio" data-tip="Tooting Bec Lido"></img>
        <img className="stock-image" src={battersea} alt="yoga studio" data-tip="Battersea Yoga"></img>
        <img className="stock-image" src={revive} alt="yoga studio" data-tip="Revive Tooting Yoga"></img>
        <ReactTooltip place="left" type="dark" effect="solid"></ReactTooltip>
      </div>
    )
  }

  if(props.page === "about"){
    return (
      <div className="image-container">
        <img className="stock-image" src={aboutTwo} alt="Emily doing yoga"></img>
        <img className="stock-image" src={aboutOne} alt="Emily doing yoga"></img>
        <img className="stock-image" src={aboutThree} alt="Emily doing yoga"></img>
      </div>
    )
  }

  if(props.page === "contact"){
    return (
      <div className="image-container">
        <img className="stock-image" src={contactOne} alt="Emily doing yoga"></img>
        <img className="stock-image" src={contactTwo} alt="Emily doing yoga"></img>
        <img className="stock-image" src={contactThree} alt="Emily doing yoga"></img>
      </div>
    )
  }
}
