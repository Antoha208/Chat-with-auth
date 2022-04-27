const defaultState = {
    users: []
}

const ALLUSERS = 'ALLUSERS'

export const usersListReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case ALLUSERS:
            return {
                ...state, users: state.users.concat(action.user)
            }
        default:
            return state
    }
}
export const setAllUsers = (user) => ({type: ALLUSERS, user})
