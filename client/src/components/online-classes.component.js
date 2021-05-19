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
                <p style={{"marginTop":50, "textAlign" : 'center'}}>
                I now have over 100 pre-recorded videos online - so you can practice with me at your own leisure, whenever you need, wherever you are! Most of these are recorded versions of live zoom classes. The collection will grow as more recent classes and pose tutorials are uploaded along the way.
                </p>
                <p style={{"marginTop":25, "marginBottom" : 0}}>The collection includes:</p>
                <ul>
                    <li>Vinyasa (intermediate level) flow classes</li>
                    <li>Dynamic (higher intensity level) flow classes </li>
                    <li>Ashtanga classes (modified primary series)</li>
                    <li>Slow flow classes</li>
                    <li>Core half hour power classes </li>
                </ul>
                <p style={{"marginTop":25, "textAlign" : 'center'}}>Classes are ordered in thematic collections, with filters to search through the selections - there is something for every part of the body, every mood and hopefully every body!</p>

                <p style={{"marginTop":25, "textAlign" : 'center'}}>You can purchase individual classes for £5, receiving a viewing link that will expire in 3 days, or choose a monthly subscription for £17 that gives you access to the entire library. Cancel your subscription at any time.</p>

                <p style={{"marginTop":25, "textAlign" : 'center', marginBottom : 50}}>Feel free to message me on <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a> if you need help choosing what might suit you. </p>

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
