import React from 'react'

export default React.createContext({
    user: false,
    token: null,
    role: null,
    isLogged: false,
    isLoading: true,
    
    login: (user, token, role) => {},
    logout: () => {},
    register: (user, token, role) => {},
    retrieveToken: () => {},
    checkLoggedState: () => {}
})
