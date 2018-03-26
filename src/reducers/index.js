import * as Types from '../actions/types'

import { combineReducers } from 'redux'

function auth(state = {isUserLogin: false}, action){
    switch(action.type){
        case Types.USER_LOGIN:
            return {
                isUserLogin: true,
                userState : {
                    id: action.id,
                    email: action.email,
                    name: action.name,
                    karma: action.karma,
                    token: action.token,
                    secret: action.secret
                }
            }
        case Types.USER_LOGOUT:
            return {
                isUserLogin: false
            }
        default:
            return state
    }
}

const initialTestLinks = {
    list: [],
    filter: 'none'
}

function links(state = initialTestLinks, action){
    switch(action.type){
        case Types.LINKS_INIT:
            return {
                filter: 'none',
                list: action.links
            }
        case Types.LINKS_ADD:
            let newState = {
                ...state
            }
            newState.list.push(action.link)
            return newState
        case Types.LINKS_DELETE:
            return {
                filter: state.filter,
                list: state.list.filter(l => l.id !== action.id)
            }
        case Types.LINKS_UPDATE:
            return{
                filter: state.filter,
                list: state.list.map(l => l.id === action.link.id ? action.link : l)
            }
        default:
            return state
    }
}

const initialComments = {
    filter: 'none',
    comments: []
}

function comments(state = initialComments, action){
    switch(action.type){
        case Types.COMMENTS_LINK_INIT:
            return {
                filter: 'none',
                comments: action.comments
            }
        case Types.COMMENTS_LINK_ADD:
            let newState = {...state}
            newState.comments.push(action.comment)
            return newState
        case Types.COMMENTS_LINK_DELETE:
            return {
                filter: state.filter,
                comments: state.comments.filter(c => c.id !== action.id)
            }
        default:
            return state
    }
}

export default combineReducers({
    auth,
    links,
    comments
})