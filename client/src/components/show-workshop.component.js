import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';

import { s3env } from '../config';

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
          <Link to={"/editWorkshop/" + this.props.workshop._id}>Edit</Link>
          <button className="btn btn-danger" onClick={this.deleteWorkshop}>Delete</button>
        </div>
      )
    }else{
      return null
    }
  }

  getWorkshopImage = () => {
    console.log('prop', this.props.workshop);
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

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.workshop.title}</h3>
        <p className="sub-heading">{this.props.workshop.date}</p>
        <p className="sub-heading">{this.props.workshop.startHour}:{this.props.workshop.startMins} - {this.props.workshop.endHour}:{this.props.workshop.endMins}</p>

        <p style={{"marginTop" : 25}}>{this.props.workshop.location}</p>
        <p style={{"marginTop" : 15}}>{this.props.workshop.description}</p>
        <p style={{"marginTop" : 15}}>{this.props.workshop.booking}</p>

        {this.getWorkshopImage()}

        {this.isLoggedIn()}

        <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>
    )
  }
}
