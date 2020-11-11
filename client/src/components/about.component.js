import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Images } from './images.component';

import { s3env } from '../config';

export const About = (props) => {
  return(
    <div>
      <div className="animated fadeIn delay-1s hero-info-img-about">
        <div className="hero-landing-text-container">
          <p className="hero-img-text">Em Thomson</p>
          <p className="hero-img-subtext">Yoga teacher</p>
        </div>
      </div>
      <div className="page-container">
        <h3 className="page-heading">Who the hell is Em Thomson?</h3>

        <p style={{"marginTop":50, "textAlign" : 'center'}}>Em was first introduced to yoga and movement work whilst training at the Guildhall drama school to be an actor, but it soon started trickling bit by bit into her life until she was practicing every day and loving it! Thus she became a yoga teacher.</p>

        <p style={{"marginTop":25, "textAlign" : 'center'}}>Em loves yoga because she believes it is accessible to all and is a practical way to see how we each develop in our own special ways. Some people will be awesome at backbends, others rock at arm balances whilst some are wizards of the mind and meditation. It&#39;s like everyone&#39;s their own special kind of superhero, you just need to take the time to see it – which kind are you?</p>

        <p style={{"marignTop":25, "textAlign" : 'center'}}>Em initially trained at Sampoorna Yoga in South Goa, India, and has since returned for internships to further her training and practice, as well as teaching on the YTT course itself. She has also attended many workshops in anatomy, has completed specific trainings in yoga for beginners and yoga for seniors, and completed her 500 hour advanced teacher training with Jason Crandell in London.</p>

        <p style={{"marginTop":25, "textAlign" : 'center'}}>In terms of style, Em is primarily trained in vinyasa and ashtanga, with a precise physical and functional approach to yoga. She pays close attention to detailed alignment and muscular engagement, whilst still maintaining creativity within her sequences. Her classes usually feature strong flows, with a fun energetic vibe and encouraging atmosphere.</p>

        <p style={{"marginTop":25, "textAlign" : 'center'}}>On rare occasions there&#39;s a potential shoulder massage up for grabs whilst gentle trumpets serenade you in svasana. And if you hear folk music coming from the studio it&#39;s probably her class. </p>

        <p style={{"marginTop":50, "textAlign" : 'center'}}>Yoga playlists available to follow @emily.celine on Spotify. They&#39;ll be named something boring like &#34;ordered folk, lyricless yoga 6&#34;.</p>

        <div style={{"marginTop":25, "textAlign" : 'center'}}>
          <span className="social-media-icons"><SocialIcon url="http://facebook.com/emthomsonyoga"></SocialIcon></span>
          <span className="social-media-icons"><SocialIcon url="https://www.instagram.com/em_c_thomson/?hl=en"></SocialIcon></span>
        </div>

        <p style={{"marginTop":50, "textAlign" : 'center'}}>Em teaches primarily in south London. She has a regular weekly schedule of public classes and is available for private/corporate classes.</p>

        <p style={{"marginTop":25, "textAlign" : 'center'}}>Available to teach Vinyasa Flow, Ashtanga, Hatha, Dynamic, Core Power flow, Dance Flow.</p>

        <p style={{"marginTop":25, "textAlign" : 'center'}}>Get yourself engaged with the present moment - stretch, breathe and clear the mind.</p>

      </div>
      <Images page="about"></Images>
    </div>
  );
}
