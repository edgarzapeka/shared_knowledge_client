import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Link from 'material-ui-icons/Link'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import InsertComment from 'material-ui-icons/InsertComment'
import Button from 'material-ui/Button'
import Modal from 'material-ui/Modal'
import TextField from 'material-ui/TextField'

import { formatDate } from '../utils/formatter.js'

class LinkList extends Component{

    state = {
        addLinkModal: false
    }

    getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    render(){
        const { links, classes } = this.props

        return (
            <Grid container spacing={0}>
                <Button color="primary" className={classes.button} onClick={() => this.setState({addLinkModal: true})}>
                    Add new Link
                </Button>
                {links.map(l => {
                    return (
                        <Grid item md={12}>
                            <Paper className={classes.root} elevation={4}>
                                <Link color={'primary'} className={classes.icon} />
                                <div className={classes.rateBlock}>
                                    <KeyboardArrowUp />
                                    <Typography variant="body2" component="h4">
                                    {l.rating}
                                    </Typography>
                                    <KeyboardArrowDown />
                                </div>
                                <div className={classes.mainInfoBlock}>
                                    <Typography variant="headline" component="h3">
                                        {l.title}
                                    </Typography>
                                    <div className={classes.infoFooter}>
                                        <Typography component="p">
                                            by {l.userName}
                                        </Typography>
                                        <Typography component="p" className={classes.infoFooterItem}>
                                            {formatDate(l.date)}
                                        </Typography>
                                        <InsertComment className={classes.infoFooterItem} />
                                        <Typography component="p">
                                            23
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    )
                })}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addLinkModal}
                    onClose={() => this.setState({addLinkModal: false})}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                        Add Link
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                        some subtitle info that i'll fill later on
                        </Typography>

                        <TextField
                                id="title"
                                label="Headline"
                                placeholder="Your beautiful title..."
                                className={classes.textField}
                                margin="normal"
                        />
                        <TextField
                            id="link"
                            label="Link URL"
                            placeholder="www.website.com"
                            multiline
                            className={classes.textField}
                            margin="normal"
                        />
                        <Button color="primary" className={classes.buttonModal}>
                            Add
                        </Button>
                        <Button color="secondary" className={classes.buttonModal} onClick={() => this.setState({addLinkModal: false})}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </Grid>
            
        )
    }
}

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 6,
      paddingBottom: 6,
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      alignItems: 'center'
    }),
    icon:{
        fontSize: '30px'
    },
    rateBlock: {
        display: 'flex',
        padding: '5px',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainInfoBlock: {
        display: 'flex',
        padding: '5px',
        flexDirection: 'column'
    },
    infoFooter:{
        display: 'flex',
        padding: '2px'
    },
    infoFooterItem:{
        marginLeft: '15px'
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    buttonModal: {
        margin: theme.spacing.unit,
    },
  });

function mapStateToProps(state){
    return {
        links: state.links.list
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LinkList))