import React, { Component } from 'react'
import Grid from 'material-ui/Grid'

import { Redirect } from 'react-router-dom'

export default class HomeScreen extends Component{
    render(){
        return (
            <Redirect to="links" />
        )
    }
}