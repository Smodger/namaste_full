import React, { Component } from 'react';

export default class PopUp extends Component {

  constructor(props){
    super(props);
    this.displayPopUp = this.displayPopUp.bind(this);
    this.removePopUp = this.removePopUp.bind(this);
    this.timerFunc = this.timerFunc.bind(this);

    this.state = {
      text : null
    }
  }

  componentDidMount(){
    this.displayPopUp();
  }

  displayPopUp(){
    if(this.props.text){
      this.timerFunc()
      this.setState({
        text : this.props.text
      })
    }
  }

  timerFunc(){
    setTimeout(() => this.removePopUp(),2000)
  }

  removePopUp(){
    this.setState({
      text : null
    })
  }

  render(){
    if(this.state.text){
      return(<div className="popup"><p>{this.state.text.message}</p></div>)
    }else{
      return null
    }
  }
}
