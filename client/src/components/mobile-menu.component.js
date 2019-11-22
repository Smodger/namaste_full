import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateLesson from './create-lesson.component';
import EditLesson from './edit-lesson.component';
import EditRetreat from './edit-retreat.component';
import LessonList from './lesson-list.component';
import {About} from './about.component';
import {Contact} from './contact.component';
import Home from './home.component';
import CreateRetreat from './create-retreat.component';
import ListRetreats from './retreat-list.component';
import Signup from './signup.component'
import Login from './login.component'

export default class MobileMenu extends Component {

  constructor(props){
    super(props)

    this.state = {
      token : null
    }
  }

  componentWillMount(){
    const token = localStorage.hasOwnProperty('jwtToken');
    this.setState({
      token : token
    })
  }

  // isLoggedIn(){
  //   if(this.state.token){
  //     return (
  //       <div>
  //         <li><Link to='/create-retreat' className='navbar-brand'>Create Retreat</Link></li>
  //         <li><Link to='/create-lesson' className='navbar-brand'>Create Lesson</Link></li>
  //       </div>
  //     )
  //   }
  // }

  // <HashRouter>
  //   <div>
  //     <nav className="mobile-menu">
  //       <div className="header-logo"></div>
  //       <ul>
  //         <li><Link to='/' className='navbar-brand'>Home - MOBILE</Link></li>
  //         <li><Link to='/about' className='navbar-brand'>About Me - MOBILE</Link></li>
  //         <li><Link to='/lessons' className='navbar-brand'>Class schedule - MOBILE</Link></li>
  //         <li><Link to='/list-retreats' className='navbar-brand'>Retreats - MOBILE</Link></li>
  //         <li><Link to='/contact' className='navbar-brand'>Contact - MOBILE</Link></li>
  //         {this.isLoggedIn()}
  //         <li><Link to='/mobile-menu' className='hamburger'>Mobile menu</Link></li>
  //       </nav>
  //       </ul>
  //   </div>
  //
  //   <Route path="/" exact component={Home}></Route>
  //   <Route path="/lessons" component={LessonList}></Route>
  //   <Route path="/editLesson/:id" component={EditLesson}></Route>
  //   <Route path="/editRetreat/:id" component={EditRetreat}></Route>
  //   <Route path="/create-lesson" component={CreateLesson}></Route>
  //   <Route path="/about" component={About}></Route>
  //   <Route path="/contact" component={Contact}></Route>
  //   <Route path="/create-retreat" component={CreateRetreat}></Route>
  //   <Route path="/list-retreats" component={ListRetreats}></Route>
  //   <Route path="/signup" component={Signup}></Route>
  //   <Route path="/login" component={Login}></Route>
  //
  // </HashRouter>

  render(){
    return (
      <div className="mobile-menu">Hello World</div>
    )
  }
}
