import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';
import moment from 'moment';

import workshopFooter from "../images/workshopFooter.jpg";

export default class ShowWorkshop extends Component {
  constructor(props){
    super(props)

    this.state = {
      token : ""
    }
  }

  componentWillMount = () =>{
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

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.workshop.title}</h3>
        <p className="sub-heading">{this.props.workshop.date}</p>
        <p className="sub-heading">{this.props.workshop.startHour}:{this.props.workshop.startMins} - {this.props.workshop.endHour}:{this.props.workshop.endMins}</p>

        <p style={{"marginTop" : 25}}>{this.props.workshop.location}</p>
        <p style={{"marginTop" : 15}}>{this.props.workshop.description}</p>
        <p style={{"marginTop" : 15}}>{this.props.workshop.booking}</p>

        <img className="workshop-footer" src={workshopFooter} alt="Emily teaching yoga"></img>

        {this.isLoggedIn()}

        <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>
    )
  }
}
