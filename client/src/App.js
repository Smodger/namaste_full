import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/header.component';
import {MobileMenu} from './components/mobile-menu.component';
import {Backdrop} from './components/backdrop.component';

class App extends Component {
  constructor(props){
    super(props);

    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);

    this.state = {
      sideBarOpen : false
    }
  }

  menuClickHandler(){
    this.setState((prevState) => {
      return { sideBarOpen : !prevState.sideBarOpen }
    })
  }

  backdropClickHandler(){
    this.setState({
      sideBarOpen : false
    })
  }

  render(){

    let backdrop = null;

    if(this.state.sideBarOpen){
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <div>
        <Header menuClickHandler={this.menuClickHandler} />
        <MobileMenu className="sidebar" show={this.state.sideBarOpen}/>
        {backdrop}
      </div>

    );
  }
}

export default App;
