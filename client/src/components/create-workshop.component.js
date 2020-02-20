import React, {Component} from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";

import PopUp from './popup.component';

export default class CreateWorkshop extends Component {
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

  onChangeTitle = (event) => {
    this.setState({
      title : event.target.value
    })
  }

  onChangeDate = (event) => {
    this.setState({
      date : event.target.value
    })
  }

  onChangeStartHour = (event) => {
    this.setState({
      startHour : event.target.value
    })
  }

  onChangeStartMins = (event) => {
    this.setState({
      startMins : event.target.value
    })
  }

  onChangeEndHour = (event) => {
    this.setState({
      endHour : event.target.value
    })
  }

  onChangeEndMins = (event) => {
    this.setState({
      endMins : event.target.value
    })
  }

  onChangeDescription = (event) => {
    this.setState({
      description : event
    })
  }

  onChangeBooking = (event) => {
    this.setState({
      booking : event.target.value
    })
  }

  onChangeLocation = (event) => {
    this.setState({
      location : event.target.value
    })
  }

  showPopUp = () => {
    if(this.state.popUpMsg){
      return (
        <PopUp text={this.state.popUpMsg}></PopUp>
      )
    }else{
      return null
    }
  }

  onSubmit = (event) => {
    //prevent default form logic
    event.preventDefault();

    console.log("Submit form : ", this.state)

    const newWorkshop = {
      title : this.state.title,
      date : this.state.date,
      startHour : this.state.startHour,
      startMins : this.state.startMins,
      endHour : this.state.endHour,
      endMins : this.state.endMins,
      description : this.state.description,
      booking : this.state.booking
    }

    const token = localStorage.getItem('jwtToken');

    axios.post('/workshops/addWorkshop', newWorkshop , {
      headers : { Authorization : "Bearer " + token }
    })
    .then(res => {
      const response = res;
      return response
    })
    .then(response => {
      this.setState({
        title : "",
        date : "",
        startHour : 0,
        startMins : 0,
        endHour : 0,
        endMins : 0,
        description : "",
        booking : "",
        location : "",
        popUpMsg : response
      })
    })
  }

  render(){
    // if updating mdConfig, update the same config in bedroom.component.js
    const mdConfig = {
      hideIcons : ['image', 'link', 'table']
    }

    return(
      <div>
        <div className="animated fadeIn delay-1s hero-info-img-retreat">
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Create a workshop</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" value={this.state.title} onChange={this.onChangeTitle}></input>
            </div>

            <div className="form-group">
              <label>Image upload</label>
              <input type='file' className="form-control" onChange={this.onChangeImage}></input>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input className="form-control" value={this.state.date} onChange={this.onChangeDate}></input>
            </div>

            <div className="form-group">
              <label>Start time</label>
              <input className="form-control col-sm-2 inline-block" value={this.state.startHour} onChange={this.onChangeStartHour}></input>
              <input className="form-control col-sm-2 inline-block" value={this.state.startMins} onChange={this.onChangeStartMins}></input>
            </div>

            <div className="form-group">
              <label>End time</label>
              <input className="form-control col-sm-2 inline-block" value={this.state.endHour} onChange={this.onChangeEndHour}></input>
              <input className="form-control col-sm-2 inline-block" value={this.state.endMins} onChange={this.onChangeEndMins}></input>
            </div>

            <div className="form-group">
              <label>Workshop description</label>
              <SimpleMDE options={mdConfig} value={this.state.description} onChange={this.onChangeDescription} />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input className="form-control" value={this.state.location} onChange={this.onChangeLocation}></input>
            </div>

            <div className="form-group">
              <label>Booking Link (Leave blank if you want them to email you)</label>
              <input className="form-control" value={this.state.booking} onChange={this.onChangeBooking}></input>
            </div>


            {this.showPopUp()}

            <div className="form-group">
              <input type="submit" value="Create Workshop" className="btn btn-primary"></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
