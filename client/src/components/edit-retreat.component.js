import React, { Component } from 'react';
import axios from 'axios';
import Bedroom from './bedroom.component';


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
    // this.updateRetreatImage = this.updateRetreatImage.bind(this);
    this.onChangeBedDescription = this.onChangeBedDescription.bind(this);
    this.onChangeBedCost = this.onChangeBedCost.bind(this);
    this.onChangeBedBooking = this.onChangeBedBooking.bind(this);
    this.updateAccomodation = this.updateAccomodation.bind(this);
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
      whatsIncluded : []
      // retreatImages : []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:1234/retreats/'+this.props.match.params.id)
      .then(res => {
        console.log(res.data.dateStart, res.data.dateEnd);
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
          whatsIncluded : res.data.whatsIncluded
          // retreatImages : res.data.retreatImages
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
      retreatSummary : event.target.value
    })
  }
  updateFood(event){
    this.setState({
      food : event.target.value
    })
  }
  updateCar(event){
    this.setState({
      byCar : event.target.value
    })
  }
  updateTrain(event){
    this.setState({
      byTrain : event.target.value
    })
  }
  updateBookingInfoDetails(event){
    this.setState({
      bookingDetails : event.target.value
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
      accomodationOverview : event.target.value
    })
  }

  // updateRetreatImage(event){
  //   const newImage = [...this.state.retreatImages];
  //   newImage.push(event.target.files[0]);
  //
  //   this.setState({
  //     retreatImages : newImage
  //   })
  // }

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

  onSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');

    // if we allow update of images then will need to switch to FormData.set
    // and add multipart/form-data to headers
    const retreat = ({
      name : this.state.name,
      dateStart : this.state.dateStart,
      dateEnd : this.state.dateEnd,
      retreatSummary : this.state.retreatSummary,
      accomodationOverview : this.state.accomodationOverview,
      food : this.state.food,
      byCar : this.state.byCar,
      byTrain : this.state.byTrain,
      bookingDetails : this.state.bookingDetails,
      bookingUrl : this.state.bookingUrl,
      whatsIncluded : this.state.whatsIncluded,
      bedRooms : this.state.bedRooms
    })

    const headers = {
      Authorization : "Bearer " + token
    }

    axios.post('http://localhost:1234/retreats/update/' + this.props.match.params.id, retreat, { headers : headers })
      .then(res => console.log('data', res.data));

    this.props.history.push('/list-retreats')
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
                <input type="text" className="form-control" value={this.state.retreatSummary} onChange={this.updateRetreatSummary}></input>
              </div>

              <div className="form-group">
                <label>Accommodation Overview</label>
                <input type="text" className="form-control" value={this.state.accomodationOverview} onChange={this.updateAccomodation}></input>
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
                <input type="text" className="form-control" value={this.state.food} onChange={this.updateFood}></input>
              </div>

              <div className="form-group">
                <label>How to get there by Car</label>
                <input type="text" className="form-control" value={this.state.byCar} onChange={this.updateCar}></input>
              </div>

              <div className="form-group">
                <label>How to get there by public transport</label>
                <input type="text" className="form-control" value={this.state.byTrain} onChange={this.updateTrain}></input>
              </div>

              <div className="form-group">
                <label>Booking information details</label>
                <input type="text" className="form-control" value={this.state.bookingDetails} onChange={this.updateBookingInfoDetails}></input>
              </div>

              <div className="form-group">
                <label>Booking information link (must be full url). Leave blank if you want them to email you</label>
                <input type="text" className="form-control" value={this.state.bookingUrl} onChange={this.updateBookingInfoUrl}></input>
              </div>

              <div className="form-group">
                <label>What's included in the cost. <strong>Separate all values by commas.</strong> Eg food, wine, car parking, pringles</label>
                <input type="text" className="form-control" value={this.state.whatsIncluded} onChange={this.updateWhatIncluded}></input>
              </div>

              <div className="form-group">
                <label>Cannot update images</label>
              </div>

              <div className="form-group">
                <input type="submit" value="Update Retreat" className="btn btn-primary"></input>
              </div>

            </form>
        </div>
      </div>
    )
  }
}
