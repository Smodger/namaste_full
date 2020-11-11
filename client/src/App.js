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
          <title>Em Thomson Yoga - Tooting & Battersea</title>
          <meta name="description" content="Yoga teacher based in South London available for private hire. Also teaches classes in Battersea and Tooting" />
          <meta name="keywords" content="yoga at tooting lido, yoga tooting bec, yoga tooting broadway, yoga tooting bec lido, yoga classes tooting broadway, yoga studio tooting bec, yoga classes tooting bec, yoga tooting common, yoga classes tooting, yoga classes tooting bec, yoga classes tooting leisure centre, yoga centre tooting, yoga tooting leisure centre, cheap yoga tooting, tooting gym yoga"></meta>
        </Helmet>

        <Header menuClickHandler={this.menuClickHandler} />
        <MobileMenu className="sidebar" show={this.state.sideBarOpen}/>
        {backdrop}
      </div>

    );
  }
}

export default App;
