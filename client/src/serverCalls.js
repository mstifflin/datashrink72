import axios from 'axios'

var routes = {
    login: '/login',
    signup: '/signup',
    facebook: '/facebook',
    twitter: '/twitter',
    custom: '/analyze'
}

const serverPost = (routeName, message) => {
    return axios.post(routes[routeName], message)
}

const serverGet = (routeName) => {
    axios.get(routes[routeName])
}

export {serverPost, serverGet}

