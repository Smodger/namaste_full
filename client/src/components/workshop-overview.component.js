import React , { Component } from 'react';

import workshopFooter from '../images/workshopFooter.jpg'

export default class WorkshopOverview extends Component {
  constructor(props){
    super(props)
    this.state = {
      workshop : props.workshop
    }
  }

  getWorkshopThumbnail = () => {
    if(this.state.workshop.image.length > 0){
      return (
        <img alt="workshop thumbnail" src={this.props.s3url + this.state.workshop.image[0]} style={{ "width" : 100+"%" }}></img>
      )
    }else{
      return (
        <img alt="workshop thumbnail" src={workshopFooter} style={{ "width" : 150 }}></img>
      )
    }
  }

  render(){
    return (

      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="row my-3">
              <div className="col-md-6 col-xs-12">
                {this.getWorkshopThumbnail()}
              </div>
              <div className="col-md-6 col-xs-12 mt-1 mt-md-0" style={{ "paddingBottom" : 10 }}>
                <p>{this.state.workshop.title}</p>
                <p>{this.state.workshop.date}</p>
                <p>{this.state.workshop.startHour}:{this.state.workshop.startMins} - {this.state.workshop.endHour}:{this.state.workshop.endMins}</p>
                <p>{this.state.workshop.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
