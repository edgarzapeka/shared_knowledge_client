const host = 'https://localhost:44344'
const authHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json',
}

function getDataRequestHeaders(token, secret){
    return {
        'Authorization': 'Bearer ' + token,
        'secret': secret,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
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

export function getAllLinks(){
    return fetch(`${host}/Link/GetAll`, {
        headers: authHeaders
    })
}

export function addLink(title, url, userCredits){
    return fetch(`${host}/Link/Add`, {
        method: 'POST',
        headers: getDataRequestHeaders(userCredits.token, userCredits.secret),
        body: JSON.stringify({
            title: title,
            url: url,
            userEmail: userCredits.email
        })
    })
}

export function deleteLink(linkId, userCredits){
    return fetch(`${host}/Link/Delete/${linkId}`, {
        method: 'DELETE',
        headers:  getDataRequestHeaders(userCredits.token, userCredits.secret)
    })
}

export function updateLink(linkId, title, linkURL, userCredits){
    return fetch(`${host}/Link/Update`, {
        method: 'PUT',
        headers:  getDataRequestHeaders(userCredits.token, userCredits.secret),
        body: JSON.stringify({
            linkId: linkId,
            title: title,
            linkURL: linkURL
        })
    })
}

export function addLinkComment(body, authorId, linkId, userCredits){
    return fetch(`${host}/Link/AddComment`, {
        method: 'POST',
        headers: getDataRequestHeaders(userCredits.token, userCredits.secret),
        body: JSON.stringify({
            body: body,
            authorId: authorId,
            linkId: linkId
        })
    })
}

export function deleteLinkComment(commentId, userCredits){
    return fetch(`${host}/Link/DeleteComment/${commentId}`, {
        method: 'DELETE',
        headers:  getDataRequestHeaders(userCredits.token, userCredits.secret)
    })
}

export function getAllLinkComments(){
    return fetch(`${host}/Link/GetAllComments`)
}