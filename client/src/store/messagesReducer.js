const defaultState = {
    messages: []
}

const MESSAGE = 'MESSAGE'
const RESET_MESSAGE = 'RESET_MESSAGE'

export const messagesReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case MESSAGE:
            return {
                ...state, messages: state.messages.concat(action.message)
            }
        case RESET_MESSAGE: 
            return {
                ...state, messages: []
            }
        default:
            return state
    }
}
export const setMessage = (message) => ({type: MESSAGE, message})
export const resetMessage = () => ({type: RESET_MESSAGE})




//  message: {
        //     username: null,
        //     time: null,
        //     message: null,
        //     id: null,
        //     chatId: null
        // }

//  Object.assign({}, state, {
        //     message: {
        //         ...state.message,
        //         username: action.username,
        //         time: Date.now(),
        //         message: action.message,
        //         id: action.id,
        //         chatId: action.chatId
        //     }
        // })