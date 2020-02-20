import React, { Component } from 'react';
import axios from 'axios';

import { s3env } from '../config';

export default class EditRetreat extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div>
        {this.props.images.map((image, i) => {
          return (
            <div style={{ "margin-bottom" : 25 }}>
              <img style={{ width : 100 }} src={'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/' + image.name}></img>
              <p style={{ display : "inline-block", "margin-left" : 15}}>{image.name}</p>
            </div>
          )}
        )}
      </div>
    )
  }
}
