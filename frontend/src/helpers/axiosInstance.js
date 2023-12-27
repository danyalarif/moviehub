import axios from "axios";
const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    headers: {
        "Content-type": "application/json",
        "Authorization": localStorage.getItem('token')
    }
});

http.interceptors.request.use(
    config => {
        config.headers['authorization'] = `${localStorage.getItem('token')}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const status = error?.response?.status || 0
    if (status === 401) {
        if (localStorage.getItem('token')) {
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