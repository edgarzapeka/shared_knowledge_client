import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'

class CategoryList extends Component{
    render(){
        const { classes, categories } = this.props

        if (categories.categories.length === 0){
            return (
                <Grid container spacing={16}>
                <div className={classes.categoryListContainer}>
                    <Typography variant="display3" color='error'>
                        No categories. Come againe later.
                    </Typography>
                </div>
            </Grid>
            )
        }

        return(
            <Grid container spacing={16}>
                <div className={classes.categoryListContainer}>
                    {categories.categories.map(c => (
                        <Paper className={classes.category} key={c.id}>
                        <h1>{c.name}</h1>
                    </Paper>
                    ))}
                </div>
            </Grid>
        )
    }
}

const styles = theme => ({
    category:{
        padding: '30px',
        margin: '30px',
        borderRadius: '50px'
    },
    categoryListContainer:{
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
    }
})

function mapStateToProps(state){
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryList))