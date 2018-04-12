import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Redirect } from 'react-router-dom'

import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'

import { identifyUser, logoutUser } from '../utils/helpers.js'
import AccountInfo from './AccountInfo'
import ManageUsers from './ManageUsers'

class MyAccount extends Component{

    state = {
        submenuValue: 0,
      };

    componentDidMount(){
        this.props.identifyUser()
    }
    
    handleChange = (event, submenuValue) => {
        this.setState({ submenuValue });
    };

    render(){
        const { classes } = this.props
        const { submenuValue } = this.state

        if (this.props.userState === undefined){
            return <Redirect to="/" />
        }

        const { userState } = this.props.userState

        if (userState === null){
            return null
        }

        return (
            <Grid container className={classes.container} spacing={0}>
                <div className={classes.submenu}>
                    <Tabs
                        value={this.state.submenuValue}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        >
                        <Tab label="Account Info" />
                        <Tab label="Content List" />
                        <Tab label="Manage Users" />
                    </Tabs>
                </div>
                <div className={classes.submenuContent}>
                    {submenuValue === 0 && <AccountInfo />}
                    {submenuValue === 1 && <h1>Item Three</h1>}
                    {submenuValue === 2 && <ManageUsers />}
                </div>
            </Grid>
        )
    }
}

const styles = theme => ({
    container:{
        display: 'flex',
        flexDirection: 'column'
    },
    submenu:{
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
    },
    submenuContent:{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        margin: theme.spacing.unit * 3,
    }
})

function mapStateToProps(state){
    return {
        userState: state.auth.userState
    }
}

function mapDispatchToProps(dispatch){
    return {
        identifyUser: () => dispatch(identifyUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyAccount))