import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './components/auth/Auth';
import AuthContext from './context/auth-context';
import Homepage from './components/Homepage';

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId, flag: 1 });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <main className="main-content">
              <Switch>
                {this.state.userId && <Redirect from="/" to="/homepage" exact/>}
                {this.state.userId && (<Redirect from="/auth" to="/homepage" exact/>)}
                {!this.state.userId && (<Route path="/auth" component={AuthPage}/>)}
                <Route path="/homepage" component={Homepage}/>
                {!this.state.token && <Redirect to="/auth" exact/>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;