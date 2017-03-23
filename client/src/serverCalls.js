import axios from 'axios'

var routes = {
    login: '/login',
    signup: '/signup',
    public: '/publicanalyses'
    twitter: '/twitter',
    analyze: '/analyze/'
}

const serverPost = (routeName, message) => {
    return axios.post(routes[routeName], message)
}

const analysesGet = (id) => {
    return axios.get(routes['analyze'] + id)
}

const serverGet = (routeName) => {
    axios.get(routes[routeName])
}

export {serverPost, serverGet, analysesGet}

