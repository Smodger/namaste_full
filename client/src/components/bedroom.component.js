import React, { Component } from 'react';

export default class Bedroom extends Component {
  constructor(props){
    super(props)
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    this.handleOnChangeCost = this.handleOnChangeCost.bind(this);
    this.handleOnChangeBooked = this.handleOnChangeBooked.bind(this);
  }

  handleOnChangeDescription = (event) => {;
    this.props.onChangeBedDescription(event.target.value)
  }

  handleOnChangeCost = (event) => {
    this.props.onChangeBedCost(event.target.value)
  }

  handleOnChangeBooked = (event) => {
    this.props.onChangeBedBooking(event.target.checked)
  }

  render(){
    return (
      <div>
        <div className="form-group">
          <h4>Bedroom {this.props.roomNum + 1}</h4>
          <label>Description</label>
          <input type="text" className="form-control" value={this.props.room.description} onChange={this.handleOnChangeDescription} placeholder="description"></input>
        </div>

        <div className="form-group">
          <label>Cost</label>
          <input type="number" className="form-control" value={this.props.room.cost} onChange={this.handleOnChangeCost}></input>
        </div>

        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id={this.props.checkboxId} value={this.props.room.booked}  onClick={this.handleOnChangeBooked}/>
          <label className="custom-control-label" htmlFor={this.props.checkboxId}>Booked</label>
        </div>
        <div className="separator-long"></div>
      </div>
    )
  }
}
