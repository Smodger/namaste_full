import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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

export default class Header extends Component {

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

  isLoggedIn(){
    if(this.state.token){
      return (
        <div>
          <Link to='/create-retreat' className='navbar-brand'>Create Retreat</Link>
          <Link to='/create-lesson' className='navbar-brand'>Create Lesson</Link>
        </div>
      )
    }
  }

  render(){
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg">
            <div className="header-logo"></div>
            <Link to='/' className='navbar-brand'>Home</Link>
            <Link to='/lessons' className='navbar-brand'>Class schedule</Link>
            <Link to='/about' className='navbar-brand'>About Me</Link>
            <Link to='/contact' className='navbar-brand'>Contact</Link>
            <Link to='/list-retreats' className='navbar-brand'>Retreats</Link>
            {this.isLoggedIn()}
          </nav>
        </div>

        <Route path="/" exact component={Home}></Route>
        <Route path="/lessons" component={LessonList}></Route>
        <Route path="/editLesson/:id" component={EditLesson}></Route>
        <Route path="/editRetreat/:id" component={EditRetreat}></Route>
        <Route path="/create-lesson" component={CreateLesson}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/create-retreat" component={CreateRetreat}></Route>
        <Route path="/list-retreats" component={ListRetreats}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>

      </Router>
    )
  }
}
