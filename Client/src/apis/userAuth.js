import axios from '../axiosConfig/axios'

export const signup = (data) => axios.post('/signup',data)

export const login = (data) => axios.post('/login',data)

