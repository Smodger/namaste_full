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
          <Link to={"/editLesson/" + this.state.lesson._id}>Edit</Link>
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
      return <td>{this.state.lesson.additionalInfo}</td>
    }
  }

  render(){
    return (
      <tr>
        {this.dayHeader()}
        <td>{this.state.lesson.startHour} : {this.state.lesson.startMinutes}</td>
        <td><a className="hover-pink" href={'//'+this.state.lesson.linkToStudio} target="_blank" rel="noopener noreferrer">{this.state.lesson.location}</a></td>
        <td>{this.state.lesson.yogaStyle}</td>
        {this.tootingInfo()}
        {this.showAdditionalInfo()}
        {this.isLoggedIn()}
      </tr>
    )
  }
}
