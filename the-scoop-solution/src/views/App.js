import React, { Component } from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';

import ArticleList from './ArticleList';
import ArticleView from './ArticleView';
import User from './User';
import Scoop from '../utils/Scoop';

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUsername: '',
      currentUser: localStorage.getItem('currentUser') || ''
    };

    this.updateLogin = this.updateLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  updateLogin(event) {
    this.setState({loginUsername: event.target.value});
  }

  login() {
    if (!this.state.loginUsername) {
      return;
    } else {
      Scoop.createUser(this.state.loginUsername).then(user => {
        if (!user) {
          return;
        }
        localStorage.setItem('currentUser', user.username);
        this.setState({
          currentUser: user.username,
          loginUsername: ''
        });
      });
    }
  }

  logout() {
    localStorage.setItem('currentUser', '');
    this.setState({currentUser: ''});
  }

  renderLogin() {
    if (!this.state.currentUser) {
      return (
        <div className="login">
          <input onChange={this.updateLogin} placeholder="username"/>
          <a className="button" onClick={this.login}>LOGIN</a>
        </div>
      );
    } else {
      return (
        <div className="login">
          <Link to={"/users/" + this.state.currentUser} className="username">{this.state.currentUser}</Link>
          <a className="button" onClick={this.logout}>LOGOUT</a>
        </div>
      );
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to="/">
              <span className="small">THE</span>
              <span className="large">SCOOP</span>
            </Link>
            {this.renderLogin()}
          </header>
          <Route exact path="/" render={ props => (
            <ArticleList {...props} currentUser={this.state.currentUser} />
          )} />
          <Route path="/articles/:id" render={ props => (
            <ArticleView {...props} currentUser={this.state.currentUser} />
          )} />
          <Route path="/users/:username" render={ props => (
            <User {...props} currentUser={this.state.currentUser} />
          )} />
          <Route exact path="/login"/>
        </div>
      </Router>
    );
  }
}

export default App;
