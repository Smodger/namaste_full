import React, { Component } from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { s3env } from '../config';

import Bedroom from './bedroom.component';
import PopUp from './popup.component';

export default class CreateRetreat extends Component {

  constructor(props){
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeRetreatSummary = this.onChangeRetreatSummary.bind(this);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeCar = this.onChangeCar.bind(this);
    this.onChangeTrain = this.onChangeTrain.bind(this);
    this.onChangeBookingInfoDetails = this.onChangeBookingInfoDetails.bind(this);
    this.onChangeBookingInfoUrl = this.onChangeBookingInfoUrl.bind(this);
    this.onChangeWhatIncluded = this.onChangeWhatIncluded.bind(this);
    this.onChangeRetreatImage = this.onChangeRetreatImage.bind(this);
    this.onChangeBedDescription = this.onChangeBedDescription.bind(this);
    this.onChangeBedCost = this.onChangeBedCost.bind(this);
    this.onChangeBedBooking = this.onChangeBedBooking.bind(this);
    this.onChangeAccomodation = this.onChangeAccomodation.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.appendBedroom = this.appendBedroom.bind(this);
    this.renderBedroom = this.renderBedroom.bind(this);

    this.onReady = this.onReady.bind(this);

    this.state= {
      name : "",
      dateStart : null,
      dateEnd : null,
      retreatSummary : "",
      accomodationOverview : "",
      bedRooms : [],
      food : "",
      byCar : "",
      byTrain : "",
      bookingDetails : "",
      bookingUrl : "",
      whatsIncluded : [],
      retreatImages : [],
      popUpMsg : null
    }
  }

  onChangeName(event){
    this.setState({
      name : event.target.value
    })
  }
  onChangeStartDate(event){
    this.setState({
      dateStart : event.target.value
    })
  }
  onChangeEndDate(event){
    this.setState({
      dateEnd : event.target.value
    })
  }

  onChangeRetreatSummary(event){
    this.setState({
      retreatSummary : event
    })
  }
  onChangeFood(event){
    this.setState({
      food : event
    })
  }
  onChangeCar(event){
    this.setState({
      byCar : event
    })
  }
  onChangeTrain(event){
    this.setState({
      byTrain : event
    })
  }
  onChangeBookingInfoDetails(event){
    this.setState({
      bookingDetails : event
    })
  }
  onChangeBookingInfoUrl(event){
    this.setState({
      bookingUrl : event.target.value
    })
  }
  onChangeWhatIncluded(event){
    this.setState({
      whatsIncluded : event.target.value
    })
  }

  onChangeAccomodation(event){
    this.setState({
      accomodationOverview : event
    })
  }

  onChangeRetreatImage(event){
    const newImage = [...this.state.retreatImages];
    newImage.push(event.target.files[0]);

    this.setState({
      retreatImages : newImage
    })
  }

  onChangeBedDescription(desc, i){
    const newBedroom = {...this.state.bedRooms[i], description : desc };

    let bedroomArray = this.state.bedRooms;
    bedroomArray[i] = newBedroom;

    this.setState({bedRooms : bedroomArray });
  }

  onChangeBedCost(cost, i){
    const newBedroom = {...this.state.bedRooms[i], cost : cost };

    let bedroomArray = this.state.bedRooms;
    bedroomArray[i] = newBedroom;

    this.setState({bedRooms : bedroomArray });
  }

  onChangeBedBooking(booked, i){
    const newBedroom = {...this.state.bedRooms[i], booked : booked };

    let bedroomArray = this.state.bedRooms;
    bedroomArray[i] = newBedroom;

    this.setState({bedRooms : bedroomArray });
  }

  appendBedroom(event){
    event.preventDefault();
    let newRoom = {
      description : "",
      cost : 0,
      booked : false
    };

    this.setState({
      bedRooms : [...this.state.bedRooms, newRoom]
    })
  }

  renderBedroom(){
    return this.state.bedRooms.map(function(room, i){

      return <Bedroom key={i} checkboxId={"booked-room" + i} roomNum={i} room={room} onChangeBedDescription={(desc) => this.onChangeBedDescription(desc, i)} onChangeBedCost={(cost) => this.onChangeBedCost(cost, i)} onChangeBedBooking={(booked) => this.onChangeBedBooking(booked, i)}></Bedroom>
    }, this)
  }

  onReady(instance){
    console.log("MARKDOWN", instance.value());
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

    const formData = new FormData()
    formData.append('name', this.state.name);
    formData.append('dateStart', this.state.dateStart);
    formData.append('dateEnd', this.state.dateEnd);
    formData.append('retreatSummary', this.state.retreatSummary);
    formData.append('accomodationOverview', this.state.accomodationOverview);
    formData.append('food', this.state.food);
    formData.append('byCar', this.state.byCar);
    formData.append('byTrain', this.state.byTrain);
    formData.append('bookingDetails', this.state.bookingDetails);
    formData.append('bookingUrl', this.state.bookingUrl);
    formData.append('whatsIncluded', this.state.whatsIncluded);

    for(var i = 0; i < this.state.bedRooms.length; i++){
      formData.append('bedRooms', JSON.stringify(this.state.bedRooms[i]))
    }

    for(var j = 0; j < this.state.retreatImages.length; j++){
      formData.append(
        'retreatImages',
        this.state.retreatImages[j],
        this.state.retreatImages[j].name
      )
    }

    console.log("Submit form : ", this.state)

    const token = localStorage.getItem('jwtToken');

    // set headers to pass as final argument in axios post
    const headers = {
      Authorization : "Bearer " + token,
      'Content-Type': 'multipart/form-data'
    }

    axios.post('/retreats/addRetreat', formData, {
      headers : headers
    })
      .then(res => {
        const response = res.data
        return response
      })
      .then(response => {
        this.setState({
          name : "",
          dateStart : null,
          dateEnd : null,
          retreatSummary : "",
          accomodationOverview : "",
          bedRooms : [],
          food : "",
          byCar : "",
          byTrain : "",
          bookingDetails : "",
          bookingUrl : "",
          whatsIncluded : [],
          retreatImages : [],
          popUpMsg : response
        })
      })
  }

  render(){
    // if updating mdConfig, update the same config in bedroom.component.js
    const mdConfig = {
      hideIcons : ['image', 'link', 'table']
    }

    const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
    const heroImg = urlPrefix + "retreat-hero.png";

    return (
      <div>
        <div className="animated fadeIn delay-1s hero-info-img-retreat" style={{"backgroundImage": `url(${heroImg})`}}>
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Create a retreat</h3>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">

              <div className="form-group">
                <label>Retreat Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}></input>
              </div>

              <div className="form-group">
                <label>Start Date eg(14/09/1988)</label>
                <input type="date" className="form-control" value={this.state.dateStart} onChange={this.onChangeStartDate}></input>
              </div>

              <div className="form-group">
                <label>End Date eg(22/04/1990)</label>
                <input type="date" className="form-control" value={this.state.dateEnd} onChange={this.onChangeEndDate}></input>
              </div>

              <div className="form-group">
                <label>Retreat summary</label>
                  <SimpleMDE options={mdConfig} onChange={this.onChangeRetreatSummary} value={this.state.retreatSummary} />
              </div>

              <div className="form-group">
                <label>Accommodation Overview</label>
                <SimpleMDE options={mdConfig} onChange={this.onChangeAccomodation} value={this.state.accomodationOverview} />
              </div>

              <div className="separator-long"></div>

              <div className="bedroom-container">
                {  this.renderBedroom() }
              </div>

              <div className="text-center">
                <button className="btn-primary" onClick={this.appendBedroom}>Add bedroom</button>
              </div>

              <div className="form-group">
                <label>Food</label>
                <SimpleMDE options={mdConfig} value={this.state.food} onChange={this.onChangeFood} />
              </div>

              <div className="form-group">
                <label>How to get there by Car</label>
                <SimpleMDE options={mdConfig} value={this.state.byCar} onChange={this.onChangeCar} />
              </div>

              <div className="form-group">
                <label>How to get there by public transport</label>
                <SimpleMDE options={mdConfig} value={this.state.byTrain} onChange={this.onChangeTrain} />
              </div>

              <div className="form-group">
                <label>Booking information details</label>
                <SimpleMDE options={mdConfig} value={this.state.bookingDetails} onChange={this.onChangeBookingInfoDetails} />
              </div>

              <div className="form-group">
                <label>Booking information link (must be full url). Leave blank if you want them to email you</label>
                <input type="text" className="form-control" value={this.state.bookingUrl} onChange={this.onChangeBookingInfoUrl}></input>
              </div>

              <div className="form-group">
                <label>What's included in the cost. <strong>Separate all values by commas.</strong> Eg food, wine, car parking, pringles</label>
                <input type="text" className="form-control" value={this.state.whatsIncluded} onChange={this.onChangeWhatIncluded}></input>
              </div>

              <p><strong>First image is the image that will be shown on mobile phones</strong></p>

              <div className="form-group">
                <label>Upload Footer Images:</label>
                 <input type="file" position="0" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                 <input type="file" position="1" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                 <input type="file" position="2" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
              </div>

              <p><strong>First image is the image that will be shown on mobile phones</strong></p>

              <div className="form-group">
                <label>Upload Food Images:</label>
                <input type="file" position="3" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="4" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="5" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
              </div>

              <div className="form-group">
                <label>Upload Landscape Images:</label>
                <input type="file" position="6" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
              </div>

              <p><strong>First image is the image that will be shown on mobile phones</strong></p>

              <div className="form-group">
                <label>Upload Accommodation Images:</label>
                <input type="file" position="7" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="8" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="9" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
              </div>

              <p><strong>First image is the image that will be shown on mobile phones</strong></p>

              <div className="form-group">
                <label>Upload Retreat Images:</label>
                <input type="file" position="10" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="11" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
                <input type="file" position="12" name="retreatImages" className="block" onChange={this.onChangeRetreatImage}/>
              </div>
              {this.showPopUp()}
              <div className="form-group">
                <input type="submit" value="Create retreat" className="btn btn-primary"></input>
              </div>
            </form>
        </div>
      </div>
    )
  }
}
