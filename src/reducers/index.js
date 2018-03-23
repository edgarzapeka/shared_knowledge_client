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
    list: [{id: '1', title: 'Test1', linkURL: 'www.test.ru', rating: 21, date: new Date(), userName: 'Carl'},
            {id: '2', title: 'Test2', linkURL: 'www.test.ru', rating: 11, date: new Date(), userName: 'Harold'},
            {id: '3', title: 'Test3', linkURL: 'www.test.ru', rating: 1, date: new Date(), userName: 'Kevin'},
            {id: '4', title: 'Test4', linkURL: 'www.test.ru', rating: 4, date: new Date(), userName: 'Ben'},
            {id: '5', title: 'Test5', linkURL: 'www.test.ru', rating: 71, date: new Date(), userName: 'Tom'},
            {id: '6', title: 'Test6', linkURL: 'www.test.ru', rating: 13, date: new Date(), userName: 'Sasha'},
            {id: '7', title: 'Test7', linkURL: 'www.test.ru', rating: 3, date: new Date(), userName: 'Lin'} ],
    filter: 'none'
}

function links(state = initialTestLinks, action){
    switch(action.type){
        case Types.LINKS_INIT:
            return {
                filter: 'none',
                links: [...action.links]
            }
        case Types.LINKS_ADD:
            let newState = {
                ...state
            }
            newState.list.push(action.link)
            return newState
        default:
            return state
    }
}

export default combineReducers({
    auth,
    links
})