import axios from "axios";
const http = axios.create({
    baseURL: process.env.VITE_BACKEND_URI,
    headers: {
        "Content-type": "application/json",
        "Authorization": typeof localStorage !== 'undefined' ? localStorage.getItem('token') : undefined
    }
});

http?.interceptors.request.use(
    config => {
        config.headers['authorization'] = typeof localStorage !== 'undefined' ? `${localStorage.getItem('token')}` : undefined
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

http?.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const status = error?.response?.status || 0
    if (status === 401) {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            window.location.assign('/login')
            return Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})

export default http