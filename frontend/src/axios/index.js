import axios from 'axios'

// Set config defaults when creating the instance
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/'
})

// Alter defaults after instance has been created
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export default axiosInstance
