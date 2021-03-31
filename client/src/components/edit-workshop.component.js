import React, {Component} from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { s3env } from '../config';

import PopUp from './popup.component';

export default class EditWorkshop extends Component {
  constructor(props){
    super(props)

    this.state = {
      title : "",
      date : "",
      startHour : 0,
      startMins : 0,
      endHour : 0,
      endMins : 0,
      description : "",
      booking : "",
      location : "",
      popUpMsg : null
    }
  }

  componentDidMount(){
    axios.get('/workshops/'+this.props.match.params.id)
    .then(res => {
      this.setState({
        title : res.data.title,
        date : res.data.date,
        startHour : res.data.startHour,
        startMins : res.data.startMins,
        endHour : res.data.endHour,
        endMins : res.data.endMins,
        description : res.data.description,
        location : res.data.location,
        booking : res.data.booking
      })
    })
    .catch(function(err){
      console.log('error getting workshop : ', err);
    })
  }

  updateTitle = (event) => {
    this.setState({
      title : event.target.value
    })
  }

  updateDate = (event) => {
    this.setState({
      date : event.target.value
    })
  }

  updateStartHour = (event) => {
    this.setState({
      startHour : event.target.value
    })
  }

  updateStartMins = (event) => {
    this.setState({
      startMins : event.target.value
    })
  }

  updateEndHour = (event) => {
    this.setState({
      endHour : event.target.value
    })
  }

  updateEndMins = (event) => {
    this.setState({
      endMins : event.target.value
    })
  }

  updateDescription = (event) => {
    this.setState({
      description : event
    })
  }

  updateBooking = (event) => {
    this.setState({
      booking : event.target.value
    })
  }

  updateLocation = (event) => {
    this.setState({
      location : event.target.value
    })
  }

  showPopUp(){
    if(this.state.popUpMsg){
      return (
        <PopUp text={this.state.popUpMsg}></PopUp>
      )
    }else{
      return null
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('jwtToken');

    const editedWorkshop = {
      title : this.state.title,
      date : this.state.date,
      startHour : this.state.startHour,
      startMins : this.state.startMins,
      endHour : this.state.endHour,
      endMins : this.state.endMins,
      description : this.state.description,
      booked : this.state.booked,
      location : this.state.location
    };

    axios.post('/workshops/update/' + this.props.match.params.id, editedWorkshop, {
      headers :{ Authorization : "Bearer " + token}
    })
      .then(res => {
        const response = res.data
        return response
      })
      .then((response) =>{
        this.setState({
          popUpMsg : response
        })
      })
  }

  render(){
    const mdConfig = {
      hideIcons : ['image', 'link', 'table']
    }

    const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
    const heroImg = urlPrefix + "workshopHeader.jpg";

    return(
      <div>
        <div className="animated fadeIn delay-1s hero-info-img-retreat" style={{"backgroundImage": `url(${heroImg})`}}>
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Edit a workshop</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" value={this.state.title} onChange={this.updateTitle}></input>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input className="form-control" value={this.state.date} onChange={this.updateDate}></input>
            </div>

            <div className="form-group">
              <label>Start time</label>
              <input className="form-control" value={this.state.startHour} onChange={this.updateStartHour}></input>
              <input className="form-control" value={this.state.startMins} onChange={this.updateStartMins}></input>
            </div>

            <div className="form-group">
              <label>End time</label>
              <input className="form-control" value={this.state.endHour} onChange={this.updateEndHour}></input>
              <input className="form-control" value={this.state.endMins} onChange={this.updateEndMins}></input>
            </div>

            <div className="form-group">
              <label>Workshop description</label>
              <SimpleMDE options={mdConfig} value={this.state.description} onChange={this.updateDescription} />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input className="form-control" value={this.state.location} onChange={this.updateLocation}></input>
            </div>

            <div className="form-group">
              <label>Booking Link (Leave blank if you want them to email you)</label>
              <input className="form-control" value={this.state.booking} onChange={this.updateBooking}></input>
            </div>

            { this.showPopUp() }

            <div className="form-group">
              <input type="submit" value="Update Workshop" className="btn btn-primary"></input>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
