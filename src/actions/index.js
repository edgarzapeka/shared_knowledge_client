import * as API from '../utils/api'
import * as Type from './types'

export function successfullLogin(token, secret){
    return {
        type: Type.USER_LOGIN,
        token: token,
        secret: secret
    }
}

export function login(userData){
    return (dispatch) => API.login(userData.email, userData.password, userData.rememberMe)
        .then(response => response.json())
        .then(data => dispatch(successfullLogin(data.token, data.secret)))
}

export function register(userData){
    return (dispatch) => API.register(userData.email, userData.password, userData.confirmPassword)
        .then(response => response.json())
        .then(data => dispatch(successfullLogin(data.token, data.secret)))
}

export function logout(){
    return {
        type: Type.USER_LOGOUT
    }
}