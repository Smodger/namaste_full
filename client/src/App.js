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
    console.log('menuClickHandlers');
    this.setState((prevState) => {
      return { sideBarOpen : !prevState.sideBarOpen }
    })
  }

  backdropClickHandler(){
    console.log('backdropClickHandler');
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
          <title>Em Thomson: South London Yoga Teacher, Best Tooting Classes</title>
          <meta name="description" content="Experienced teacher, weekly classes at Tooting Lido, Battersea and Balham, also available for private/corporate hire." />
          <meta name="keywords" content="yoga at tooting lido, yoga tooting bec, yoga tooting broadway, yoga tooting bec lido, yoga classes tooting broadway, yoga studio tooting bec, yoga classes tooting bec, yoga tooting common, yoga classes tooting, yoga classes tooting bec, yoga classes tooting leisure centre, yoga centre tooting, yoga tooting leisure centre, cheap yoga tooting, tooting gym yoga, yoga in tooting, yoga in tooting broadway, tooting yoga iyengar, yoga classes in tooting, hot yoga in tooting, yoga classes in tooting bec, iy yoga tooting timetable, yoga lessons in tooting, yoga tooting lido, yoga tooting leisure centre, revive yoga - tooting london, yoga classes tooting leisure centre, more yoga tooting, more yoga tooting bec, yoga near tooting, yoga near tooting bec, yoga nidra tooting, hot yoga near tooting, yoga classes near tooting, power yoga tooting"></meta>
        </Helmet>

        <Header menuClickHandler={this.menuClickHandler} />
        <MobileMenu className="sidebar" show={this.state.sideBarOpen}/>
        {backdrop}
      </div>

    );
  }
}

export default App;
