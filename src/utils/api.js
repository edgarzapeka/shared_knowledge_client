const host = 'https://localhost:44344'
const authHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': '*'
}

export function login(email, password, rememberMe ){
    return fetch(`${host}/auth/login`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
            email: email,
            password: password,
            rememberMe: rememberMe
        })
    })
}

export function register(email, password, confirmPassword){
    return fetch(`${host}/auth/register`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    })
}