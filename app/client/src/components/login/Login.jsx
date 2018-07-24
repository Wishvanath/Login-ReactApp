import React, { Component } from 'react';
import './Login.css';
import skymapLogo from './skymapLogo.png';
import AuthService from '../AuthService/AuthService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <div className="loginLogo">
                        <img src={skymapLogo} className="logo" alt="logo" />
                    </div>
                    <form onSubmit={this.handleFormSubmit}>
                        <label htmlFor="userName">User Name:</label>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            required
                            onChange={this.handleChange}
                        />
                        <label htmlFor="userPassword">Password:</label>
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SIGN IN"
                            type="submit"
                        />
                        
                    </form>
                    <span><h4>New user? <a href="/signup">SignUp Here</a></h4></span>
                </div>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Login;