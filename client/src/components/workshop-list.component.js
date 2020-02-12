import React , { Component } from 'react';
import axios from 'axios';

import Workshop from './workshop-overview.component';
import ShowWorkshop from './show-workshop.component';

export default class ListWorkshops extends Component {
  constructor(props){
    super(props)

    this.state = {
      workshops : [],
      loading : true,
      showWorkshopDetails : false,
      workshop : null
    }
  }

  componentDidMount(){
    this.getWorkshops();
  }

  getWorkshops(){
    axios.get('/workshops')
    .then(res => {
      this.setState({
        workshops : res.data,
        loading : false
      });
    })
    .catch(err => {
      console.log("Error getting workshops from db : ", err);
    });
  }

  toggleView = (workshop) => {
    if(this.state.showWorkshopDetails){
      this.setState({
        showWorkshopDetails : false,
      })
    }

    if(!this.state.showWorkshopDetails){
      this.setState({
        showWorkshopDetails : true,
        workshop : workshop
      })
    }
  }

  listWorkshops(){
    if(this.state.workshops.length > 0){
      return this.state.workshops.map((workshop, i) => {
        return <Workshop workshop={workshop} key={i} onClick={(() => this.toggleView(workshop))}></Workshop>
      })
    }else{
      return <p style={{ 'marginTop' : 20, 'text-align' : 'center'}}>I currently don't have any workshops available for bookings, but check back again soon. I will be adding more in the near future.</p>
    }
  }

  workshopDetails(){
    return <ShowWorkshop workshop={this.state.workshop} onClick={this.toggleView}></ShowWorkshop>
  }

  render(){

    if(this.state.loading){
      return <h2>Loading...</h2>
    }

    if(!this.state.showWorkshopDetails && !this.state.loading){
      return (
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-workshop">
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div className="all-retreats-container">
            <h3 className="page-heading">Yoga workshops</h3>
            { this.listWorkshops() }
          </div>
        </div>
      )
    }

    if(this.state.showWorkshopDetails && !this.state.loading){
      return (
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-retreat">
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Emily Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div>
            { this.workshopDetails() }
          </div>
        </div>
      )
    }
  }
}
