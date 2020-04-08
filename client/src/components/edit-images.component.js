import React, { Component } from 'react';
import axios from 'axios';

import { s3env } from '../config';

export default class EditRetreat extends Component {
  constructor(props){
    super(props)
    this.handleStoreImageIndex = this.handleStoreImageIndex.bind(this);
    this.handleOnChangeImg = this.handleOnChangeImg.bind(this);

    this.state = {
      showInput : false
    }
  }

  handleStoreImageIndex = (image) => {
    let index = null;

    if(!image || Object.entries(image).length <= 0){
      //find empty object in array
      index = this.props.images.findIndex((i) => !Object.keys(i).length);
      image.index = index;
      image.name = "default-"+index;
    };

    this.props.storeImageIndex(image);
    this.setState({
      showInput : true
    })
  };

  handleOnChangeImg = (event) => {
    this.props.onChangeImg(event)
  };

  render(){
    return (
      <div>
        {this.props.images.map((image, i) => {
          return (
            <div style={{ "margin-bottom" : 25 }} onClick={() => this.handleStoreImageIndex(image)}>
              <img style={{ width : 100 }} src={'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/' + image.name}></img>
              <p style={{ display : "inline-block", "margin-left" : 15}}>{image.name}</p>
            </div>
          )}
        )}
        {
          this.state.showInput ? (
            <div className="form-group">
              <label>Upload Images</label>
              <input type="file" name="newImage" onChange={this.handleOnChangeImg} className="block"/>
            </div>
          ) : null
        }
      </div>
    )
  }
}
