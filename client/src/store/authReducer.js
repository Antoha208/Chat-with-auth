const defaultState = {
    isAuth: false,
    socket: false
}

const AUTH = 'AUTH'
const SOCKET = 'SOCKET'

export const authReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case AUTH:
            return {...state, isAuth: state.isAuth === state.isAuth ? action.payload : !action.payload}
        case SOCKET:
            return {...state, socket: !state.socket}
        default:
            return state
    }
}

export const changeIsAuth = (payload) => ({type: AUTH, payload})
export const changeSocket = () => ({type: SOCKET})