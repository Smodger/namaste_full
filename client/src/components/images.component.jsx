import React from 'react';

import lidoYoga from '../images/lidoYoga.jpg';
import battersea from '../images/battersea.jpeg';
import revive from '../images/revive.jpg';
import aboutOne from '../images/about-one.jpg';
import aboutTwo from '../images/about-two.jpeg';
import aboutThree from '../images/about-three.jpeg';
import contactOne from '../images/contactOne.jpeg';
import contactTwo from '../images/contactTwo.jpg';
import contactThree from '../images/contactThree.jpg';

export const Images = (props) => {
  console.log("PROPS", props);

  if(props.page === "lessons"){
    return (
      <div className="image-container">
        <img className="stock-image" src={lidoYoga} alt="yoga studio"></img>
        <img className="stock-image" src={battersea} alt="yoga studio"></img>
        <img className="stock-image" src={revive} alt="yoga studio"></img>
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
