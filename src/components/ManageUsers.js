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
import Modal from 'material-ui/Modal'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import { changeUserRole } from '../actions/'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'

class ManageUsers extends Component{

    constructor(props){
        super(props)

        this.submitChangeUserRole = this.submitChangeUserRole.bind(this)
    }

    state = {
        userRoleUpdated: false,
        chagenUserRoleModal: false,
        newUserRole: 'User',
        selectedUserEmail: ''
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ resetPasswordSent: false });
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

    submitChangeUserRole = () => {
        const { selectedUserEmail, newUserRole } = this.state

        console.log(`Email: ${selectedUserEmail} Role: ${newUserRole}`)        

        this.props.changeRole(selectedUserEmail, newUserRole)
        this.setState({userRoleUpdated: true, chagenUserRoleModal: false})
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ userRoleUpdated: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(){

        const { classes } = this.props

        const { users } = this.props

        return (
            <Paper elevation={4} className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow >
                        <TableCell >Id</TableCell>
                        <TableCell >User Name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell numeric>Karma</TableCell>
                        <TableCell>User Role</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(u => {
                        return (
                        <TableRow key={u.id} >
                            <TableCell >{u.id}</TableCell>
                            <TableCell >{u.customUserName}</TableCell>
                            <TableCell >{u.email}</TableCell>
                            <TableCell numeric >{u.karma}</TableCell>
                            <TableCell >{u.userRole}</TableCell>
                            <TableCell>
                                <Button color="primary" className={classes.button} 
                                onClick={() => {
                                    let email = u.email
                                    this.setState({selectedUserEmail: email, chagenUserRoleModal: true})
                                    console.log(this.state.selectedUserEmail)
                                }}>
                                    Change User Role
                                </Button>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.chagenUserRoleModal}
                    onClose={() => this.setState({chagenUserRoleModal: false})}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Change User Role
                        </Typography>

                        <FormControl className={classes.formControl}>
                            <InputLabel>User Role</InputLabel>
                            <Select
                                value={this.state.newUserRole}
                                onChange={this.handleChange}
                                inputProps={{
                                name: 'newUserRole',
                                id: 'newUserRole',
                                }}
                            >
                                <MenuItem value="User">User</MenuItem>
                                <MenuItem value="Moderator">Moderator</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <Button color="primary" className={classes.buttonModal} onClick={this.submitChangeUserRole}>
                            Change
                        </Button>
                    </div>
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.userRoleUpdated}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                    SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">User Role Updated!</span>}
                    action={[,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => this.setState({ userRoleUpdated: false })}
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
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 500,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
})

function mapStateToProps(state){
    return {
        users: state.users.users
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeRole: (userEmail, userRole) => dispatch(changeUserRole(userEmail, userRole))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageUsers))