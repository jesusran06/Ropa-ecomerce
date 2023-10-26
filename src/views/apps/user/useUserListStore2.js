import { defineStore } from 'pinia'
import axios from '@axios'

export const useUserListStore = defineStore('UserListStore', {
  actions: {
    // 👉 Fetch users data
    fetchUsers() {
      // return axios.get('/apps/users/list', { params })
      const users = [
        // {
        //   id: 50,
        //   fullName: 'Beverlie Krabbe',
        //   company: 'Kaymbo PVT LTD',
        //   role: 'editor',
        //   country: 'China',
        //   contact: '(397) 294-5153',
        //   email: 'bkrabbe1d@home.pl',
        //   currentPlan: 'company',
        //   status: 'active',
        //   avatar: '/src/assets/images/avatars/avatar-2.png',
        //   billing: 'Manual - Credit Card',
        // },
        // {
        //   id: 49,
        //   fullName: 'Paulie Durber',
        //   company: 'Babbleblab PVT LTD',
        //   role: 'subscriber',
        //   country: 'Sweden',
        //   contact: '(694) 676-1275',
        //   email: 'pdurber1c@gov.uk',
        //   currentPlan: 'team',
        //   status: 'inactive',
        //   avatar: '',
        //   billing: 'Auto Debit',
        // },
        // {
        //   id: 48,
        //   fullName: 'Onfre Wind',
        //   company: 'Thoughtmix PVT LTD',
        //   role: 'admin',
        //   country: 'Ukraine',
        //   contact: '(344) 262-7270',
        //   email: 'owind1b@yandex.ru',
        //   currentPlan: 'basic',
        //   status: 'pending',
        //   avatar: '',
        //   billing: 'Manual - Credit Card',
        // },
        // {
        //   id: 47,
        //   fullName: 'Karena Courtliff',
        //   company: 'Feedfire PVT LTD',
        //   role: 'admin',
        //   country: 'China',
        //   contact: '(478) 199-0020',
        //   email: 'kcourtliff1a@bbc.co.uk',
        //   currentPlan: 'basic',
        //   status: 'active',
        //   avatar: '/src/assets/images/avatars/avatar-1.png',
        //   billing: 'Manual - Credit Card',
        // },
        // {
        //   id: 46,
        //   fullName: 'Saunder Offner',
        //   company: 'Skalith PVT LTD',
        //   role: 'maintainer',
        //   country: 'Poland',
        //   contact: '(200) 586-2264',
        //   email: 'soffner19@mac.com',
        //   currentPlan: 'enterprise',
        //   status: 'pending',
        //   avatar: '',
        //   billing: 'Auto Debit',
        // },
        {
          id: 45,
          fullName: 'Corrie Perot',
          company: 'Flipopia PVT LTD',
          role: 'subscriber',
          country: 'China',
          contact: '(659) 385-6808',
          email: 'cperot18@goo.ne.jp',
          currentPlan: 'team',
          status: 'pending',
          avatar: '/src/assets/images/avatars/avatar-3.png',
          billing: 'Manual - Paypal',
        },
        {
          id: 44,
          fullName: 'Vladamir Koschek',
          company: 'Centimia PVT LTD',
          role: 'author',
          country: 'Guatemala',
          contact: '(531) 758-8335',
          email: 'vkoschek17@abc.net.au',
          currentPlan: 'team',
          status: 'active',
          avatar: '',
          billing: 'Auto Debit',
        },
        {
          id: 43,
          fullName: 'Micaela McNirlan',
          company: 'Tambee PVT LTD',
          role: 'admin',
          country: 'Indonesia',
          contact: '(242) 952-0916',
          email: 'mmcnirlan16@hc360.com',
          currentPlan: 'basic',
          status: 'inactive',
          avatar: '',
          billing: 'Manual - Credit Card',
        },
        {
          id: 42,
          fullName: 'Benedetto Rossiter',
          company: 'Mybuzz PVT LTD',
          role: 'editor',
          country: 'Indonesia',
          contact: '(323) 175-6741',
          email: 'brossiter15@craigslist.org',
          currentPlan: 'team',
          status: 'inactive',
          avatar: '',
          billing: 'Manual - Credit Card',
        },
        {
          id: 41,
          fullName: 'Edwina Baldetti',
          company: 'Dazzlesphere PVT LTD',
          role: 'maintainer',
          country: 'Haiti',
          contact: '(315) 329-3578',
          email: 'ebaldetti14@theguardian.com',
          currentPlan: 'team',
          status: 'pending',
          avatar: '',
          billing: 'Manual - Cash',
        },
      ]

      return {
        users,
        totalPages: 5,
        totalUsers: 50,
        page: 1,
      }
    },

    // 👉 Add User
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    //   // 👉 fetch single user
    //   fetchUserid {
    //     return new Promise((resolve, reject) => {
    //       axios.get(`/apps/users/$id`).then(response => resolve(response)).catch(error => reject(error))
    //     })
    //   },

  //   // 👉 Delete User
  //   deleteUserid {
  //     return new Promise((resolve, reject) => {
  //       axios.delete(`/apps/users/$id`).then(response => resolve(response)).catch(error => reject(error))
  //     })
  //   },
  // },
  },
})
