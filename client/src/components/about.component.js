import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Images } from './images.component';
import { s3env } from '../config';


export const About = (props) => {
  const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
  const heroImg = urlPrefix + "about-hero.jpg";

  return(
    <div>
      <div className="animated fadeIn delay-1s hero-info-img-about" style={{"backgroundImage": `url(${heroImg})`}}>
        <div className="hero-landing-text-container">
          <p className="hero-img-text">Em Thomson</p>
          <p className="hero-img-subtext">Yoga teacher</p>
        </div>
      </div>
      <div className="page-container">
        <h3 className="page-heading">About Em Thomson</h3>

        <p style={{"marginTop":50}}>Em has been teaching yoga for 6 years all around London and is hugely passionate about the human body, health and movement. She loves the community and positivity that go hand in hand with yoga and hopes that you do too!</p>
        <p>Em bases her own yoga business at Tooting Bec Lido Pavilion - a beautiful studio that overlooks the deep blue waters of the pool. Gorgeous view in any weather! Catch her there for weekly in person yoga classes. Em also runs sell-out yoga retreats and workshops around the UK and abroad. </p>

        <p style={{"marginTop":3+"rem"}}>In terms of style, Em is primarily trained in vinyasa and ashtanga, with a precise physical and functional approach to yoga. She pays close attention to detailed alignment and muscular engagement, whilst still maintaining creativity within her sequences. Her classes usually feature an overarching theme from week to week, which can range from a specific muscle, area of the body, or progression towards a specific yoga pose. Her classes weave in philosophical concepts and mindfulness amidst movement, and her sequences are thoroughly planned out. Expect strong flows, with a fun energetic vibe and encouraging atmosphere. And probably a fair amount of sweat.</p>
        <p>Em’s classes are accessible for all. Modifications offered throughout for those seeking to take it easy, as well as more advanced options for those that wish to go further.</p>

        <p style={{"marginTop": 3+"rem"}}>She initially trained in her 200hrs at Sampoorna Yoga in South Goa, India in 2016, where she has since returned to work for the school itself. She later completed her 500hr advanced teacher training with Jason Crandell, who remains one of her biggest teaching influences. Training didn’t stop there: she has attended regular workshops in anatomy, biomechanics, injury management and has specific trainings in yoga for beginners as well as yoga for seniors. Em is also a qualified sports massage therapist. </p>

        <p>Before her immersion into the world of yoga, Em received a first class degree from Bristol University in Drama and French, and a Masters on the three year acting course at the Guildhall School of Music and Drama. After working a few years in the acting industry, Em just kept getting drawn to movement work, until yoga became her full time passion and profession. She is also embarking on yet another degree, currently studying Physiotherapy in London to take her study of the body even further. She just loves learning and can’t get enough! Which is exactly what draws her to yoga: from every practice, from every student she learns something new.</p>

        <div style={{"marginTop":25}}>
          <span className="social-media-icons"><SocialIcon url="http://facebook.com/emthomsonyoga"></SocialIcon></span>
          <span className="social-media-icons"><SocialIcon url="https://www.instagram.com/em_c_thomson/?hl=en"></SocialIcon></span>
        </div>

        <p style={{"marginTop":50}}>Em teaches primarily in south London. She has a regular weekly schedule of public classes and is available for private/corporate classes.</p>

        <p style={{"marginTop":25}}>Available to teach Vinyasa Flow, Ashtanga, Hatha, Dynamic, Core Power flow, Dance Flow and Slow Flow.</p>

      </div>
      <Images page="about"></Images>
    </div>
  );
}
