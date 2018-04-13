import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { formatDate } from '../utils/formatter'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import Delete from 'material-ui-icons/Delete'

class Comment extends Component{
    render(){
        const { comment, classes } = this.props

        return (
            <Grid item md={12}>
                <Paper className={classes.root} elevation={4}>
                    <div className={classes.infoBlock}>
                        <Typography variant="subheading">
                            { comment.authorId} | {formatDate(comment.date)}
                        </Typography>
                        <Typography variant="body1">
                            { comment.body }
                        </Typography>
                    </div>
                    <Delete className={classes.deleteButton} onClick={this.props.deleteComment}/>
                </Paper>
            </Grid>
        )
    }
}

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 6,
      paddingBottom: 6,
      margin: theme.spacing.unit * 3,
      display: 'flex',
    }),
    actionBar:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    infoBlock:{
        display: 'flex',
        marginLeft: '15px',
        flexDirection: 'column'
    },
    deleteButton: {
        alignSelf: 'flex-end'
    }
})


export default withStyles(styles)(Comment)