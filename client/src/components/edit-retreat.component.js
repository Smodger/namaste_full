import React, { Component } from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import moment from 'moment';

import Bedroom from './bedroom.component';
import PopUp from './popup.component';
import EditImages from './edit-images.component'

export default class EditRetreat extends Component {

  constructor(props){
    super(props)

    this.updateName = this.updateName.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updateRetreatSummary = this.updateRetreatSummary.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.updateTrain = this.updateTrain.bind(this);
    this.updateBookingInfoDetails = this.updateBookingInfoDetails.bind(this);
    this.updateBookingInfoUrl = this.updateBookingInfoUrl.bind(this);
    this.updateWhatIncluded = this.updateWhatIncluded.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.storeImageIndex = this.storeImageIndex.bind(this)
    this.onChangeBedDescription = this.onChangeBedDescription.bind(this);
    this.onChangeBedCost = this.onChangeBedCost.bind(this);
    this.onChangeBedBooking = this.onChangeBedBooking.bind(this);
    this.updateAccomodation = this.updateAccomodation.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.appendBedroom = this.appendBedroom.bind(this);
    this.renderBedroom = this.renderBedroom.bind(this);

    this.state= {
      name : "",
      dateStart : "",
      dateEnd : "",
      retreatSummary : "",
      accomodationOverview : "",
      bedRooms : [],
      food : "",
      byCar : "",
      byTrain : "",
      bookingDetails : "",
      bookingUrl : "",
      whatsIncluded : [],
      popUpMsg : null,
      retreatImages : [],
      newImage: null,
      imageIndex : null
    }
  }

  componentWillMount(){
    axios.get('/retreats/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          name : res.data.name,
          dateStart : res.data.dateStart,
          dateEnd : res.data.dateEnd,
          retreatSummary : res.data.retreatSummary,
          accomodationOverview : res.data.accomodationOverview,
          bedRooms : res.data.bedRooms,
          food : res.data.food,
          byCar : res.data.byCar,
          byTrain : res.data.byTrain,
          bookingDetails : res.data.bookingDetails,
          bookingUrl : res.data.bookingUrl,
          whatsIncluded : res.data.whatsIncluded,
          retreatImages : res.data.retreatImages
        })
      })
      .catch(function(err){
        console.log('error getting lesson : ', err);
      })
  }

  updateName(event){
    this.setState({
      name : event.target.value
    })
  }
  updateStartDate(event){
    this.setState({
      dateStart : event.target.value
    })
  }
  updateEndDate(event){
    this.setState({
      dateEnd : event.target.value
    })
  }
  updateRetreatSummary(event){
    this.setState({
      retreatSummary : event
    })
  }
  updateFood(event){
    this.setState({
      food : event
    })
  }
  updateCar(event){
    this.setState({
      byCar : event
    })
  }
  updateTrain(event){
    this.setState({
      byTrain : event
    })
  }
  updateBookingInfoDetails(event){
    this.setState({
      bookingDetails : event
    })
  }
  updateBookingInfoUrl(event){
    this.setState({
      bookingUrl : event.target.value
    })
  }
  updateWhatIncluded(event){
    this.setState({
      whatsIncluded : event.target.value
    })
  }

  updateAccomodation(event){
    this.setState({
      accomodationOverview : event
    })
  }

  // function to store image in state
  storeImageIndex(image){
    this.setState({
      imageIndex : image.index
    })
  }

  onChangeImg(event){
    this.setState({newImage : event.target.files[0]});
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
    event.preventDefault();
    // if we allow update of images then will need to switch to FormData.set
    // and add multipart/form-data to headers

    const formData = new FormData()
    formData.append('imageIndex', this.state.imageIndex);
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
    };

    const token = localStorage.getItem('jwtToken');

    // set headers to pass as final argument in axios post
    const headers = {
      Authorization : "Bearer " + token,
      'Content-Type': 'multipart/form-data'
    }
    formData.append('newImage', this.state.newImage);

    axios.post('/retreats/update/' + this.props.match.params.id, formData, {
      headers : headers
    })
      .then(res => {
        const response = res.data
        return response
      })
      .then(response => {
        this.setState({
          popUpMsg : response
        })
      })
  }

  render(){
    const mdConfig = {
      hideIcons : ['image', 'link', 'table']
    }

    if(this.state.retreatImages.length <= 0 ){
      return <h4>Loading...</h4>
    }else{
      return (
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-retreat">
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div className="page-container">
            <h3>Edit a retreat</h3>
              <form onSubmit={this.onSubmit} encType="multipart/form-data">

                <div className="form-group">
                  <label>Retreat Name</label>
                  <input type="text" className="form-control" value={this.state.name} onChange={this.updateName}></input>
                </div>

                <div className="form-group">
                  <label>Start Date eg(14/09/1988)</label>
                  <input type="date" className="form-control" value={this.state.dateStart} onChange={this.updateStartDate}></input>
                </div>

                <div className="form-group">
                  <label>End Date eg(22/04/1990)</label>
                  <input type="date" className="form-control" value={this.state.dateEnd} onChange={this.updateEndDate}></input>
                </div>

                <div className="form-group">
                  <label>Retreat summary</label>
                  <SimpleMDE options={mdConfig} onChange={this.updateRetreatSummary} value={this.state.retreatSummary} />
                </div>

                <div className="form-group">
                  <label>Accommodation Overview</label>
                  <SimpleMDE options={mdConfig} value={this.state.accomodationOverview} onChange={this.updateAccomodation}></SimpleMDE>
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
                  <SimpleMDE options={mdConfig} value={this.state.food} onChange={this.updateFood}></SimpleMDE>
                </div>

                <div className="form-group">
                  <label>How to get there by Car</label>
                  <SimpleMDE options={mdConfig} value={this.state.byCar} onChange={this.updateCar}></SimpleMDE>
                </div>

                <div className="form-group">
                  <label>How to get there by public transport</label>
                  <SimpleMDE options={mdConfig} value={this.state.byTrain} onChange={this.updateTrain}></SimpleMDE>
                </div>

                <div className="form-group">
                  <label>Booking information details</label>
                  <SimpleMDE options={mdConfig} value={this.state.bookingDetails} onChange={this.updateBookingInfoDetails}></SimpleMDE>
                </div>

                <div className="form-group">
                  <label>Booking information link (must be full url). Leave blank if you want them to email you</label>
                  <input type="text" className="form-control" value={this.state.bookingUrl} onChange={this.updateBookingInfoUrl}></input>
                </div>

                <div className="form-group">
                  <label>What's included in the cost. <strong>Separate all values by commas.</strong> Eg food, wine, car parking, pringles</label>
                  <input type="text" className="form-control" value={this.state.whatsIncluded} onChange={this.updateWhatIncluded}></input>
                </div>

                <div className="separator-long"></div>
                <p><strong>CLICK IMAGE YOU WANT TO REPLACE, SCROLL TO BOTTOM OF SCREEN AND THERE IS A FILE UPLOAD BUTTON. UPLOAD FILE AND CLICK UPDATE RETREAT</strong></p>
                <div className="separator-long"></div>

                <EditImages storeImageIndex={(img) => this.storeImageIndex(img)} onChangeImg={(e) => this.onChangeImg(e)} images={this.state.retreatImages}></EditImages>

                {this.showPopUp()}

                <div className="form-group">
                  <input type="submit" value="Update Retreat" className="btn btn-primary"></input>
                </div>
              </form>
          </div>
        </div>
      )
    }
  }
}
