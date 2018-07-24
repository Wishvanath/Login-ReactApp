import React, { Component } from 'react';
import './signup.css'
class Signup extends Component {
    // define constructor
    constructor(props){
        super(props);
        this.state={

        }
    }// end of constructor

    // define btn_submit
    btn_submit(e){
        e.preventDefault();
        // grab the form data
        const form_data ={
            userName: this.refs.userName.value,
            userDesignation: this.refs.userDesignation.value,
            userPhone: this.refs.userPhone.value,
            userEmail: this.refs.userEmail.value,
            companyName: this.refs.companyName.value,
            companyWebsite: this.refs.companyWebsite.value,
            companySize: this.refs.companySize.value,
            userIndustry: this.refs.userIndustry.value,
            userState: this.refs.userState.value,
            userDistrict: this.refs.userDistrict.value,
            userTaluk: this.refs.userTaluk.value,
            userPassword: this.refs.userPassword.value
        };
        // make a http request for the backend server
        var request = new Request('http://localhost:5000/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(form_data)
        });
        fetch(request)
            .then(res => res.json())
            .then(json =>{
                if(json.success){
                    console.log("You have successully Registered ")
                    // and redirect to the another page
                    window.location.href = 'http://localhost:3000/verify';
                }
                else{
                    console.log(json.message);
                }
            })

        // console.log(form_data);

    }// end of btn_submit

    render() {
        return (
         <div className="signupcenter">
            <div className="card">
            <h1>Sign Up</h1>
                <form>
                    <input
                    type="text"
                    name="userName"
                    ref="userName" 
                    placeholder="User Name:"
                    className="form-inline"
                    // required
                    />
                    <input 
                    type="text" 
                    name="userDesignation" 
                    ref="userDesignation" 
                    placeholder="Designation:"
                    className="form-inline"
                    // required
                    />
                    <input 
                    type="text"
                    name="userPhone"
                    ref="userPhone"
                    placeholder="Contact No:"
                    className="form-inline"
                    // required
                    maxLength={10}
                    />
                    <input 
                    type="email"
                    name="userEmail"
                    ref="userEmail"
                    placeholder= "Email address"
                    className="form-inline"
                    // required
                    />
                    <input 
                    type="text"
                    name="companyName"
                    ref="companyName"
                    placeholder="Company Name:"
                    className="form-inline"
                    />
                    <input 
                    type="text"
                    name="companyWebsite"
                    ref="companyWebsite"
                    placeholder="Company Website"
                    className="form-inline"
                    />
                    <select name="companySize" ref="companySize"  className="user_select">
                        <option value="">Select Company Size</option>
                        <option value="1-10 Employees">1-10 Employees</option>
                        <option value="10-50 Employees">10-50 Employees</option>
                        <option value="50-100 Employees">50-100 Employees</option>
                        <option value="100-200Employees">100-200Employees</option>
                    </select> 
                    <input 
                    type="text" 
                    name="userIndustry" 
                    ref="userIndustry"
                    className="form-inline"
                    placeholder="Your Industry"
                    />
                    <select name="userState" ref="userState" className="user_select">
                        <option value="">Select State</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Secunderabad">Secunderabad</option>
                    </select>
                    <select name="userDistrict" ref="userDistrict" className="user_select">
                        <option value="">Select District</option>
                        <option value="Dist1">Dist1</option>
                        <option value="Dist2">Dist2</option>
                    </select>
                    <select name="userTaluk" ref="userTaluk" className="user_select">
                        <option value="">Select Taluk</option>
                        <option value="Village1">Village1</option>
                        <option value="Village2">Village2</option>
                    </select>
                    <input 
                    type="password" 
                    name="userPassword" 
                    ref="userPassword"
                    className="form-inline"
                    placeholder="Password"
                    />
                    <input 
                    type="submit" 
                    name="btn_submit" 
                    value="Submit" 
                    className="signupBtn"
                    onClick={this.btn_submit.bind(this)}
                    />
                    
                </form>                   
            </div>
        </div>
           
        );
    }
}

export default Signup;