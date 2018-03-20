const host = 'https://localhost:44344'
const authHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true
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