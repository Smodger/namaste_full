import React , { Component } from 'react';

export default class RetreatOverview extends Component {

  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      retreat : props.retreat
    }
  }

  getRetreatThumbmail(){
    if(this.state.retreat.retreatImages[6]){
      return (
        <img className="retreat-thumbnail" src={"http://localhost:1234/" + this.state.retreat.retreatImages[6]} alt="retreat overview"></img>
      )
    }else{
      const thumbnailURL = require("../images/yoga-retreat-stock.jpg");

      const thumbnailStyle = {
        "display": "inline-block",
        "width" : 300,
        "height" : 200,
        "backgroundImage" : 'url(' + thumbnailURL + ')',
        "backgroundSize": "contain",
        "backgroundPosition" : "center",
        "backgroundRepeat" : "no-repeat",
      }

      return (
        <div style={thumbnailStyle}></div>
      )
    }
  }

  render(){
    return (
      <div style={{ padding: 20, display: "inline-block"}} onClick={this.props.onClick}>
        {this.getRetreatThumbmail()}
        <div className="retreat-text">
          <p>{this.state.retreat.name}</p>
          <p>{this.state.retreat.dateStart} - {this.state.retreat.dateEnd}</p>
        </div>
      </div>
    )
  }
}
