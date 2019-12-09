import React from 'react';
import {Redirect} from 'react-router-dom'
import AuthContext from '../context/auth-context'

const Homepage = props => (
  <AuthContext.Consumer>
  {context => {
    return (
      <div className="homepage">
          <h1>Homepage</h1>
            {!context.token && (
                  <Redirect from="/homepage" to="/auth"/>
              )}
            {context.token && (
                  <button onClick={context.logout}>Logout</button>
            )}
      </div>
    );
  }}
</AuthContext.Consumer>
);

export default Homepage;