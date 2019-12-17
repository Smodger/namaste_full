import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';
import AWS from 'aws-sdk';
import moment from 'moment'

export default class showRetreat extends Component {
  constructor(props){
    super(props)

    this.handleDeleteRetreat = this.handleDeleteRetreat.bind(this);
  }

  listWhatsIncluded(){
    return this.props.retreat.whatsIncluded.map((item, i) => {
      return <li key={i}>{item}</li>
    })
  }

  listBedrooms(){
    return this.props.retreat.bedRooms.map((room, i) => {
      if(room.booked){
        return (
          <div key={i}>
            <p>Bedroom {i + 1} - <Markdown className="inline md" source={room.description} /> - £{room.cost} - <strong>BOOKED</strong></p>
          </div>
        )
      }else{
        return (
          <div key={i}>
            <p>Bedroom {i + 1} - <Markdown className="inline md" source={room.description} /> - £{room.cost}</p>
          </div>
        )
      }
    })
  }

  howToBook(){
    if(this.props.retreat.bookingUrl){
      return <a href={this.props.retreat.bookingUrl}>Book here</a>
    }

    if(!this.props.retreat.bookingUrl){
      return <p>Contact me to book at <a href="mailto:emthomsonyoga@gmail.com">emthomsonyoga@gmail.com</a></p>
    }
  }

  handleDeleteRetreat(){
    const token = localStorage.getItem('jwtToken');

    axios.delete('/retreats/delete/'+ this.props.retreat._id, { headers : { Authorization: `Bearer ${token}`}})
      .then(res =>{
        console.log('Lesson Deleted',this.props.retreat._id);
      })
      .catch(function(err){
        console.log('errror deleting lesson', err);
      })

    window.location.reload();
  }

  isLoggedIn(){
    const token = localStorage.getItem('jwtToken');

    if(token){
      return (
        <div>
          <Link to={"/editRetreat/" + this.props.retreat._id}>Edit</Link>
          <button className="btn btn-danger" onClick={this.handleDeleteRetreat}>Delete</button>
        </div>
      )
    }else{
      return null
    }
  }

  formatRetreatDates(){
    if(this.props.retreat.dateStart){
      var formattedDateStart = moment(new Date(this.props.retreat.dateStart)).format("MMMM Do YYYY")
    }

    if(this.props.retreat.dateEnd){
      var formattedDateEnd = moment(new Date(this.props.retreat.dateEnd)).format("MMMM Do YYYY")
    }

    return (
      <p className="sub-heading">{formattedDateStart} - {formattedDateEnd}</p>
    )
  }

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.retreat.name}</h3>
        {this.formatRetreatDates()}

        <div className="separator-2"></div>

          <div className="shavasana">
            <h6 className="retreat-heading">Overview</h6>
            <Markdown source={this.props.retreat.retreatSummary}></Markdown>

          </div>

          <img className="retreat-image-landscape" src={this.props.s3url + this.props.retreat.retreatImages[6]} alt="retreat overview"></img>

          <div className="shavasana">
            <h6 className="retreat-heading">What's Included</h6>
            <ul>
              {this.listWhatsIncluded()}
            </ul>
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">How to get there</h6>
            <p className="instruction-header">By car:</p>
            <p style={{"marginLeft" : 15}}><Markdown source={this.props.retreat.byCar} /></p>
            <p className="instruction-header">Public transport:</p>
            <p style={{"marginLeft" : 15}}><Markdown source={this.props.retreat.byTrain} /></p>
          </div>


          <div className="shavasana">
            <h6 className="retreat-heading">Accommodation</h6>
            <Markdown source={this.props.retreat.accomodationOverview} />
            {this.listBedrooms()}
          </div>

          <div className="shavasana">
            <img className="retreat-image" src={this.props.s3url + this.props.retreat.retreatImages[7]} alt="Images of accommodation"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[8]} alt="Images of accommodation"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[9]} alt="Images of accommodation"></img>
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">Food Options</h6>
            <Markdown source={this.props.retreat.food}></Markdown>
          </div>

          <div className="shavasana">
            <img className="retreat-image" src={this.props.s3url + this.props.retreat.retreatImages[3]} alt="Images of food available at the retreat"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[4]} alt="Images of food available at the retreat"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[5]} alt="Images of food available at the retreat"></img>
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">Booking information</h6>
            <Markdown source={this.props.retreat.bookingDetails}></Markdown>
            {this.howToBook()}
          </div>

          <div className="retreat-img-container">
            <img className="retreat-image" src={this.props.s3url + this.props.retreat.retreatImages[0]} alt="images of yoga retreat"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[1]} alt="images of yoga retreat"></img>
            <img className="retreat-image mobile-hide" src={this.props.s3url + this.props.retreat.retreatImages[2]} alt="images of yoga retreat"></img>
          </div>

          {this.isLoggedIn()}
          <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>
    )
  }
}
