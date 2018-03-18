import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { Navbar, NavbarBrand, NavLink, NavItem, NavbarNav } from 'mdbreact'
import HomeScreen from './components/HomeScreen'
import LinkList from './components/LinkList'
import CategoryList from './components/CategoryList'
import QuestionList from './components/QuestionList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="purple" expand="md">
          <NavbarBrand href="/">
            <strong>Shared Knowledge</strong>
          </NavbarBrand>
          <NavbarNav left>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/links">Links</NavLink>
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
              <NavLink className="nav-link" to="/questions">Questions</NavLink>
          </NavbarNav>
          <NavbarNav right>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/registration">Registration</NavLink>
          </NavbarNav>
        </Navbar>
        <div className="container">
          <Route exact  path="/" component={HomeScreen}/>
          <Route exact path="/links" component={LinkList}/>
          <Route exact path="/categories" component={CategoryList}/>
          <Route exact path="/questions" component={QuestionList}/>
        </div>
      </div>
    );
  }
}

export default App;
