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

import { identifyUser} from '../utils/helpers.js'

import { updateUserAccount } from '../actions/'
import { saveUserDataLocally } from '../utils/helpers.js'

import { getPasswordResetLink } from '../utils/api.js'

class AccountInfo extends Component{

    constructor(props){
        super(props)

        this.submitUpdateAccount = this.submitUpdateAccount.bind(this)
        this.submitPasswordReset = this.submitPasswordReset.bind(this)
    }

    state = {
        name: '',
        email: '',
        phoneNumber: '6043466679',
        resetPasswordSent: false
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ resetPasswordSent: false });
    };

    componentDidMount(){
        this.props.identifyUser()
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.userState){
            this.setState({
                name: nextProps.auth.userState.name,
                email: nextProps.auth.userState.email
            })
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitUpdateAccount = () => {
        let userState = this.props.auth.userState
        const { name, email, phoneNumber } = this.state
        userState.name = name
        userState.email = email
        userState.phoneNumber = phoneNumber

        console.log(userState)

        this.props.updateUser(userState).then(saveUserDataLocally(userState))
    }

    submitPasswordReset = () => {
        const email  = this.props.auth.userState.email

        getPasswordResetLink(email)
        this.setState({resetPasswordSent: true})
    }

    render(){

        if (!this.props.auth.userState){
            return null
        }

        const { classes } = this.props

        const { auth } = this.props

        const phoneNumber = "6043466679" //change later

        if (auth.isUserFetched && auth.isUserLogin == false){
            return <Redirect to="/" />
        }

        return (
            <Paper elevation={4} className={classes.container}>
                <Typography variant="headline" className={classes.metaitem1}>User Name:</Typography>
                <Typography variant="headline" className={classes.metaitem2}>Email:</Typography>
                <Typography variant="headline" className={classes.metaitem3}>Phone Number: </Typography>
                <Typography variant="headline" className={classes.metaitem4}>Karma: {auth.userState.karma}</Typography>
                <Typography variant="headline" className={classes.metaitem5}>User Type: {auth.userState.userRole}</Typography>
                <TextField
                    label="User Name"
                    placeholder="User Name"
                    className={classes.userNameItem}
                    margin="normal"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                />
                <TextField
                    label="Email"
                    placeholder="Email"
                    className={classes.emailItem}
                    margin="normal"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                />
                 <TextField
                    label="Phone Number"
                    placeholder="Phone Number"
                    className={classes.phoneNumberItem}
                    margin="normal"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange('phoneNumber')}
                />
                <Button color="secondary" className={classes.passwordResetItem} onClick={this.submitPasswordReset}>
                    Password reset
                </Button>
                <Button className={classes.button} variant="raised" color="primary" onClick={this.submitUpdateAccount}>
                    Update
                    <Icon className={classes.rightIcon}>note</Icon>
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.resetPasswordSent}
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
                        onClick={() => this.setState({resetPasswordSent: false})}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </Paper>
        )
    }
}

const styles = theme => ({
    container:{
        display: 'grid',
        padding: '15px',
        margin: theme.spacing.unit * 3,
        width: '80%',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        justifyItems: 'center',
        alignItems: 'center'
    },
    metaitem1:{
        gridColumnStart: 1,
        gridRowStart: 1,
        alignSelf: 'center'
    },
    metaitem2:{
        gridColumnStart: 1,
        gridRowStart: 2
    },
    metaitem3:{
        gridColumnStart: 1,
        gridRowStart: 3
    },
    metaitem4:{
        gridColumnStart: 1,
        gridRowStart: 5
    },
    metaitem5:{
        gridColumnStart: 1,
        gridRowStart: 6
    },
    userNameItem:{
        gridColumnStart: 2,
        gridRowStart: 1
    },
    emailItem:{
        gridColumnStart: 2,
        gridRowStart: 2
    },
    phoneNumberItem:{
        gridColumnStart: 2,
        gridRowStart: 3
    },
    passwordResetItem:{
        gridColumnStart: 3,
        gridRowStart: 4
    },
    button: {
        gridColumnStart: 2,
        gridRowStart: 4,
        margin: theme.spacing.unit,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    }
})

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return {
        identifyUser: () => dispatch(identifyUser()),
        updateUser: (userState) => dispatch(updateUserAccount(userState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountInfo))