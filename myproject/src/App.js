import react from 'react'
import Signup  from './components/signup';
import Login from './components/login';
import Welcome from './components/welcome';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";


class App extends react.Component{
  render(){
    let authToken = localStorage.getItem('authToken')
    return(
      <Router>
        {authToken ?
        <Switch>
      
        <Route exact path="/"><Welcome/></Route>
        </Switch>
        :
        <Switch>
        <Route exact path="/" ><Login/></Route>
      <Route exact path="/Signup"><Signup/></Route>
      </Switch>
      }
      
      </Router>
      
    )
  }
}

export default App;