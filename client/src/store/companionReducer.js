const defaultState = {
    companion: {
        id: null,
        username: null,
        roles: [],       
        iat: null,
        exp: null,
        avatar: null,
        about: null,
        registrationDate: null
    }
}

const COMPANION = 'COMPANION'
const RESET_COMPANION = 'RESET_COMPANION'

export const companionReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case COMPANION:
            return Object.assign({}, state, {
                companion: {
                    ...state.companion,
                    id: action.id,
                    username: action.username,
                    roles: action.roles,
                    iat: action.iat,
                    exp: action.exp,
                    avatar: action.avatar,
                    about: action.about,
                    registrationDate: action.registrationDate
                }
            })
        case RESET_COMPANION:
            return {
                ...state, companion: defaultState
            }
        default:
            return state
    }
}
export const setCompanion = (id, username, roles, iat, exp, avatar, about, registrationDate) => ({type: COMPANION, id, username, roles, iat, exp, avatar, about, registrationDate})
export const resetCompanion = () => ({type: RESET_COMPANION})