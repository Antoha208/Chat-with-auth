const defaultState = {
    users: []
}

const ALLUSERS = 'ALLUSERS'
const RESET_ALLUSERS = 'RESET_ALLUSERS'

export const usersListReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case ALLUSERS:
            return {
                ...state, users: state.users.concat(action.user)
            }
        case RESET_ALLUSERS: 
            return {
                ...state, users: []
            }
        default:
            return state
    }
}
export const setAllUsers = (user) => ({type: ALLUSERS, user})
export const resetAllUsers = () => ({type: RESET_ALLUSERS})
