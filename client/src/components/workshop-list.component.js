import React , { Component } from 'react';
import axios from 'axios';

import Workshop from './workshop-overview.component';
import ShowWorkshop from './show-workshop.component';

import { s3env } from '../config';

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

  getS3Url = () => {
    return 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
  }

  listWorkshops(){
    if(this.state.workshops.length > 0){
      return this.state.workshops.map((workshop, i) => {
        return (
          <div onClick={() => this.toggleView(workshop)} key={i}>
            <Workshop workshop={workshop} s3url={this.getS3Url()} key={i}></Workshop>
          </div>
        )
      })
    }else{
      return <p style={{ 'marginTop' : 20, 'text-align' : 'center'}}>I currently don't have any workshops available for bookings, but check back again soon. I will be adding more in the near future.</p>
    }
  }

  workshopDetails(){
    return <ShowWorkshop workshop={this.state.workshop} s3url={this.getS3Url()} onClick={this.toggleView}></ShowWorkshop>
  }

  render(){

    if(this.state.loading){
      return <h2>Loading...</h2>
    }

    const urlPrefix = 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
    const heroImg = urlPrefix + "classes-hero.jpg";

    if(!this.state.showWorkshopDetails && !this.state.loading){
      return (
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-workshop" style={{"backgroundImage": `url(${heroImg})`}}>
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div>
            <h3 className="page-heading">Yoga workshops</h3>
            { this.listWorkshops() }
          </div>
        </div>
      )
    }

    if(this.state.showWorkshopDetails && !this.state.loading){
      return (
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-retreat" style={{"backgroundImage": `url(${heroImg})`}}>
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Emily Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
            { this.workshopDetails() }
        </div>
      )
    }
  }
}
