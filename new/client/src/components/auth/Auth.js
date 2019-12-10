import React, { Component } from 'react';
import AuthContext from '../../context/auth-context'
import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
    this.userNameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.confirmpasswordEl = React.createRef();

  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitLogin = event => {
    event.preventDefault();
    const userName = this.userNameEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(username:"${userName}",email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if(resData.data.login.token){
          this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }



  submitHandler = event => {
    event.preventDefault();
    const firstName = this.firstNameEl.current.value;
    const lastName = this.lastNameEl.current.value;
    const userName = this.userNameEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const confirmpassword = this.confirmpasswordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if(confirmpassword !== password){
      alert("Passwords dont match")
    }

    let requestBody = {
      query: `
        query {
          login(username:"${userName}",email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {firstName:"${firstName}",lastName:"${lastName}",username:"${userName}",email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if(resData.data.login.token){
          this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if(this.state.isLogin){
    return (
      <form className="auth-form" onSubmit={this.submitLogin}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="username" id="username" ref={this.userNameEl} />
        </div>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
    }else{
      return(
          <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
              <label htmlFor="first-name">First Name:</label>
              <input type="firstName" id="first-name" ref={this.firstNameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="last-name">Last Name:</label>
              <input type="lastName" id="last-name" ref={this.lastNameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input type="username" id="username" ref={this.userNameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-Mail</label>
              <input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-control">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type="confirm password" id="confirm password" ref={this.confirmpasswordEl} />
            </div>
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={this.switchModeHandler}>
                Switch to {this.state.isLogin ? 'Signup' : 'Login'}
              </button>
            </div>
          </form>
        );
    }
  }
}

export default AuthPage;
