import React from 'react'

export default React.createContext({
  user: {},
  token: null,
  role: null,
  isLogged: false,
  isLoading: true,

  login: (user, token, role) => {},
  logout: () => {},
  updateUser: user => {},
  register: (user, token, role) => {},
  retrieveToken: () => {},
})
