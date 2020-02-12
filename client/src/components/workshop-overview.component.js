import React , { Component } from 'react';
import moment from 'moment';


export default class WorkshopOverview extends Component {
  constructor(props){
    super(props)

    this.state = {
      workshop : props.workshop
    }
  }


  render(){
    return (
      <div style={{ padding: 20, display: "inline-block"}} onClick={this.props.onClick}>
        <img alt="workshop thumbnail"></img>
        <div className="retreat-text">
          <div>
            <p>{this.state.workshop.title}</p>
            <p>{this.state.workshop.date}</p>
            <p>{this.state.workshop.startHour}:{this.state.workshop.startMins} - {this.state.workshop.endHour}:{this.state.workshop.endMins}</p>
          </div>
        </div>
      </div>
    )
  }
}
