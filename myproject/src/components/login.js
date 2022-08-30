import React from 'react';
import axios from 'axios';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
}from "react-router-dom";
import swal from 'sweetalert';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            userpwd:'' ,
            token:''
        }
        this.submitlogin=this.submitlogin.bind(this);
        this.handelchange=this.handelchange.bind(this);
    }
    submitlogin(){

        let username=this.state.username;
        let userpwd=this.state.userpwd;
        let formData={
            username:username,
            userpwd:userpwd,
        }
        let test=this;

        axios({
            method:'post',
            url:'http://localhost:3001/api/login',
            data:formData,
          
          })
          .then(function (response) {
            console.log('---------response-----------------', response.data);
            if (response.data.status == 1) {
                test.setState({ token: response.data.id })
                localStorage.setItem('authToken', response.data.id)
                window.location = '/'
            } else {
                swal(response.data.msg);
            }
        });
          
    }
    handelchange(event){
        let name=event.target.name;
        let value=event.target.value;
        
        if(name=='username'){
            this.setState({username:value})
        }
        if(name=='userpwd'){
            this.setState({userpwd:value})
        }
    }
    render()
    {
        return( 
            
            <>
          <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Login </h2>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-md-flex">
						<div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div className="text w-100">
								<h2>Welcome to login</h2>
								<p>Don't have an account?</p>
								<Link to="/signup"><a href="#" className="btn btn-white btn-outline-white">Sign Up</a></Link>
							</div>
			      </div>
						<div className="login-wrap p-4 p-lg-5">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Sign In</h3>
			      		</div>
								<div className="w-100">
									<p className="social-media d-flex justify-content-end">
										
									</p>
								</div>
			      	</div>
							<form action="#" className="signin-form">
			      		<div className="form-group mb-3">
			      			<label className="label" htmlFor="name">Username</label>
			      			<input type="text" className="form-control" name="username" onChange={this.handelchange} placeholder="Username" required/>
			      		</div>
		            <div className="form-group mb-3">
		            	<label className="label" htmlFor="password">Password</label>
		              <input type="password" className="form-control" onChange={this.handelchange} name="userpwd" placeholder="Password" required/>
		            </div>
		            <div className="form-group">
		            	<button type="submit" onClick={this.submitlogin} className="form-control btn btn-primary submit px-3">Sign In</button>
		            </div>
		            <div className="form-group d-md-flex">
		            	<div className="w-50 text-left">
			            	<label className="checkbox-wrap checkbox-primary mb-0">Remember Me
									  <input type="checkbox" checked/>
									  <span className="checkmark"></span>
										</label>
									</div>
									<div className="w-50 text-md-right">
										<a href="#">Forgot Password</a>
									</div>
		            </div>
		          </form>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
            </>
            
          
          
        )
    }
}
export default Login;