import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { formatDate } from '../utils/formatter'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

class ConfirmEmail extends Component{

    constructor(props){
        super(props)
    }

    render(){ 
        const { classes } = this.props

        return (
            <Grid container md={12}>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="subheading">
                                Your email confirmed successfully!
                    </Typography>
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
      justifyContent: 'center',
      alignItems: 'center'
    }),
})


export default withStyles(styles)(ConfirmEmail)