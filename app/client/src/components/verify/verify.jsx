import React, { Component } from 'react';
import './verify.css'
class Verify extends Component {
    // define the constructor
    constructor(props){
        super(props);
        this.state={

        }
    }// end of constructor

    // define btn_verify 
    btn_verify(e){
        e.preventDefault();
        // console.log("You have clicked the verify button")
        // Grab the form data
        const form_data={
            otpString: this.refs.otpString.value
        };
        console.log(form_data);
        // make a http request for backend 
        var request = new Request('http://localhost:5000/verify',{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(form_data)
        });
        fetch(request)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("You have verified successfully");
                    // redirect to the another page
                    window.location.href='http://localhost:3000'
                }
                else{
                    console.log(json.message);
                }
            })
    }// end of btn_verify
    render() {
        return (
            <div className="center">
            <div className="card">
            <h1>Verify Your OTP</h1><br/>
                <form>
                    <input 
                    type="password" 
                    name="otpString" 
                    ref="otpString" 
                    className="form-ferify"
                    placeholder="an OTP has sent on your email ID"
                    required
                    />
                    <input 
                    type="button" 
                    value="Verify" 
                    className="verifyBtn"
                    onClick={this.btn_verify.bind(this)}
                    />
                </form>
            </div>
            </div>
        );
    }
}

export default Verify;