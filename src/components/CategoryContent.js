import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'

class CategoryContent extends Component{
    render(){
        const { classes} = this.props

        return(
            <Grid container spacing={16}>
                <h1>Yo hello</h1>
            </Grid>
        )
    }
}

const styles = theme => ({
})

function mapStateToProps(state){
    return {
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryContent))