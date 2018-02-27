import React, { Component } from 'react';
import Header from './header';
import requireAuthentication from './auth/require_authentication';
import Feature from './feature';

import { Route } from 'react-router-dom';
import Signin from './auth/signin';
import SignUser from './auth/signUser';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" render={() => <div>Page Landing</div>} />
        <Route path="/signup" component={SignUser('up')} />
        <Route path="/signin" component={SignUser('in')} />
        <Route path="/feature" component={requireAuthentication(Feature)} />
      </div>
    );
  }
}
export default App;
