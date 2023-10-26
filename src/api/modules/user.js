import { apiHttp } from '../axiosApi.js'
import {

  userList, userLogin, userLoginGuest, userPath, userRegister,

} from '../config/apiRoute.js'

export const createUsers = body =>
  apiHttp('POST', `${userPath}`, body)

export const editUser = (userId, body) =>
  apiHttp('PUT', `${userPath}${userId}`, body)

export const getUsers = params =>
  apiHttp('GET', `${userPath}${userList}`, undefined, { params })

export const getUser = id =>
  apiHttp('GET', `${userPath}${id}`)

export const loginApiUser = body => {
  console.log(body)

  return apiHttp('POST', `${userPath}${userLogin}`, body, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

      // Authorization: 'Basic ' + btoa(`${email}:${password}`),
    },
  })
}

export const loginApiGuest = body => {
  console.log(body)

  return apiHttp('POST', `${userPath}${userLoginGuest}`, body, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const registerUser = body => {
  console.log(body)

  return apiHttp('POST', `${userPath}${userRegister}`, body, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
