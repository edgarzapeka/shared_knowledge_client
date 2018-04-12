import React, { Component } from 'react'
import Grid  from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Modal from 'material-ui/Modal'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { login, register } from '../actions/'
import { saveUserDataLocally } from '../utils/helpers'
import { getPasswordResetLink } from '../utils/api.js'

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog'

class Login extends Component{

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
        this.submitRegistration = this.submitRegistration.bind(this) 
        this.submitResetPassword = this.submitResetPassword.bind(this)  
    }

    state ={
        rememberMe: true,
        loginEmail: '',
        loginPassword: '',
        registrationEmail: '',
        registrationPassword: '',
        registrationConfirmPassword: '',
        passwordResetModal: false,
        passwordResetSuccess: false,
        passwordResetEmail: '',
        alertDialogLogin: false,
        alertDialogRegister: false
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ passwordResetSuccess: false });
    };

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
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
                saveUserDataLocally({
                    token: this.props.userState.userState.token,
                    secret: this.props.userState.userState.secret,
                    id: this.props.userState.userState.id,
                    karma: this.props.userState.userState.karma,
                    name: this.props.userState.userState.name,
                    email: this.props.userState.userState.email,
                    userRole: this.props.userState.userState.userRole
                })
            }else{
                this.setState({alertDialogLogin: true})
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

        this.props.submitRegister(userData).then(() => {
            if (!this.props.userState.isUserLogin){
                this.setState({alertDialogRegister: true})
            }
            console.log(this.props.userState)
        })
    }

    submitResetPassword = () => {
        const email = this.state.passwordResetEmail

        getPasswordResetLink(email)
        this.setState({passwordResetModal: false, passwordResetSuccess: true})
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
                        <Button color="primary" className={classes.button} onClick={() => this.setState({passwordResetModal: true})}>
                            Forgot your password?
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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.passwordResetModal}
                    onClose={() => this.setState({passwordResetModal: false})}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Type your email and we'll send yout link for password reset
                        </Typography>

                        <TextField
                                label="Type your email"
                                placeholder="Email"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('passwordResetEmail')}
                        />
                        <Button color="primary" className={classes.buttonModal} onClick={this.submitResetPassword}>
                            Reset Password
                        </Button>
                    </div>
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.passwordResetSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                    SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Check your email. Link to password resend is sent.</span>}
                    action={[,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => this.setState({passwordResetSuccess: false})}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
                <Dialog
                    open={this.state.alertDialogLogin}
                    onClose={() => this.setState({alertDialogLogin: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Login Failed</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The email or password you typed are wrong. Try again
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.setState({alertDialogLogin: false})} color="primary">
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.alertDialogRegister}
                    onClose={() => this.setState({alertDialogRegister: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Registration Failed</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The email or passwords you typed are wrong. Try again
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.setState({alertDialogRegister: false})} color="primary">
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
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
    buttonModal: {
        margin: theme.spacing.unit,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
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