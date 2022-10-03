const AVATAR = 'avatar'
const ROLE = 'role'
const LOADING_TRUE = 'loadingTrue'
const LOADING_FALSE = 'loadingFalse'

export default function localReducer(state, action) {
    switch (action.type) {
      case AVATAR:
        return {
          ...state,
          avatar: action.payload
        }
      case ROLE:
        return {
          ...state,
          role: action.payload
        }
      case LOADING_TRUE:
        return {
          ...state,
          loading: true
        }
      case LOADING_FALSE:
        return {
          ...state,
          loading: false
        }
      default:
        return state
    }
  }