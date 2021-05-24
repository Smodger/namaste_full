import React from 'react';
import { s3env } from '../config';

const OnlineClasses = () => {
    const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
    const heroImg = urlPrefix + "online-classes.jpeg";

    return (
        <div>
            <div className="animated fadeIn delay-1s hero-info-img-about" style={{"backgroundImage": `url(${heroImg})`, backgroundPosition : "top"}}>
                <div className="hero-landing-text-container">
                <p className="hero-img-text">Em Thomson</p>
                <p className="hero-img-subtext">Yoga teacher</p>
                </div>
            </div>
            <div className="page-container">
                <h3 className="page-heading">Online Library</h3>
                <p style={{"marginTop":50}}>
                Em has over 100 pre-recorded videos online - so you can practice with her at your own leisure, whenever you need, wherever you are! 
                </p>
                <p style={{"marginTop":50}}>
                The majority are recorded zoom classes so they will have a 'live' feel. Classes are ordered in thematic collections and can be filtered through the search bar to easily find your favourites. There is something for every part of the body, every mood and hopefully every body!
                </p>
                <p style={{"marginTop":25, "marginBottom" : 0}}>The collection includes:</p>
                <ul>
                    <li>Vinyasa (intermediate level) flow classes</li>
                    <li>Dynamic (higher intensity level) flow classes </li>
                    <li>Ashtanga classes (modified primary series)</li>
                    <li>Slow flow classes</li>
                    <li>Core half hour power classes </li>
                </ul>
                <p style={{"marginTop":25}}>You can rent individual classes for £5 or choose a monthly subscription for £17 to give you access to the entire library (cancel your subscription at any time).</p>

                <p style={{"marginTop":25, "marginBottom":50}}>Feel free to email <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a> if you need help choosing which videos might suit you.</p>

                <p>Have a scroll through the collection below and click to view!</p>

                <iframe src="https://withribbon.com/video/plugin/4604"  allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title="ribbon-snippet"
                style={{
                    width: "100%",
                    height:550,
                    border:0,
                    marginBottom : 100
                }}></iframe>
            </div>
        </div>
    )
}

export default OnlineClasses
