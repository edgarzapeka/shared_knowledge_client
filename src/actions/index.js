import * as API from '../utils/api'
import * as Type from './types'

export function successfullLogin(userState){
    return {
        type: Type.USER_LOGIN,
        token: userState.token,
        secret: userState.secret,
        id: userState.id,
        email: userState.email,
        name: userState.name,
        karma: userState.karma
    }
}

export function login(userData){
    return (dispatch) => API.login(userData.email, userData.password, userData.rememberMe)
        .then(response => response.json())
        .then(data => dispatch(successfullLogin(data)))
}

export function register(userData){
    return (dispatch) => API.register(userData.email, userData.password, userData.confirmPassword)
        .then(response => response.json())
        .then(data => dispatch(successfullLogin(data)))
}

export function logout(){
    return {
        type: Type.USER_LOGOUT
    }
}