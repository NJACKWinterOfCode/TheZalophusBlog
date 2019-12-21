import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './components/auth/Auth';
// import AuthContext from './context/auth-context';
import Homepage from './components/Homepage';
import CreateBlogForm from './components/blog/createBlogForm';
import CheckAuth from './components/auth/checkAuth';
import BlogDetails from './components/blog/blogDetails'

class App extends Component {
  state={
    isLoggedin:''
  }
  render() {
    CheckAuth()
    .then(()=>{
      this.setState({ isLoggedin:true })
    }).catch(()=>{ this.setState({ isLoggedin:false }) })
    return (
      <BrowserRouter>
        <React.Fragment>
            <main className="main-content">
              <Switch>
                <Route exact path="/" render={props=>(
                  this.state.isLoggedin===true ? <Redirect to="/home"/> : ( this.state.isLoggedin===false ? <AuthPage {...props} /> : null )  
                )} />
                <Route path="/home" render={props=>(
                  this.state.isLoggedin===true ? <Homepage {...props} /> : (this.state.isLoggedin===false ? <Redirect to="/" /> : null )
                )} />
                <Route path="/new" render={props=>(
                  this.state.isLoggedin===true ? <CreateBlogForm {...props} /> : (this.state.isLoggedin===false ? <Redirect to="/" /> : null)
                )} />
                <Route path="/blog/:blogId" render={props => (
                  this.state.isLoggedin === true ? <BlogDetails {...props} /> : (this.state.isLoggedin === false ? <Redirect to="/" /> : null)
                )} />
              </Switch>
            </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App; 