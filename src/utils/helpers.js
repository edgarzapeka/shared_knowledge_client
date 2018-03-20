import { successfullLogin, logout } from '../actions/'

export function identifyUser(){
    const token = localStorage.getItem('token')
    const secret = localStorage.getItem('secret')

    console.log(token)
    console.log(secret)

    if (token === null || secret === null || token === 'null' || secret === 'null'){
        return logout()
    }

    return successfullLogin(token, secret)
}

export function logoutUser(){
    localStorage.setItem('token', null)
    localStorage.setItem('secret', null)

    return logout()
}