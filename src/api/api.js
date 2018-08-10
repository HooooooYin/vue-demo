import axios from 'axios'
let base = '/api'

export const RegisterUser = params => {
  return axios.post(`${base}/user/register`, params)
}

export const LoginUser = params => {
  return axios.post(`${base}/user/login`, params)
}

export const GetProductList = params => {
  return axios.get(`${base}/productlist/${params}`)
}

export const SearchProductList = params => {
  return axios.get(`${base}/search/${params}`)
}

export const GetProduct = params => {
  return axios.get(`${base}/product/${params}`)
}

export const AdminLogin = params => {
  return axios.post(`${base}/admin/login`, params)
}

export const UploadFile = params => {
  return axios.post(`${base}/uploadImg`, {
    headers: {'Content-Type': 'multipart/form-data'},
    data: params
  })
}

export const addProd = params => {
  return axios.post(`${base}/addprod`, {
    params
  })
}
