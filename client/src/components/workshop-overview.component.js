import React , { Component } from 'react';
import moment from 'moment';

import { s3env } from '../config';
import workshopFooter from '../images/workshopFooter.jpg'

export default class WorkshopOverview extends Component {
  constructor(props){
    super(props)

    this.state = {
      workshop : props.workshop
    }
  }

  getWorkshopThumbnail = () => {
    if(this.state.workshop.image.length > 0){
      return (
        <img alt="workshop thumbnail" src={this.props.s3url + this.state.workshop.image[0]} style={{ "width" : 150 }}></img>
      )
    }else{
      return (
        <img alt="workshop thumbnail" src={workshopFooter} style={{ "width" : 150 }}></img>
      )
    }
  }

  render(){
    return (
      <div style={{ padding: 20, display: "inline-block", width : "max-content"}} onClick={this.props.onClick}>
        {this.getWorkshopThumbnail()}
        <div className="retreat-text">
          <p>{this.state.workshop.title}</p>
          <p>{this.state.workshop.date}</p>
          <p>{this.state.workshop.startHour}:{this.state.workshop.startMins} - {this.state.workshop.endHour}:{this.state.workshop.endMins}</p>
          <p>{this.state.workshop.location}</p>
        </div>
      </div>
    )
  }
}
