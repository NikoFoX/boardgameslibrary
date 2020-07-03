import axios from 'axios'

// Set config defaults when creating the instance
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/'
})

// Alter defaults after instance has been created
if (sessionStorage.getItem('authToken')) {
	axiosInstance.defaults.headers.common[
		'Authorization'
	] = `Token ${sessionStorage.getItem('authToken')}`
}

export default axiosInstance
