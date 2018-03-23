import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import LinkList from './components/LinkList'
import CategoryList from './components/CategoryList'
import QuestionList from './components/QuestionList'
import { Link } from 'react-router-dom'
import Login from './components/Login';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/Menu/MenuItem'
import Menu from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'

import { identifyUser, logoutUser } from './utils/helpers.js'
import { withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    anchorEl: null
  }

  componentDidMount(){
    this.props.identifyUser()
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, userState, logoutUser } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <Grid container spacing={0} className={classes.root}>
        <div className={classes.header}>
          <AppBar position="static">
            <Toolbar>
            <Link to="/"><Typography variant="title" color="inherit" className={classes.menuItem}>
                Shared Knowledge
              </Typography></Link>

              <div className={classes.menuItems}>
                <Link to="/links"><Button color="inherit" className={classes.menuItem}>Links</Button></Link>
                <Link to="/categories"><Button color="inherit" className={classes.menuItem}>Categories</Button></Link>
                <Link to="/questions"><Button color="inherit" className={classes.menuItem}>Questions</Button></Link>
              </div>

              {(userState.isUserLogin)
                ? (<div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                  </Menu>
                </div>)
                : (<Link to="/login"><Button color="inherit" className={classes.menuItem}>Login</Button></Link>)}
            </Toolbar>
          </AppBar>
        </div> 

        <Route exact path="/" component={HomeScreen} />
        <Route  path="/links" component={LinkList} />
        <Route  path="/categories" component={CategoryList} />
        <Route  path="/questions" component={QuestionList} />
        <Route  path="/login" component={Login} />
      </Grid>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  header:{
    flexGrow: 1
  },
  flex: {
  },
  menuItems:{
    flex: 1,
  },
  menuItem:{
    color: '#FFFFFF',
  }
};

function mapStateToProps(state){
  return {
    userState: state.auth,
    links: state.links
  }
}

function mapDispatchToProps(dispatch){
  return {
    identifyUser: () => dispatch(identifyUser()),
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)))
