import React, { Component } from 'react';
import axios from 'axios'

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePwd = this.onChangePwd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email : "",
      password : ""
    }
  }

  onChangeEmail(event){
    this.setState({
      email : event.target.value
    })
  }

  onChangePwd(event){
    this.setState({
      password : event.target.value
    })
  }

  onSubmit(event){
    //prevent default form logic
    event.preventDefault();

    const user = {
      email : this.state.email,
      password : this.state.password
    }

    axios.post('http://localhost:1234/user/login', user)
      .then(function(res){
        const token = res.data.token;
        localStorage.setItem('jwtToken', token)
      })
    this.props.history.push('/')
  }

  render(){
    return (
      <div>
        <div className="hero-info-img">
          <div className="hero-info-overlay"></div>
          <div className="hero-landing-text-container">
            <p className="hero-img-text">Em Thomson</p>
            <p className="hero-img-subtext">Yoga teacher</p>
          </div>
        </div>
        <div className="page-container">
          <h3>Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail}></input>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="text" className="form-control" value={this.state.password} onChange={this.onChangePwd}></input>
              </div>
              <div className="form-group">
                <input type="submit" value="Sign in" className="btn btn-primary"></input>
              </div>
            </form>
        </div>
      </div>
    )
  }
}
