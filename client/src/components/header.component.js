import React, { Component } from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateLesson from './create-lesson.component';
import EditLesson from './edit-lesson.component';
import EditRetreat from './edit-retreat.component';
import EditWorkshops from './edit-workshop.component';
import LessonList from './lesson-list.component';
import {About} from './about.component';
import {Contact} from './contact.component';
import Home from './home.component';
import CreateRetreat from './create-retreat.component';
import CreateWorkshop from './create-workshop.component';
import ListRetreats from './retreat-list.component';
import ListWorkshops from './workshop-list.component';
import {ToggleButton} from './menu-toggle.component';
import Signup from './signup.component';
import Login from './login.component';
import OnlineClasses from "./online-classes.component";

export default class Header extends Component {

  constructor(props){
    super(props)

    this.state = {
      token : null
    }
  }

  componentDidMount(){
    const token = localStorage.hasOwnProperty('jwtToken');
    this.setState({
      token : token
    })
  }

  isLoggedIn(){
    if(this.state.token){
      return (
        <div className="d-none d-md-inline-block">
          <Link to='/online-classes' className='navbar-brand '>Online Library</Link>
          <Link to='/create-retreat' className='navbar-brand '>Create Retreat</Link>
          <Link to='/create-lesson' className='navbar-brand '>Create Lesson</Link>
          <Link to='/create-workshop' className='navbar-brand '>Create Workshop</Link>
        </div>
      )
    }
  }

  render(){
    return (
      <HashRouter>
        <div>
            <nav className="navbar">
                <div className="header-logo"></div>
                <Link to='/' className='navbar-brand d-none d-md-inline-block'>Home</Link>
                <Link to='/about' className='navbar-brand d-none d-md-inline-block'>About Me</Link>
                <Link to='/lessons' className='navbar-brand d-none d-md-inline-block'>Class Schedule</Link>
                <Link to='/list-retreats' className='navbar-brand d-none d-md-inline-block'>Retreats</Link>
                <Link to='/list-workshops' className='navbar-brand d-none d-md-inline-block'>Workshops</Link>
                <Link to='/contact' className='navbar-brand d-none d-md-inline-block'>Contact</Link>
                {this.isLoggedIn()}
                <div className="hamburger d-inline-block d-md-none">
                    <ToggleButton click={this.props.menuClickHandler}/>
                </div>
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
        <Route path="/create-workshop" component={CreateWorkshop}></Route>
        <Route path="/list-retreats" component={ListRetreats}></Route>
        <Route path="/list-workshops" component={ListWorkshops}></Route>
        <Route path="/editWorkshop/:id" component={EditWorkshops}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/online-classes" component={OnlineClasses}></Route>

      </HashRouter>
    )
  }
}
