const defaultState = {
    user: {
        id: null,
        username: null,
        roles: [],
        theme: [],
        language: [],
        chats: [],       
        iat: null,
        exp: null,
        avatar: null,
        registrationDate: null
    }
}

const USER = 'USER'
const AVATAR = 'AVATAR'
const DELETE_AVATAR = 'DELETE_AVATAR'
const THEME = 'THEME'
const LANGUAGE = 'LANGUAGE'
const USERNAME = 'USERNAME'
const ABOUT = 'ABOUT'

export const userReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case USER:
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    id: action.payload.id,
                    username: action.payload.username,
                    roles: action.payload.roles,
                    theme: action.payload.theme,
                    language: action.payload.language,
                    chats: action.payload.chats,
                    iat: action.payload.iat,
                    exp: action.payload.exp,
                    avatar: action.payload.avatar,
                    about: action.payload.about,
                    registrationDate: action.payload.registrationDate
                }
            })
        case AVATAR:
            return {
                ...state, user: {...state.user, avatar: action.payload}
            }
        case DELETE_AVATAR:
            return {
                ...state, user: {...state.user, avatar: ''}
            }
        case THEME:
            return {
                ...state, user: {...state.user, theme: action.payload}
            }
        case LANGUAGE:
            return {
                ...state, user: {...state.user, language: action.payload}
            }
        case USERNAME:
            return {
                ...state, user: {...state.user, username: action.payload}
            }
        case ABOUT:
            return {
                ...state, user: {...state.user, about: action.payload}
            }
        default:
            return state
    }
}
export const setUser = (payload) => ({type: USER, payload})
export const setProfilePhoto = (payload) => ({type: AVATAR, payload})
export const resetProfilePhoto = () => ({type: DELETE_AVATAR})
export const changeTheme = (payload) => ({type: THEME, payload})
export const changeLanguage = (payload) => ({type: LANGUAGE, payload})
export const changeUsername = (payload) => ({type: USERNAME, payload})
export const changeAbout = (payload) => ({type: ABOUT, payload})



