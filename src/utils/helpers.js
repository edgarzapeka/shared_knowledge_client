import { successfullLogin, logout } from '../actions/'

export function identifyUser(){
    const token = localStorage.getItem('token')
    const secret = localStorage.getItem('secret')

    if (token === null || secret === null || token === 'null' || secret === 'null'){
        return logout()
    }

    return successfullLogin({
        token: token,
        secret: secret,
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        karma: localStorage.getItem('karma')
    })
}

export function logoutUser(){
    localStorage.setItem('token', null)
    localStorage.setItem('secret', null)
    localStorage.setItem('id', null)
    localStorage.setItem('karma', null)
    localStorage.setItem('email', null)
    localStorage.setItem('name', null)

    return logout()
}

export function saveUserDataLocally(userData){
    localStorage.setItem('token', userData.token)
    localStorage.setItem('secret', userData.secret)
    localStorage.setItem('id', userData.id)
    localStorage.setItem('name', userData.name)
    localStorage.setItem('email', userData.email)
    localStorage.setItem('karma', userData.karma)
}