import { defineStore } from 'pinia'
import { getUsers } from './../../../api/modules/user'
import axios from '@axios'

export const useUserListStore = defineStore('UserListStore', {
  actions: {
    // 👉 Fetch users data
    fetchUsers(params) {
      return getUsers(params)
    },

    // 👉 Add User
    // addUser(userData) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/apps/users/user', {
    //       user: userData,
    //     }).then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },

    // 👉 fetch single user
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteUser(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
