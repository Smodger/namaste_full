import React , { Component } from 'react';
import axios from 'axios';

import ShowRetreat from './show-retreat.component';
import Retreat from './retreat-overview.component';

export default class ListRetreats extends Component {
  constructor(props){
    super(props)

    this.toggleView = this.toggleView.bind(this)

    this.state = {
      retreats : [],
      showRetreatDetails : false,
      retreatId : ""
    }
  }

  componentDidMount(){
    this.getRetreats();
  }

  getRetreats(){
    axios.get('http://localhost:1234/retreats')
      .then(res => {
        this.setState({ retreats : res.data});
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

  retreatList(){
    return this.state.retreats.map(function(currentRetreat, i){
      return <Retreat retreat={currentRetreat} key={i} onClick={(() => this.toggleView(currentRetreat))}></Retreat>
    }, this);
  }

  retreatDetails(){
    return <ShowRetreat  retreat={this.state.retreat} onClick={this.toggleView}></ShowRetreat>
  }

  render(){
    if(!this.state.showRetreatDetails){
      return (
        <div>
          <div className="hero-info-img">
            <div className="hero-info-overlay"></div>
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

    if(this.state.showRetreatDetails){
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
