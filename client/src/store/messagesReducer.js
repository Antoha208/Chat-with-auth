const defaultState = {
    messages: []
}

const MESSAGE = 'MESSAGE'
const ARRAY_MESSAGES = 'ARRAY_MESSAGES'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
const RESET_ALL_MESSAGES = 'RESET_ALL_MESSAGES'

export const messagesReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case ARRAY_MESSAGES:
            return { 
                ...state,
                messages: (action.messages).concat(state.messages)
            }
        case MESSAGE:
            return {
                ...state, messages: state.messages.concat(action.message)
            }
        case UPDATE_MESSAGE:
            return {
                ...state, messages: state.messages.map(el => el.key === action.message.key ? {
                    ...el,
                        message: action.message.message,
                        attachment: action.message.attachment,
                        updatedAt: Date.now()
                }
                : el)
            }
        case REMOVE_MESSAGE:
            return {
                ...state, messages: state.messages.filter(el => el.key !== action.message.key)
            }
        case RESET_ALL_MESSAGES: 
            return {
                ...state, messages: []
            }
        default:
            return state
    }
}

export const setArrayMessages = (messages) => ({type: ARRAY_MESSAGES, messages})
export const setMessage = (message) => ({type: MESSAGE, message})
export const updateMessage = (message) => ({type: UPDATE_MESSAGE, message})
export const removeMessage = (message) => ({type: REMOVE_MESSAGE, message})
export const resetAllMessages = () => ({type: RESET_ALL_MESSAGES})
