const defaultState = {
    user: {
        id: null,
        username: null,
        roles: [],
        iat: null,
        exp: null
    }
}

const USER = 'USER'

export const userReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case USER:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    id: action.id,
                    username: action.username,
                    roles: action.roles,
                    iat: action.iat,
                    exp: action.exp
                }
            })
        default:
            return state
    }
}
export const setUser = (id, username, roles, iat, exp) => ({type: USER, id, username, roles, iat, exp})



