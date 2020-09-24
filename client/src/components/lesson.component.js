import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Lesson extends Component {

  constructor(props){
    super(props)

    this.state = {
      lesson : props.lesson,
      count : props.count,
      token : null
    }
  }

  componentWillMount(){
    const token = localStorage.hasOwnProperty('jwtToken')
    this.setState({
      token : token
    })
  }

  isLoggedIn(){
    if(this.state.token){
      return(
        <td>
          <Link className="mr-1" to={"/editLesson/" + this.state.lesson._id}>Edit</Link>
          <button className="btn btn-danger" onClick={this.handleDeleteLesson}>Delete</button>
        </td>
      )
    }
    else{
      return
    }
  }

  handleDeleteLesson = () => {
    this.props.deleteLesson(this.state.lesson._id)
  }

  getCorrectLink(){
    if(this.state.lesson.linkToStudio.charAt(0,1,2) === "w"){
      // for links starting with www
      return '//'+this.state.lesson.linkToStudio;
    }else {
      // for links starting with http(s)
      return this.state.lesson.linkToStudio;
    }
  }

  tootingInfo(){
    if(this.state.lesson.location === 'Tooting Bec Lido'){
      return (
        <td>
          {this.state.lesson.linkToStudio}
          <br></br>
          <br></br>
          <strong>{this.state.lesson.additionalInfo}</strong>
        </td>
      )
    }
    else{
      return <td></td>
    }
  }

  dayHeader(){
    if(this.state.count === 0){
      return <td>{this.state.lesson.dayOfTheWeek}</td>
    }
    else {
      return <td></td>
    }
  }

  showAdditionalInfo(){
    if(this.state.lesson.additionalInfo){
      return <td className="lesson-info">{this.state.lesson.additionalInfo}</td>
    }
  }

  getStartTime() {
    if(this.state.lesson.startHour > 12) {
      return this.state.lesson.startHour - 12 + ":" + this.state.lesson.startMinutes + "pm"
    }else if(this.state.lesson.startHour === 12) {
      return this.state.lesson.startHour + ":" + this.state.lesson.startMinutes + "pm"
    }else {
      return this.state.lesson.startHour + ":" + this.state.lesson.startMinutes + "am"
    }
  }

  getEndTime() {
    if(this.state.lesson.endHour > 12) {
      return this.state.lesson.endHour - 12 + ":" + this.state.lesson.endMinutes + "pm"
    }else if(this.state.lesson.endHour === 12) {
      return this.state.lesson.endHour + ":" + this.state.lesson.endMinutes + "pm"
    }else {
      return this.state.lesson.endHour + ":" + this.state.lesson.endMinutes + "am"
    }
  }

  render(){
    return (
      <tr>
        {this.dayHeader()}
        <td>
          {this.getStartTime()} - {this.getEndTime()}
        </td>
        <td><a className="hover-pink" href={this.getCorrectLink()} target="_blank" rel="noopener noreferrer">{this.state.lesson.location}</a></td>
        <td>{this.state.lesson.yogaStyle}</td>
        {this.tootingInfo()}
        {this.showAdditionalInfo()}
        {this.isLoggedIn()}
      </tr>
    )
  }
}
