import axios from 'axios'

var routes = {
    login: '/login',
    signup: '/signup',

    facebook: '/facebook',
    twitter: '/twitter',
    analyze: '/analyses'
}

const serverPost = (routeName, message) => {
    return axios.post(routes[routeName], message)
}

const analysesGet = (id) => {
    return axios.get('/analyses/' + id)
}

const serverGet = (routeName) => {
    axios.get(routes[routeName])
}

export {serverPost, serverGet, analysesGet}

