import react from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";




class Welcome extends react.Component{
  constructor(props){
    super(props);
    this.state = {
        username:'',
        userpwd:'' ,
        token:''
    }
    this.submitlogin=this.submitlogout.bind(this);
    
}


submitlogout(){
  window.localStorage.clear();
  window.location = '/'
}
  
  render(){
   
    return(
      
      <div >
     <h1 >Welcome User</h1>
     <input type="submit" name="signin" id="signin" onClick={this.submitlogout}  value="Logout"/>
     
      </div>
      
     
    )

  }
}

export default Welcome;