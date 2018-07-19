import axios from 'axios'
let base = '/api'

export const RegisterUser = params => {
  return axios.post(`${base}/user/register`, params)
}

export const LoginUser = params => {
  return axios.post(`${base}/user/login`, params)
}
