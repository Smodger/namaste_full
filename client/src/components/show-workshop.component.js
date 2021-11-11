import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';
import moment from 'moment';

import workshopFooter from '../images/workshopFooter.jpg'

export default class ShowWorkshop extends Component {
  constructor(props){
    super(props)

    this.state = {
      token : ""
    }
  }

  componentWillMount = () => {
    this.getToken()
  }

  getToken = () => {
    this.setState({
      token : localStorage.getItem('jwtToken')
    })
  }

  deleteWorkshop = () => {
    const token = this.state.token;

    axios.delete('/workshops/delete/'+ this.props.workshop._id, { headers : { Authorization: `Bearer ${token}`}})
      .then(res =>{
        console.log('Workshop Deleted',this.props.retreat._id);
      })
      .catch(function(err){
        console.log('errror deleting lesson', err);
      })

    window.location.reload();
  }

  isLoggedIn = () => {
    const token = this.state.token;

    if(token){
      return (
        <div>
          <Link className="mr-3" to={"/editWorkshop/" + this.props.workshop._id}>Edit</Link>
          <button className="btn btn-danger ml-5" onClick={this.deleteWorkshop}>Delete</button>
        </div>
      )
    }else{
      return null
    }
  }

  getWorkshopImage = () => {
    if(this.props.workshop.image.length > 0){
      return (
        <img className="workshop-footer" alt="workshop thumbnail" src={this.props.s3url + this.props.workshop.image[0]} style={{ "width" : 300 }}></img>
      )
    }else{
      return (
        <img className="workshop-footer" alt="workshop thumbnail" src={workshopFooter} style={{ "width" : 300 }}></img>
      )
    }
  }

  bookingLink = () => {
    if(this.props.workshop.booking){
      return <a href={this.props.workshop.booking}>Book here</a>
    }

    if(!this.props.workshop.booking){
      return <p>Contact me to book at <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a></p>
    }
  }

  getTime = () => {
    const startTime = this.props.workshop.startHour + ":" + this.props.workshop.startMins;
    const endTime = this.props.workshop.endHour + ":" + this.props.workshop.endHour;

    return moment(startTime, 'HH:mm').format('h:mma') + " - " + moment(endTime, 'HH:mm').format('h:mma');
  }

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.workshop.title}</h3>
        <p className="sub-heading">{this.props.workshop.date}</p>
        <p className="sub-heading">{this.getTime()}</p>

        <p style={{"marginTop" : 25}}>{this.props.workshop.location}</p>
        <Markdown style={{"marginTop" : 15, "marginBottom" : 15}} source={this.props.workshop.description}></Markdown>
        {this.bookingLink()}

        {this.getWorkshopImage()}

        {this.isLoggedIn()}

        <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>
    )
  }
}
