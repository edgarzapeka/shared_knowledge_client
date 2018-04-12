import * as Types from '../actions/types'

import { combineReducers } from 'redux'

function auth(state = {isUserLogin: false, isUserFetched: false}, action){
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
                    secret: action.secret,
                    userRole: action.userRole,
                    phoneNumber: action.phoneNumber
                },
                isUserFetched: true
            }
        case Types.USER_LOGOUT:
            return {
                isUserLogin: false,
                isUserFetched: true
            }
        case Types.USER_UPDATE:
            return {
                isUserLogin: true,
                userState: action.userState,
                isUserFetched: true
            }
        default:
            return state
    }
}

const initialTestLinks = {
    list: [],
    filter: 'none',
    isFetched: false
}

function links(state = initialTestLinks, action){
    switch(action.type){
        case Types.LINKS_INIT:
            return {
                filter: 'none',
                list: action.links,
                isFetched: true
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
    comments: [],
    isFetched: false
}

function comments(state = initialComments, action){
    switch(action.type){
        case Types.COMMENTS_LINK_INIT:
            return {
                filter: 'none',
                comments: action.comments,
                isFetched: true
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

const initialCategories = {
    categories: [],
    isFetched: false
}

function categories(state = initialCategories, action){
    switch(action.type){
        case Types.CATEGORY_INIT:
            return {
                categories: action.categories,
                isFetched: true
            }
        default:
            return state
    }
}

const initialActions = {

}

function actions(state = initialActions, action){
    switch(action.type){
        default:
            return state
    }
}

const usersInitial = {
    isFetched: false,
    users: []
}

function users(state = usersInitial, action){
    switch(action.type){
        case Types.USER_GET_ALL:
            return {
                isFetched: true,
                users: action.users
            }
        case Types.USER_UPDATE_USERROLE:
            return {
                isFetched: true,
                users: state.users.map(u => u.id === action.newUser.id ? action.newUser : u)
            }
        default:
            return state
    }
}

export default combineReducers({
    auth,
    links,
    comments,
    categories,
    users
})