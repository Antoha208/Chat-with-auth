const defaultState = {
    chats: []
}

const CHAT = 'CHAT'
const ARRAY_CHATS = 'ARRAY_CHATS'
const RESET_CHAT = 'RESET_CHAT'
const RESET_ALL_CHATS = 'RESET_ALL_CHATS'

export const chatsReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case CHAT:
            return {
                ...state, chats: state.chats.concat(action.chat)
            }
        case ARRAY_CHATS:
            return { 
                ...state,
                chats: (action.chats).concat(state.chats)
            }
        case RESET_CHAT:
            return {
                ...state, chats: state.chats.filter(el => el._id !== action.chat._id)
            }
        case RESET_ALL_CHATS: 
            return {
                ...state, chats: []
            }
        default:
            return state
    }
}
export const setChat = (chat) => ({type: CHAT, chat})
export const setArrayChats = (chats) => ({type: ARRAY_CHATS, chats})
export const resetChat = (chat) => ({type: RESET_CHAT, chat})
export const resetAllChats = () => ({type: RESET_ALL_CHATS})
