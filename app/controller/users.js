// load require module
const db = require('../lib/pgcon');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports={
    newuser:function(req,res){
        // grab the react form data
        const{body} = req;
        const {
            userName,
            userDesignation,
            userPhone,
            userEmail,
            companyName,
            companyWebsite,
            companySize,
            userIndustry,
            userState,
            userDistrict,
            userTaluk,
            userPassword
        } = body;
        // write query to save in the database

        // check if user field is valid or not 
      if(!userName){
        return res.send({
          success: false,
          message: "Error: User Name cannot be blank"
        })
      }
      if(!userDesignation){
        return res.send({
          success: false,
          message: "Error: Designation cannot be blank"
        })
      }
      if(!userPhone){
        return res.send({
          success: false,
          message: "Error: Contact No cannot be blank"
        })
      }
      if(!userEmail){
        return res.send({
          success: false,
          message: "Error: Email cannot be blank"
        })
      }
      if(!companyName){
        return res.send({
          success: false,
          message: "Error: Company Name cannot be blank"
        })
      }
      if(!companyWebsite){
        return res.send({
          success: false,
          message: "Error: Company Website cannot be blank"
        })
      }
      if(!companySize){
        return res.send({
          success: false,
          message: "Error: Please select the company size"
        })
      }
      if(!userIndustry){
        return res.send({
          success: false,
          message: "Error: Industry Name cannot be blank"
        })
      }
      if(!userState){
        return res.send({
          success: false,
          message: "Error: Please select state name"
        })
      }
      if(!userDistrict){
        return res.send({
          success: false,
          message: "Error: Please select district name"
        })
      }
      if(!userTaluk){
        return res.send({
          success: false,
          message: "Error: Please Select Village"
        })
      }
      if(!userPassword){
        return res.send({
          success: false,
          message: "Error: Password cannot be empty"
        })
      }
      else{
        // generate random string
        const secret_tokens = randomstring.generate({
          length:5,
          charset: 'alphanumeric'
        })
        // hash the user password
         var hash_password = bcrypt.hashSync(`${userPassword}`,saltRounds);
        // write email function to send the otp
        function email(){
         var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            type: "OAuth2",
            user: "wishvapued@gmail.com",
            clientId: "766926008332-ej0hbj1uge4uvhrtqom8pidr20am0iqj.apps.googleusercontent.com",
            clientSecret: "7KgJOo84JjbvJ_pzPmXhWulA",
            refreshToken: "1/G2IWl2feXAXq6HTtjrMCZYBS8HcN0UDDytz52WaYnkQ" 
          }
        });
        // create mail options
        var mailOptions = {
          from: 'SkyMap Admin <wishvapued@gmail.com>',
          to: `${userEmail}`,
          subject: 'Verify Your OTP',
          text: 'some text',
          html: `<div style="
          height: 300px;
          width: 500px;
          border: 1px solid #eee;
          border-radius: 5px;
          background-color:#f1f1f1;
          color:black;
          padding: 30px;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
          text-align: center;
          " >
          <h2>Please Verify your OTP </h2><br>
          <div style="
          color: black;
          text-align: center;
          height: 60px;
          width: 200px;
          background-color: white;
          margin-left: 120px;
          padding: 10px;   
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
          ">
          <h2>${secret_tokens}</h2>
          </div><br>   
          <h3>Redirect to verify your OTP link:
              <a href="http://localhost:3000/verify">
                  Verify
              </a>
          </h3>
          
          </div>`
        };
        // now send the email
        transporter.sendMail(mailOptions, function(err, res){
          if(err){
            console.log(err);
          }else{
            console.log("Email sent successfully");
          }
        });
        }//end of email function

        // databse query
        const query ={
          text:`INSERT INTO public.signup(
            user_name, designation, phone_no, email, company_name, 
            company_website, company_size, industry_name, state_name, district_name, 
            taluk_name, user_pass, secret_tokens, status)
            VALUES ('${userName}', '${userDesignation}', '${userPhone}','${userEmail}' ,'${companyName}', '${companyWebsite}', '${companySize}', '${userIndustry}', '${userState}', '${userDistrict}', '${userTaluk}', '${hash_password}', '${secret_tokens}', 'notverified');`,
        };// end of query
        // run the query
        db.query(query,function(err,result){
          if(err){
            console.log(err)
          }
          else{
            email();
            return res.send({
              success: true,
              message: "You have successfully Registered Please Verify Your Email Address to login"
            })
            
          }
        });  
       
      } // end of db query
        
    },// end of newuser routes

        
    verifyuser:function(req, res){
        // grab the react form data
        const {body} = req;
        const {otpString} = body;
        if(!otpString){
            return res.send({
              success: false,
              message: "Error: Please Enter Your OTP"
            })
          }else if(otpString.length != 5 ){
            return res.send({
              success: false,
              message: "Error: OTP is not valid"
            })
          }
          else{
            // write query to change the status verified in the database
            const query = {
              text: `UPDATE signup SET status='verified' WHERE secret_tokens = '${otpString}' and status = 'notverified';`
            };
            db.query(query,function(err, result){
              if(err){
                console.log(err);
              }else{
                return res.send({
                  success: true,
                  message: "You have verified Your OTP and able to login"
                })
              }
            })
            
          }
    },// end of verify user


    login:function(req, res){
      const { username, password } = req.body;
      // check the proper field is valid or not 
      if(!username){
        return res.send({
          success: false,
          message: "Error: UserName cannot be empty"
        })
      }
      if(!password){
        return res.send({
          success: false,
          message: "Error: Password cannot be empty"
        })
      }
      else{
        
        // grab the oldhashpassword
        const query ={
          text:`SELECT user_pass from signup WHERE email = '${username}' and status = 'verified'`,
        }
        db.query(query,function(err, result){
          if(err){
            // console.log(err)
            res.send({
              success: false,
              message: "cannot fetch the data from the databse"
            })
          }else{
            if(result.rows.length == 0){
              return res.send({
                success: false,
                message: "User Name doesnot Exist"
              })
            }else{
                const old_password = result.rows[0].user_pass;
                // now match the current user id and password
                bcrypt.compare(password, old_password, function(err, doesMatch){
                  if(doesMatch){
                    //grab the current data from the database
                    const query = {
                      text:`SELECT * from signup WHERE email = '${username}'`
                    };
                    db.query(query,function(err, result){
                      if(err){
                        console.log(err)
                      }else{
                        const user_id = result.rows[0].user_id;
                        const user_name = result.rows[0].email;
                        let token = jwt.sign({ id:`${user_id}`, username: `${user_name}` }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
                        res.send({
                          success: true,
                          err:null,
                          token
                          
                        })
                      }
                    })
                    
                    
                  }else{
                    return res.send({
                      success: false,
                      message: "User Id and password is not matched"
                    })
                  }
                })
            }// end of main else
          }//end of if
        });// end of db query
    
 
   }

    }// end of login route

}//end of main module