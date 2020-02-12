import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';
import moment from 'moment';

import workshopFooter from "../images/workshopFooter.jpg";

export default class ShowWorkshop extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.workshop.title}</h3>
        <p className="sub-heading">{this.props.workshop.date}</p>
        <p className="sub-heading">{this.props.workshop.startHour}:{this.props.workshop.startMins} - {this.props.workshop.endHour}:{this.props.workshop.endMins}</p>

        <p style={{"marginTop" : 25}}>{this.props.workshop.description}</p>
        <p style={{"marginTop" : 12}}>{this.props.workshop.booking}</p>

        <img className="workshop-footer" src={workshopFooter} alt="Emily teaching yoga"></img>

        <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>
    )
  }
}
