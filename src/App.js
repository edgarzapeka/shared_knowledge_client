import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import LinkList from './components/LinkList'
import CategoryList from './components/CategoryList'
import QuestionList from './components/QuestionList'
import { Link } from 'react-router-dom'
import Login from './components/Login';
import LinkView from './components/LinkView'
import { connect } from 'react-redux'
import CategoryContent from './components/CategoryContent'
import MyAccount from './components/MyAccount'
import ResetPassword from './components/ResetPassword'

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

import { addLink, getAllLinks, getAllLinkComments, getAllCategories } from './actions/'

class App extends Component {

  constructor(props){
    super(props)

    this.handleClose = this.handleClose.bind(this)
}

  state = {
    anchorEl: null
  }

  componentDidMount(){
    this.props.identifyUser()
    this.props.getAllLinks()
    this.props.getAllLinkComments()
    this.props.getAllCategories()
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  myAccount = () => {
    this.props.history.push('/myaccount')
    this.handleClose()
  }

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
                  <Menu className={classes.openMenu}
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
                    <MenuItem onClick={this.myAccount}>My account</MenuItem>
                    <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                  </Menu>
                </div>)
                : (<Link to="/login"><Button color="inherit" className={classes.menuItem}>Login</Button></Link>)}
            </Toolbar>
          </AppBar>
        </div> 

        <Route exact path="/" component={HomeScreen} />
        <Route exact  path="/links" component={LinkList} />
        <Route exact path="/categories" component={CategoryList} />
        <Route exact path="/questions" component={QuestionList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/myaccount" component={MyAccount} />
        <Route path="/resetpassword/:email?/:token?"  component={ResetPassword} />
        <Route exact path="/links/:id" render={ ({match}) => (
          <LinkView id={match.params.id} />
        )} />
        <Route exact path='/categories/:category' render={ ({match}) => (
          <CategoryContent category={match.params.category} />
        )} />
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
  },
  openMenu:{
    position: 'absolute'
  }
};

function mapStateToProps(state){
  return {
    userState: state.auth,
    links: state.links,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    identifyUser: () => dispatch(identifyUser()),
    logoutUser: () => dispatch(logoutUser()),
    getAllLinks: () => dispatch(getAllLinks()),
    getAllLinkComments: () => dispatch(getAllLinkComments()),
    getAllCategories: () => dispatch(getAllCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)))
