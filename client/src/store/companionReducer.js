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
const CHATID = 'CHATID'
const RESET_COMPANION = 'RESET_COMPANION'

export const companionReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case COMPANION:
            return Object.assign({}, state, {
                companion: {
                    ...state.companion,
                    id: action.payload.id || action.payload._id,
                    username: action.payload.username,
                    roles: action.payload.roles,
                    iat: action.payload.iat,
                    exp: action.payload.exp,
                    avatar: action.payload.avatar,
                    about: action.payload.about,
                    registrationDate: action.payload.registrationDate
                }
            })
        case CHATID:
            return {
                ...state, companion: {...state.companion, chatId: action.payload}
            }
        case RESET_COMPANION:
            return {
                ...state, companion: defaultState.companion
            }
        default:
            return state
    }
}
export const setCompanion = (payload) => ({type: COMPANION, payload})
export const setChatId = (payload) => ({type: CHATID, payload})
export const resetCompanion = () => ({type: RESET_COMPANION})