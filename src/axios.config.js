import axios from 'axios'
import JWT from 'jsonwebtoken'

//creating an axios instance and seeting a url so that we can make api calls
//in files that we require this in without writing the complete url evertime
const API = axios.create({
    baseURL: "http://localhost:3001/"
    // baseURL: "http://localhost:3005"
})

//This function sets the header of the axios call with the token that we pass in

API.setHeader = function(token) {
	this.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

//This function wraps an out of the box axios method called an interceptor
// The interceptor acts like a middleware and intercepts every request completing
//whatever requests we make in the function
//Below we are checking that the token is not expired and removing it from sesion storage if it is

API.handleTokenExpiry = function(removeToken) {
	API.interceptors.request.use(function(config) {
		const authHeader = config.headers.common.Authorization
		if (authHeader) {
			const token = authHeader.split('Bearer ')[1]
			const { exp } = JWT.decode(token)
			const now = Date.now().valueOf() / 1000
			if (exp <= now) {
				removeToken()
			}
		}
		return config
	})
}

if (sessionStorage.getItem('token'))
	API.setHeader(sessionStorage.getItem('token'))

export default API
