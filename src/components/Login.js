import React, { Component } from 'react'
import Grid  from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { login, register } from '../actions/'

class Login extends Component{

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
        this.submitRegistration = this.submitRegistration.bind(this)  
    }

    state ={
        rememberMe: true,
        loginEmail: '',
        loginPassword: '',
        registrationEmail: '',
        registrationPassword: '',
        registrationConfirmPassword: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitLogin(){
        const { loginEmail, loginPassword, rememberMe } = this.state

        const userData = {
            email: loginEmail,
            password: loginPassword,
            rememberMe: rememberMe
        }

        this.props.submitLogin(userData).then(() => {
            if (this.props.userState.isUserLogin){
                localStorage.setItem('token', this.props.userState.token)
                localStorage.setItem('secret', this.props.userState.secret)

            }
        }).then(() => console.log(this.props.userState))
    }

    submitRegistration(){
        const { registrationEmail, registrationPassword, registrationConfirmPassword } = this.state

        const userData = {
            email: registrationEmail,
            password: registrationPassword,
            confirmPassword: registrationConfirmPassword
        }

        console.log(registrationEmail)
        console.log(registrationPassword)
        console.log(registrationConfirmPassword)

        this.props.submitRegister(userData).then(() => console.log(this.props.userState))
    }

    render(){
        const { classes } = this.props
        const { rememberMe } = this.state
        const { userState } = this.props

        if (userState.isUserLogin === true){
            return (
                <Redirect to='/' />
            )
        }

        return (
            <Grid container spacing={0}>
                <Grid item md={6} className={classes.container}>
                        <Typography variant="display2" color="inherit" className={classes.rememberMeLabel}>
                            Sign In
                        </Typography>
                        <TextField
                            id="loginEmail"
                            label="Email"
                            className={classes.textField}
                            type="text"
                            value={this.state.loginEmail}
                            margin="normal"
                            onChange={this.handleChange('loginEmail')}
                        />
                        <TextField
                            id="loginPassword"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            margin="normal"
                            onChange={this.handleChange('loginPassword')}
                        />
                        <div className={classes.rememberMe}>
                            <Typography variant="subheading" color="inherit" className={classes.rememberMeLabel}>
                                Remember me
                            </Typography>
                            <Checkbox
                                checked={rememberMe}
                                onChange={() => this.setState({ rememberMe: !this.state.rememberMe })}
                                value="checkedA"
                            />
                        </div>
                        <Button color="primary" className={classes.button} onClick={this.submitLogin}>
                            Log In
                        </Button>
                </Grid>
                <Grid item md={6} className={classes.container}>
                    <Typography variant="display2" color="inherit" className={classes.rememberMeLabel}>
                        Sign Up
                    </Typography>
                    <TextField
                        id="registrationEmail"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        autoComplete="current-email"
                        margin="normal"
                        onChange={this.handleChange('registrationEmail')}
                    />
                    <TextField
                        id="registrationPassword"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('registrationPassword')}
                    />
                    <TextField
                        id="registrationConfirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('registrationConfirmPassword')}
                    />
                    <Button color="primary" className={classes.button} onClick={this.submitRegistration}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>            
        )
    }
}

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '5em'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    },
    rememberMe: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        display: 'flex',
        alignItems: 'space-between'
    },
    rememberMeLabel:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    menu: {
      width: 200,
    },
});

function mapStateToProps(state){
    return {
        userState: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return {
        submitLogin: (userData) => dispatch(login(userData)),
        submitRegister: (userData) => dispatch(register(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))