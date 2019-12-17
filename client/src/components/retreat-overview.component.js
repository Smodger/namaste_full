import React , { Component } from 'react';
import moment from 'moment';

export default class RetreatOverview extends Component {

  constructor(props){
    super(props)

    this.state = {
      retreat : props.retreat
    }
  }

  getRetreatThumbmail(){
    if(this.props.retreat.retreatImages[6]){
      return (
        <img className="retreat-thumbnail" src={this.props.s3url + this.props.retreat.retreatImages[6]} alt="retreat overview"></img>
      )
    }else{
      const thumbnailURL = require("../images/yoga-retreat-stock.jpg");

      const thumbnailStyle = {
        "display": "inline-block",
        "width" : 300,
        "height" : 200,
        "backgroundImage" : 'url(' + thumbnailURL + ')',
        "backgroundSize": "cover",
        "backgroundPosition" : "center",
        "backgroundRepeat" : "no-repeat"
      }

      return (
        <div style={thumbnailStyle}></div>
      )
    }
  }

  formatRetreatDates(){
    if(this.state.retreat.dateStart){
      var formattedDateStart = moment(new Date(this.state.retreat.dateStart)).format("MMMM Do YYYY")
    }

    if(this.state.retreat.dateEnd){
      var formattedDateEnd = moment(new Date(this.state.retreat.dateEnd)).format("MMMM Do YYYY")
    }

    return (
      <p>{formattedDateStart} - {formattedDateEnd}</p>
    )
  }

  render(){
    return (
      <div style={{ padding: 20, display: "inline-block"}} onClick={this.props.onClick}>
        {this.getRetreatThumbmail()}
        <div className="retreat-text">
          <div>
            <p>{this.state.retreat.name}</p>
            {this.formatRetreatDates()}
          </div>
        </div>
      </div>
    )
  }
}
