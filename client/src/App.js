import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/header.component';
import {MobileMenu} from './components/mobile-menu.component';
import {Backdrop} from './components/backdrop.component';
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <title>Emily Yoga</title>
          <meta name="description" content="Yoga teacher based in South London available for private hire. Also teaches classes in Battersea and Tooting" />
        </Helmet>
        <Header menuClickHandler={this.menuClickHandler} />
        <MobileMenu className="sidebar" show={this.state.sideBarOpen}/>
        {backdrop}
      </div>

    );
  }
}

export default App;
