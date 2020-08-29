
import React from 'react'
import axios from 'axios'

const api = (token) => {
  if (token) {
    const authorizationString = `Bearer ${token}`
    return axios.create({
      baseURL: 'https://agua-nobre.herokuapp.com/api/v1',
      //baseURL: 'http://192.168.1.27/pombo-correio/public/api',
      headers: {
        Authorization: authorizationString,
        'x-access-token': token
      }
    })
  }
  else return axios.create({ baseURL: 'https://agua-nobre.herokuapp.com/api/v1' })
}

export default api
