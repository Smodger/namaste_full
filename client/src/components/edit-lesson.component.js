import React, { Component } from 'react';
import axios from 'axios';

import PopUp from './popup.component';

export default class EditLesson extends Component {

  constructor(props){
    super(props);

    this.updateDOW = this.updateDOW.bind(this);
    this.updateStartHour = this.updateStartHour.bind(this);
    this.updateStartMinutes = this.updateStartMinutes.bind(this);
    this.updateEndHour = this.updateEndHour.bind(this);
    this.updateEndMinutes = this.updateEndMinutes.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateYogaStyle = this.updateYogaStyle.bind(this);
    this.updateURL = this.updateURL.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
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

  componentDidMount(){
    axios.get('/lessons/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          dayOfTheWeek : res.data.dayOfTheWeek,
          startHour : res.data.startHour,
          startMinutes : res.data.startMinutes,
          endHour : res.data.endHour,
          endMinutes : res.data.endMinutes,
          location : res.data.location,
          yogaStyle : res.data.yogaStyle,
          linkToStudio : res.data.linkToStudio,
          additionalInfo : res.data.additionalInfo
        })
      })
      .catch(function(err){
        console.log('error getting lesson : ', err);
      })
  }

  updateDOW(event){
    this.setState({
      dayOfTheWeek : event.target.value
    })
  }

  updateStartHour(event){
    this.setState({
      startHour : event.target.value
    })
  }

  updateStartMinutes(event){
    this.setState({
      startMinutes : event.target.value
    })
  }

  updateEndHour(event){
    this.setState({
      endHour : event.target.value
    })
  }

  updateEndMinutes(event){
    this.setState({
      endMinutes : event.target.value
    })
  }

  updateLocation(event){
    this.setState({
      location : event.target.value
    })
  }

  updateYogaStyle(event){
    this.setState({
      yogaStyle : event.target.value
    })
  }

  updateURL(event){
    this.setState({
      linkToStudio : event.target.value
    })
  }

  updateInfo(event){
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
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const lessonObj = {
      dayOfTheWeek : this.state.dayOfTheWeek,
      startHour : this.state.startHour,
      startMinutes : this.state.startMinutes,
      endHour : this.state.endHour,
      endMinutes : this.state.endMinutes,
      location : this.state.location,
      yogaStyle : this.state.yogaStyle,
      linkToStudio : this.state.linkToStudio,
      additionalInfo : this.state.additionalInfo
    };

    axios.post('/lessons/update/' + this.props.match.params.id, lessonObj, {
      headers :{ Authorization : "Bearer " + token}
    })
      .then(res => {
        console.log('data', res.data)
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
    return (
      <div>
        <div className="animated fadeIn delay-1s hero-info-img-classes">
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Update Lesson</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Day of the Week</label>
              <input className="form-control" value={this.state.dayOfTheWeek} onChange={this.updateDOW}></input>
            </div>

            <div className="form-group">
              <label className="block">Start Time - 24 hours</label>
              <input type="number" max="24" className="form-control col-sm-2 inline-block" placeholder="Hours" value={this.state.startHour} onChange={this.updateStartHour}></input>
              <span style={{ marginLeft : 10, marginRight : 10}}>:</span>
              <input type="number" max="60" className="form-control col-sm-2 inline-block" placeholder="Minutes" value={this.state.startMinutes} onChange={this.updateStartMinutes}></input>
            </div>

            <div className="form-group">
              <label className="block">End Time - 24 hours</label>
              <input type="number" max="24" className="form-control col-sm-2 inline-block" placeholder="Hours" value={this.state.endHour} onChange={this.updateEndHour}></input>
              <span style={{ marginLeft : 10, marginRight : 10}}>:</span>
              <input type="number" max="60" className="form-control col-sm-2 inline-block" placeholder="Minutes" value={this.state.endMinutes} onChange={this.updateEndMinutes}></input>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="string" className="form-control" value={this.state.location} onChange={this.updateLocation}></input>
            </div>

            <div className="form-group">
              <label>Yoga Style</label>
              <input type="string" className="form-control" value={this.state.yogaStyle} onChange={this.updateYogaStyle}></input>
            </div>

            <div className="form-group">
              <label>Link to Studio</label>
              <input type="string" className="form-control" value={this.state.linkToStudio} onChange={this.updateURL}></input>
            </div>


            <div className="form-group">
              <label>Additional information</label>
              <input type="string" className="form-control" value={this.state.additionalInfo} onChange={this.updateInfo}></input>
            </div>
            {this.showPopUp()}
            <div className="form-group">
              <input type="submit" value="Update Lesson" className="btn btn-primary"></input>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
