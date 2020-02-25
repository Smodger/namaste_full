import React , { Component } from 'react';
import moment from 'moment';
import { s3env } from '../config';

import workshopFooter from '../images/workshopFooter.jpg'


export default class ShowWorkshop extends Component {
  constructor(props){
    super(props)

    this.state = {
      image : props.image,
      width : props.width,
      s3url : props.s3url
    }
  }
  
  render(){
    if(this.state.image.length > 0 || !this.state.image.length){
      return (
        <div>
          <img className="workshop-footer" alt="Emily teaching yoga" src={this.state.s3url + this.state.image} style={{ "width" : this.state.width }}></img>
        </div>
      )
    }else{
      return (
        <div>
          <img className="workshop-footer" alt="Emily teaching yoga" src={workshopFooter} style={{ "width" : this.state.width}}></img>
        </div>
      )
    }
  }
}
