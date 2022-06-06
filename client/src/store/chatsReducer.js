const defaultState = {
    chats: []
}

const ALLCHATS = 'ALLCHATS'
const RESET_CHAT = 'RESET_CHAT'
const RESET_ALLCHATS = 'RESET_ALLCHATS'

export const chatsReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case ALLCHATS:
            return {
                ...state, chats: state.chats.concat(action.chat)
            }
        case RESET_CHAT:
            return {
                ...state, chats: state.chats.filter(el => el._id !== action.chat._id)
            }
        case RESET_ALLCHATS: 
            return {
                ...state, chats: []
            }
        default:
            return state
    }
}
export const setAllChats = (chat) => ({type: ALLCHATS, chat})
export const resetChat = (chat) => ({type: RESET_CHAT, chat})
export const resetAllChats = () => ({type: RESET_ALLCHATS})
