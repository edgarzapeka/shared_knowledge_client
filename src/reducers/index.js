import * as Types from '../actions/types'

import { combineReducers } from 'redux'

function auth(state = {isUserLogin: false}, action){
    switch(action.type){
        case Types.USER_LOGIN:
            return {
                isUserLogin: true,
                token: action.token,
                secret: action.secret
            }
        case Types.USER_LOGOUT:
            return {
                isUserLogin: false
            }
        default:
            return state
    }
}

export default combineReducers({
    auth
})