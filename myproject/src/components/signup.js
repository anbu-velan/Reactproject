import React from 'react'
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  }from "react-router-dom";
  import { validateEmail,validatePwd } from './validation'
  import axios from 'axios';
  import swal from 'sweetalert';
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            re_password:'',
            nameError:false,
            lengthError:false,
            emailError:false,
            emailpatterError:false,
            passwordError:false,
            passwordpatternError:false ,
            conformpasswordError:false,
            conformpasswordError1:false,
        }
      // this.submitsignup=this.submitsignup.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.validateform=this.validateform.bind(this);
    }



    handlechange(event){
        const fieldName = event.target.name;
        var string_length = event.target.value;
        var result = string_length.length;
        if (fieldName == 'name'){
            if(event.target.value){
                this.setState({nameError:false})
            }else{
                this.setState({nameError:true})
            }
            if(result>=3){
                this.setState({lengthError:false})
            }else{
                this.setState({lengthError:true})
            }
            this.setState({name:event.target.value }) 
        }
        if (fieldName == 'email'){
            if(event.target.value){
                if(validateEmail(event.target.value) == 1){
                  this.setState({ emailpatterError:false})
                }else{
                  this.setState({ emailpatterError:true})
                }
                this.setState({ emailError:false,})
                }else{
                  this.setState({ emailError:true,emailpatterError:false})
                }
            this.setState({email:event.target.value })
        }
        if (fieldName == 'password'){
            
            if(event.target.value){
                if(validatePwd(event.target.value)!=null){
                    
                    
                    this.setState({ passwordpatternError:false})
                }
                else{
                    this.setState({passwordpatternError:true})
                    console.log("#####");
                }
                this.setState({passwordError:false})                
            }else{
                this.setState({passwordError:true, passwordpatternError:false})
            }
            this.setState({password:event.target.value })
        }
        if (fieldName == 're_password'){
             if(event.target.value){
                if(event.target.value === this.state.password ){
                    this.setState({ conformpasswordError1:false})
                }
                else{
                    this.setState({conformpasswordError1:true})
                }
                this.setState({conformpasswordError:false})   
             }
            this.setState({re_password:event.target.value })
        }
       
    
    }
    validateform(event){
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let re_password = this.state.re_password;
        if(name){
            this.setState({nameError:false})
        }else{
            this.setState({nameError:true})
        }
        if(email){
            this.setState({emailError:false})
        }else{
            this.setState({emailError:true})
        }
        if(password){
            this.setState({passwordError:false})
        }else{
            this.setState({passwordError:true})
        }
        if(re_password){
            this.setState({conformpasswordError:false})
        }else{
            this.setState({conformpasswordError:true})
        }
        var formData ={
            name:name,
            email:email,
            password:password,
            re_password:re_password
          }
  
            let test=this;
    
            axios({
                method:'post',
                url:'http://localhost:3001/api/register',
                data:formData,
              
              })
              .then(function (response) {
                console.log('---------response-----------------', response.data);
                if (response.data.status == 1) {
                    test.setState({ token: response.data.id })
                   
                   swal("Register successfully");
                } else {
                    swal(response.data.msg);
                }
            });
    }
    
    render()
    {
        
        return(
            <>
            
            <div className="main">

<section className="signup">
    
    <div className="container">
        <div className="signup-content">
       
                <h2 className="form-title">Create account</h2>
                <div className="form-group">
                    <input type="text" className="form-input" name="name" onChange={this.handlechange}  id="name" placeholder="Your Name"/>
                    {  this.state.nameError ?<span style={{color:'red'}}>Name Required</span>: ''}
                    {   this.state.lengthError ?<span style={{color:'red'}} > Min 3 character</span>:''}
                </div>
                <div className="form-group">
                    <input type="email" className="form-input" name="email" onChange={this.handlechange} id="email" placeholder="Your Email"/>
                    {  this.state.emailError ?<span style={{color:'red'}}>Email Required</span> : ''}
                    {  this.state.emailpatterError ?<span style={{color:'red'}}> Enter Valid Email </span>: ''}
                </div>
                <div className="form-group">
                    <input type="password" className="form-input" name="password" onChange={this.handlechange} id="password" placeholder="Password"/>
                    <span toggle="#password" ></span>
                    {  this.state.passwordError ?<span style={{color:'red'}}>Password Required</span>: ''}
                    {  this.state.passwordpatternError ?<span style={{color:'red'}}>Password should contain atleast 8 characters and one numeric </span>: ''}
                </div>
                <div className="form-group">
                    <input type="password" className="form-input" name="re_password" onChange={this.handlechange} id="re_password" placeholder="Repeat your password"/>
                    {  this.state.conformpasswordError ?<span style={{color:'red'}}>Password Required</span>: ''}
                    {  this.state.conformpasswordError1 ?<span style={{color:'red'}}>Password Does Not Match </span>: ''}
                </div>
                <div className="form-group">
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                </div>
                <div className="form-group">
                    <input type="button" name="submit" onClick={this.validateform} id="submit" className="form-submit" value="Sign up"/>
                </div>
            
            <p className="loginhere">
                Have already an account ?<Link to="/"><a href="#" className="loginhere-link">Login here</a></Link> 
            </p>
        </div>
    </div>
</section>

</div>

          
            
           
          
           
          </>
        )
    }
}
export default Signup;