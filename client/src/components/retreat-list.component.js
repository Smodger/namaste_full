import React , { Component } from 'react';
import axios from 'axios';

import ShowRetreat from './show-retreat.component';
import Retreat from './retreat-overview.component';

import { s3env } from '../config'

export default class ListRetreats extends Component {
  constructor(props){
    super(props)

    this.toggleView = this.toggleView.bind(this);
    this.getS3Url = this.getS3Url.bind(this);


    this.state = {
      retreats : [],
      showRetreatDetails : false,
      retreatId : "",
      loading : true
    }
  }

  componentDidMount(){
    this.getRetreats();
  }

  getRetreats(){
    axios.get('/retreats')
      .then(res => {
        this.setState({
          retreats : res.data,
          loading : false
        });
      })
      .catch(function(err){
        console.log("error getting retreats", err);
      })
  }

  toggleView(retreat){
    if(this.state.showRetreatDetails){
      this.setState({
        showRetreatDetails : false,
        retreatId : ""
      })
    }

    if(!this.state.showRetreatDetails){
      this.setState({
        showRetreatDetails : true,
        retreat : retreat
      })
    }
  }

  getS3Url(){
    return 'https://s3-' + s3env.region + '.amazonaws.com/' + s3env.bucket + '/';
  }

  retreatList(){
    if(this.state.retreats.length > 0){
      return this.state.retreats.map(function(currentRetreat, i){
        return <Retreat s3url={this.getS3Url()} retreat={currentRetreat} key={i} onClick={(() => this.toggleView(currentRetreat))}></Retreat>
      }, this);
    }else {
      return <p style={{ 'marginTop' : 20, 'text-align' : 'center'}}>I currently don't have any retreats available for bookings, but check back again soon. I will be adding more in the near future.</p>
    }
  }

  retreatDetails(){
    return <ShowRetreat s3url={this.getS3Url()} retreat={this.state.retreat} onClick={this.toggleView}></ShowRetreat>
  }

  render(){

    if(this.state.loading){
      return <h2>Loading...</h2>
    }

    if(!this.state.showRetreatDetails && !this.state.loading){
      return (
        <div>
          <div className="hero-info-img-retreat">
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div className="all-retreats-container">
            <h3 className="page-heading">Yoga retreats</h3>
            { this.retreatList() }
          </div>
        </div>
      )
    }

    if(this.state.showRetreatDetails && !this.state.loading){
      return (
        <div>
          <div className="hero-info-img">
            <div className="hero-info-overlay"></div>
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Emily Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
          <div>
            { this.retreatDetails() }
          </div>
        </div>
      )
    }
  }
}
