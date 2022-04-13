const defaultState = {
    isAuth: false
}

const AUTH = 'AUTH'

export const authReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case AUTH:
            return {...state, isAuth: state.isAuth || action.payload}
        default:
            return state
    }
}

export const changeIsAuth = (payload) => ({type: AUTH, payload})