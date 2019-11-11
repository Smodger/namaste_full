import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class showRetreat extends Component {
  constructor(props){
    super(props)

    this.handleDeleteRetreat = this.handleDeleteRetreat.bind(this);
  }


  listWhatsIncluded(){
    console.log('props', this.props.retreat);
    return this.props.retreat.whatsIncluded.map((item, i) => {
      return <li key={i}>{item}</li>
    })
  }

  listBedrooms(){
    return this.props.retreat.bedRooms.map((room, i) => {
      if(room.booked){
        return (
          <div key={i}>
            <p>Bedroom {i + 1} - {room.description} - £{room.cost} - <strong>BOOKED</strong></p>
          </div>
        )
      }else{
        return (
          <div key={i}>
            <p>Bedroom {i + 1} - {room.description} - £{room.cost}</p>
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

    axios.delete('http://localhost:1234/retreats/delete/'+ this.props.retreat._id, { headers : { Authorization: `Bearer ${token}`}})
      .then(res =>{
        console.log('Lesson Deleted',this.props.retreat._id);
      })
      .catch(function(err){
        console.log('errror deleting lesson', err);
      })

    window.location.reload();
  }

  render(){
    return (
      <div className="page-container">
        <h3 className="page-heading">{this.props.retreat.name}</h3>
        <p className="sub-heading">{this.props.retreat.dateStart} - {this.props.retreat.dateEnd}</p>

        <div className="separator-2"></div>

          <div className="shavasana">
            <h6 className="retreat-heading">Overview</h6>
            <p>{this.props.retreat.retreatSummary}</p>
          </div>

          <img className="retreat-image-landscape" src={"http://localhost:1234/" + this.props.retreat.retreatImages[6]} alt="retreat overview"></img>

          <div className="shavasana">
            <h6 className="retreat-heading">What's Included</h6>
            <ul>
              {this.listWhatsIncluded()}
            </ul>
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">How to get there</h6>
            <p className="instruction-header">By car:</p>
            <p style={{"marginLeft" : 15}}>{this.props.retreat.byCar}</p>
            <p className="instruction-header">Public transport:</p>
            <p style={{"marginLeft" : 15}}>{this.props.retreat.byTrain}</p>
          </div>


          <div className="shavasana">
            <h6 className="retreat-heading">Accommodation</h6>
            {this.listBedrooms()}
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">Food Options</h6>
            <p>{this.props.retreat.food}</p>
          </div>

          <div className="shavasana">
            <img className="retreat-image" src={"http://localhost:1234/" + this.props.retreat.retreatImages[3]} alt="Images of food available at the retreat"></img>
            <img className="retreat-image" src={"http://localhost:1234/" + this.props.retreat.retreatImages[4]} alt="Images of food available at the retreat"></img>
            <img className="retreat-image" src={"http://localhost:1234/" + this.props.retreat.retreatImages[5]} alt="Images of food available at the retreat"></img>
          </div>

          <div className="shavasana">
            <h6 className="retreat-heading">Booking information</h6>
            <p>{this.props.retreat.bookingDetails}</p>
            {this.howToBook()}
          </div>

          <div className="retreat-img-container">
            <img className="retreat-image" src={"http://localhost:1234/"+this.props.retreat.retreatImages[0]} alt="images of yoga retreat"></img>
            <img className="retreat-image" src={"http://localhost:1234/"+this.props.retreat.retreatImages[1]} alt="images of yoga retreat"></img>
            <img className="retreat-image" src={"http://localhost:1234/"+this.props.retreat.retreatImages[2]} alt="images of yoga retreat"></img>
          </div>

          <div>
            <Link to={"/editRetreat/" + this.props.retreat._id}>Edit</Link>
            <button className="btn btn-danger" onClick={this.handleDeleteRetreat}>Delete</button>
          </div>
          <button style={{"marginBottom" : 30}} onClick={this.props.onClick}>Back</button>
      </div>

    )
  }
}
