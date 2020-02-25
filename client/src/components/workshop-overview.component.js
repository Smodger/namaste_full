import React , { Component } from 'react';
import moment from 'moment';

import { s3env } from '../config';


export default class WorkshopOverview extends Component {
  constructor(props){
    super(props)

    this.state = {
      workshop : props.workshop
    }
  }


  render(){
    return (
      <div style={{ padding: 20, display: "inline-block"}} onClick={this.props.onClick}>
        <img alt="workshop thumbnail" src={this.props.s3url + this.props.workshop.image[0]} style={{ "width" : 200}}></img>
        <div className="retreat-text">
          <div>
            <p>{this.state.workshop.title}</p>
            <p>{this.state.workshop.date}</p>
            <p>{this.state.workshop.startHour}:{this.state.workshop.startMins} - {this.state.workshop.endHour}:{this.state.workshop.endMins}</p>
            <p>{this.state.workshop.location}</p>
          </div>
        </div>
      </div>
    )
  }
}
