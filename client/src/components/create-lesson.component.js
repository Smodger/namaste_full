import React, { Component } from 'react';
import axios from 'axios';

import PopUp from './popup.component';

export default class CreateLesson extends Component {

  constructor(props){
    super(props);

    this.onChangeDOW = this.onChangeDOW.bind(this);
    this.onChangeStartHour = this.onChangeStartHour.bind(this);
    this.onChangeStartMinutes = this.onChangeStartMinutes.bind(this);
    this.onChangeEndHour = this.onChangeEndHour.bind(this);
    this.onChangeEndMinutes = this.onChangeEndMinutes.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeYogaStyle = this.onChangeYogaStyle.bind(this);
    this.onChangeStudio = this.onChangeStudio.bind(this);
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      dayOfTheWeek : "",
      startHour : null,
      startMinutes : null,
      endHour : null,
      endMinutes : null,
      location : "",
      yogaStyle : "",
      linkToStudio : "",
      additionalInfo : "",
      popUpMsg : null
    }
  }

  onChangeDOW(event){
    this.setState({
      dayOfTheWeek : event.target.value
    })
  }

  onChangeStartHour(event){
    this.setState({
      startHour : event.target.value
    })
  }

  onChangeStartMinutes(event){
    this.setState({
      startMinutes : event.target.value
    })
  }

  onChangeEndHour(event){
    this.setState({
      endHour : event.target.value
    })
  }

  onChangeEndMinutes(event){
    this.setState({
      endMinutes : event.target.value
    })
  }

  onChangeLocation(event){
    this.setState({
      location : event.target.value
    })
  }

  onChangeYogaStyle(event){
    this.setState({
      yogaStyle : event.target.value
    })
  }

  onChangeStudio(event){
    this.setState({
      linkToStudio : event.target.value
    })
  }

  onChangeInfo(event){
    this.setState({
      additionalInfo : event.target.value
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

  onSubmit(event){
    //prevent default form logic
    event.preventDefault();

    console.log("Submit form : ", this.state)

    const newLesson = {
      dayOfTheWeek : this.state.dayOfTheWeek,
      startHour : this.state.startHour,
      startMinutes : this.state.startMinutes,
      endHour : this.state.endHour,
      endMinutes : this.state.endMinutes,
      location : this.state.location,
      yogaStyle : this.state.yogaStyle,
      linkToStudio : this.state.linkToStudio,
      additionalInfo : this.state.additionalInfo
    }

    const token = localStorage.getItem('jwtToken');

    axios.post('/lessons/addLesson', newLesson,{
      headers :{ Authorization : "Bearer " + token}
    })
    .then(res => {
      const response = res.data
      return response
    })
    .then(response => {
      this.setState({
        dayOfTheWeek : "",
        startHour : null,
        startMinutes : null,
        endhour : null,
        endMinutes : null,
        location : "",
        yogaStyle : "",
        linkToStudio : "",
        additionalInfo : "",
        popUpMsg : response
      })
    })
  }

  render(){
    return (
      <div>
        <div className="hero-info-img">
          <div className="hero-info-overlay"></div>
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Create Class</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Day of the Week</label>
              <input className="form-control" value={this.state.dayOfTheWeek} onChange={this.onChangeDOW}></input>
            </div>

            <div className="form-group">
              <label className="block">Start Time - 24 hours</label>
              <input type="number" max="24" className="form-control col-sm-2 inline-block" placeholder="Hours" value={this.state.startHour} onChange={this.onChangeStartHour}></input>
              <span style={{ marginLeft : 10, marginRight : 10}}>:</span>
              <input type="number" max="60" className="form-control col-sm-2 inline-block" placeholder="Minutes" value={this.state.startMinutes} onChange={this.onChangeStartMinutes}></input>
            </div>

            <div className="form-group">
              <label className="block">End Time - 24 hours</label>
              <input type="number" max="24" className="form-control col-sm-2 inline-block" placeholder="Hours" value={this.state.endHour} onChange={this.onChangeEndHour}></input>
              <span style={{ marginLeft : 10, marginRight : 10}}>:</span>
              <input type="number" max="60" className="form-control col-sm-2 inline-block" placeholder="Minutes" value={this.state.endMinutes} onChange={this.onChangeEndMinutes}></input>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" className="form-control" value={this.state.location} onChange={this.onChangeLocation}></input>
            </div>

            <div className="form-group">
              <label>Yoga Style</label>
              <input type="text" className="form-control" value={this.state.yogaStyle} onChange={this.onChangeYogaStyle}></input>
            </div>

            <div className="form-group">
              <label>Link to Yoga Studio</label>
              <input type="text" className="form-control" value={this.state.linkToStudio} onChange={this.onChangeStudio}></input>
            </div>

            <div className="form-group">
              <label>Additional Information</label>
              <input type="text" className="form-control" value={this.state.additionalInfo} onChange={this.onChangeInfo}></input>
            </div>
            {this.showPopUp()}
            <div className="form-group">
              <input type="submit" value="Create Lesson" className="btn btn-primary"></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
