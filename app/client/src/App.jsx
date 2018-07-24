import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService/AuthService';
import withAuth from './components/AuthService/withAuth';
const Auth = new AuthService();

class App extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Dashboard Of Your Application</h1>
          <h2>Welcome : {this.props.user.username}</h2>
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>

        </div>
        <p className="App-intro">

         Design You home page better


        </p>
      </div>
    );
  }
}

export default withAuth(App);
