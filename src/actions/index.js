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
        karma: userState.karma,
        userRole: userState.userRole
    }
}

function addedLink(linkState){
    return {
        type: Type.LINKS_ADD,
        link: {
            ...linkState,
            date: new Date(Date.parse(linkState.date))
        }
    }
}

function fetchAddedLinkComment(data){
    console.log(data)
    return {
        type: Type.COMMENTS_LINK_ADD,
        comment: data
    }
}

function fetchDeletedLinkComment(id){
    return {
        type: Type.COMMENTS_LINK_DELETE,
        id: id
    }
}

function fetchDeletedLink(id){
    return {
        type: Type.LINKS_DELETE,
        id: id
    }
}

function fetchLinks(links){
    return {
        type: Type.LINKS_INIT,
        links: links
    }
}

function fetchUpdatedLink(link){
    return {
        type: Type.LINKS_UPDATE,
        link: link
    }
}

function fetchAllLinkComments(data){
    return {
        type: Type.COMMENTS_LINK_INIT,
        comments: data
    }
}

function fetchCategories(categories){
    return {
        type: Type.CATEGORY_INIT,
        categories: categories
    }
}

function fetchUserData(data){
    return {
        type: Type.USER_UPDATE,
        userState: data
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

export function getAllLinks(){
    return (dispatch) => API.getAllLinks()
        .then(response => response.json())
        .then(data => dispatch(fetchLinks(data.links)))
}

export function addLink(title, url, userCredits){
    return (dispatch) => API.addLink(title, url, userCredits)
        .then(response => response.json())
        .then(data => dispatch(addedLink(data)))
}

export function deleteLink(id, userCredits){
    return (dispatch) => API.deleteLink(id, userCredits)
        .then(response => response.json())
        .then(data => dispatch(fetchDeletedLink(data)))
}

export function updateLink(linkId, title, linkURL, userCredits){
    return (dispatch) => API.updateLink(linkId, title, linkURL, userCredits)
        .then(response => response.json())
        .then(data => dispatch(fetchUpdatedLink(data)))
}

export function addLinkComment(body, authorId, linkId, userCredits){
    return (dispatch) => API.addLinkComment(body, linkId, authorId, userCredits)
        .then(response => response.json())
        .then(data => dispatch(fetchAddedLinkComment(data)))
}

export function deleteLinkComment(commentId, userCredits){
    return (dispatch) => API.deleteLinkComment(commentId, userCredits)
        .then(response => response.json())
        .then(data => dispatch(fetchDeletedLinkComment(data)))
}

export function getAllLinkComments(){
    return (dispatch) => API.getAllLinkComments()
        .then(response => response.json())
        .then(data => dispatch(fetchAllLinkComments(data.comments)))
}

export function getAllCategories(){
    return (dispatch) => API.getAllCategories()
        .then(response => response.json())
        .then(data => dispatch(fetchCategories(data)))
}

export function updateUserAccount(userState){
    return (dispatch) => API.updateUser(userState)
        .then(response => response.json())
        .then(data => fetchUserData(data))
}