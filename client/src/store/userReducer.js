const defaultState = {
    user: {
        id: null,
        username: null,
        roles: [],
        theme: [],
        language: [],       
        iat: null,
        exp: null,
        avatar: null,
        registrationDate: null
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
                    theme: action.theme,
                    language: action.language,
                    iat: action.iat,
                    exp: action.exp,
                    avatar: action.avatar,
                    about: action.about,
                    registrationDate: action.registrationDate
                }
            })
        default:
            return state
    }
}
export const setUser = (id, username, roles, theme, language, iat, exp, avatar, about, registrationDate) => ({type: USER, id, username, roles, theme, language, iat, exp, avatar, about, registrationDate})



