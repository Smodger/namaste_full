import React, { Component } from 'react';
import axios from 'axios';

import Lesson from './lesson.component'
import {Images} from './images.component'

export default class LessonList extends Component {

  constructor(props){
    super(props);

    this.deleteLesson = this.deleteLesson.bind(this);

    this.state = {
      lessons : []
    };
  }

  getLessons(){
    axios.get('http://localhost:1234/lessons')
      .then(res => {
        this.setState({ lessons : res.data});
      })
      .catch(function(err){
        console.log("error getting lessons", err);
      })
  }

  componentDidMount(){
    this.getLessons();
  }

  deleteLesson(id){
    const token = localStorage.getItem('jwtToken');

    axios.delete('http://localhost:1234/lessons/delete/'+ id, { headers : { Authorization: `Bearer ${token}`}})
      .then(res =>{
        console.log('Lesson Deleted',id);
      })
      .catch(function(err){
        console.log('errror deleting lesson', err);
      })

      window.location.reload();
  }


  mondayClasses(){
    var monday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Monday'
    })
    //sort by start hour to put earlier classes higher up the list
    monday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return monday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  tuesdayClasses(){
    var tuesday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Tuesday'
    })
    //sort by start hour to put earlier classes higher up the list
    tuesday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return tuesday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  wednesdayClasses(){
    var wednesday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Wednesday'
    })
    //sort by start hour to put earlier classes higher up the list
    wednesday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return wednesday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  thursdayClasses(){
    var thursday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Thursday'
    })
    //sort by start hour to put earlier classes higher up the list
    thursday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return thursday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  fridayClasses(){
    var friday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Friday'
    })
    //sort by start hour to put earlier classes higher up the list
    friday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return friday.map(function(data, i){
      let iteration = i;
      return(<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  saturdayClasses(){
    var saturday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Saturday'
    })
    //sort by start hour to put earlier classes higher up the list
    saturday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return saturday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  sundayClasses(){
    var sunday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Sunday'
    })
    //sort by start hour to put earlier classes higher up the list
    sunday.sort(function(a,b){
      return a.startHour - b.startHour
    })

    return sunday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  render(){
    return (
      <div>
        <div>
          <div className="hero-info-img">
            <div className="hero-info-overlay"></div>
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
        </div>
        <div className="page-container">
          <h3 className="page-heading">Class List</h3>
          <table className="table boarderless" style={{ marginTop : 20 }}>
            <thead>
              <tr>
                <th>Day of the Week</th>
                <th>Time</th>
                <th>Location</th>
                <th>Yoga Style</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.mondayClasses() }
              { this.tuesdayClasses() }
              { this.wednesdayClasses() }
              { this.thursdayClasses() }
              { this.fridayClasses() }
              { this.saturdayClasses() }
              { this.sundayClasses() }
            </tbody>
          </table>
        </div>
        <Images page="lessons"></Images>

      </div>
    )
  }
}
