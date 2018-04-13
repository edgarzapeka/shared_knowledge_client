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

import { Link as RouterLink } from 'react-router-dom'
import Link from 'material-ui-icons/Link'
import InsertComment from 'material-ui-icons/InsertComment'
import Grid from 'material-ui/Grid'

import { formatDate } from '../utils/formatter.js'

class ContentList extends Component{

    constructor(props){
        super(props)

        
    }

    state = {
    }

    render(){

        const { classes, links, userState } = this.props

        let filteredLinks = links.filter(l => l.userId === userState.id)

        return (
            <Paper elevation={4} className={classes.container}>
               <Paper elevation={8} className={classes.links}>
                    <Typography variant="display2">
                        #Links
                    </Typography>
                    {filteredLinks.map(l => {
                    return (
                        <Grid item md={12} key={l.id}>
                            <Paper className={classes.root} elevation={4}>
                                <a href={l.linkURL}><Link color={'primary'} className={classes.icon}/></a>
                                <div className={classes.mainInfoBlock}>
                                    <RouterLink to={`/links/${l.id}`}>
                                        <Typography variant="headline" component="h3">
                                            {l.title}
                                        </Typography>
                                    </RouterLink>
                                    <div className={classes.infoFooter}>
                                        <Typography component="p">
                                            by {l.userName}
                                        </Typography>
                                        <Typography component="p" className={classes.infoFooterItem}>
                                            {formatDate(l.date)}
                                        </Typography>
                                        <Typography component="p" className={classes.categoryMargin}>
                                            #{l.category}
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                            )
                    })}
               </Paper>
            </Paper>
        )
    }
}

const styles = theme => ({
    container: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: 16
    },
    links: {
        padding: 16
    },
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6,
        margin: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        margin: 16
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
        flexDirection: 'column',
        width: '100%'
    },
    infoFooter:{
        display: 'flex',
        padding: '2px'
    },
    infoFooterItem:{
        marginLeft: '15px'
    },
    categoryMargin:{
        marginLeft: "10px"
    }
})

function mapStateToProps(state){
    return {
        userState: state.auth.userState,
        links: state.links.list
    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContentList))