import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
console.log(baseUrl,'mmmm');
const instance = axios.create({
    baseURL:baseUrl,
    headers: {'Content-Type': 'application/json'}
})

export default instance