import React from 'react';
import ReactTooltip from 'react-tooltip';

import lidoYoga from '../images/lidoYoga.jpg';
import battersea from '../images/battersea.jpg';
import revive from '../images/revive.jpg';
import aboutOne from '../images/about-one.jpg';
import aboutTwo from '../images/about-two.jpeg';
import aboutThree from '../images/about-three.jpeg';
import contactOne from '../images/contactOne.jpeg';
import contactTwo from '../images/contactTwo.jpg';
import contactThree from '../images/contactThree.jpg';

export const Images = (props) => {

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
        <img className="stock-image" src={aboutOne} alt="Emily doing yoga"></img>
        <img className="stock-image" src={aboutTwo} alt="Emily doing yoga"></img>
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
