import React, { Component } from 'react';
import axios from 'axios';
import { firstBy } from 'thenby';

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
    axios.get('/lessons')
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

    axios.delete('/lessons/delete/'+ id, { headers : { Authorization: `Bearer ${token}`}})
      .then(res =>{
        console.log('Lesson Deleted',id);
      })
      .catch(function(err){
        console.log('errror deleting lesson', err);
      })

      window.location.reload();
  }


  mondayClasses(){
    console.log('state', this.state);
    var monday = this.state.lessons.filter(function(data, i){
      return data.dayOfTheWeek === 'Monday'
    })

    monday.sort((a,b) => {
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
    tuesday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

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
    wednesday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

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
    thursday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

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
    friday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

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
    saturday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

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
    sunday.sort(
      firstBy(function(a,b){ return a.startTimeOfDay - b.startTimeOfDay })
      .thenBy(function(x,y){ return x.startHour - y.startHour })
    )

    return sunday.map(function(data, i){
      let iteration = i;
      return (<Lesson lesson={data} count={iteration} key={i} deleteLesson={this.deleteLesson}></Lesson>)
    }.bind(this))
  }

  render(){
    return (
      <div>
        <div>
          <div className="animated fadeIn delay-1s hero-info-img-classes">
            <div className="hero-landing-text-container">
              <p className="hero-img-text">Em Thomson</p>
              <p className="hero-img-subtext">Yoga teacher</p>
            </div>
          </div>
        </div>
        <div className="page-container mobile-container">
          <h3 className="page-heading">Class List</h3>
          <table className="table boarderless" style={{ marginTop : 20 }}>
            <thead>
              <tr>
                <th className="border-bottom-0 border-top-0">Day</th>
                <th className="border-bottom-0 border-top-0">Time</th>
                <th className="border-bottom-0 border-top-0">Location</th>
                <th className="border-bottom-0 border-top-0">Style</th>
                <th className="border-bottom-0 border-top-0"></th>
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
          <div className="row mt-5">
              <p className="mx-auto">Recorded zoom sessions available for viewing at your own leisure, priced at £5. Please email me to request one.</p>
          </div>
        </div>
        <Images page="lessons"></Images>

      </div>
    )
  }
}
