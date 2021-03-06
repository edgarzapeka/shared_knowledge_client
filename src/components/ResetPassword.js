import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Redirect } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Grid from 'material-ui/Grid'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog'

import { resetPassword } from '../utils/api'

class AccountInfo extends Component{

    constructor(props){
        super(props)

        this.submitResetPassword = this.submitResetPassword.bind(this)
        this.submitResetPassword = this.submitResetPassword.bind(this)
    }

    state = {
        password: '',
        confirmpassword: '',
        token: '',
        email: '',
        alertDialog: false
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            token: nextProps.match.params.token,
            email: nextProps.match.params.email
        })   
    }
    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitResetPassword = () => {
        const { email, token, confirmpassword, password } = this.state
        resetPassword(email, token, password, confirmpassword)
        this.setState({alertDialog: true, password: '', confirmpassword: ''})
    }

    render(){
        const { classes } = this.props

        console.log(this.state.token)

        return (
            <Grid container spacing={0} className={classes.container}>
                <Typography variant="display2" color="inherit" className={classes.rememberMeLabel}>
                    Reset Password
                </Typography>
                <TextField
                    id="registrationPassword"
                    label="New Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    onChange={this.handleChange('password')}
                />
                <TextField
                    label="Confirm Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    onChange={this.handleChange('confirmpassword')}
                />
                <Button color="primary" className={classes.button} onClick={this.submitResetPassword}>
                    Reset
                </Button>
                <Dialog
                    open={this.state.alertDialog}
                    onClose={() => this.setState({alertDialog: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Password Reset</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Password reset fulfilled successfully. Go to Login page and try it out!
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.setState({alertDialog: false})} color="primary">
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
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
})

function mapStateToProps(state){
    return {
        
    }
}

function mapDispatchToProps(dispatch){
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountInfo))