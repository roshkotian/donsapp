import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/public/Login';
import Register from './components/public/Register';
class App extends Component {
  render() {
    return (
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
    );
  }
}
export default App; 