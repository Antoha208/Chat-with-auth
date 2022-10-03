const USERNAME = 'username'
const PASSWORD = 'password'
const PASSWORD_CONF = 'passwordConf'
const VISIBLE = 'visible'
const ERROR = 'error'

export default function localReducer(state, action) {
    switch (action.type) {
      case USERNAME:
        return {
          ...state,
          username: action.payload
        }
      case PASSWORD:
        return {
          ...state,
          password: action.payload
        }
      case PASSWORD_CONF:
        return {
          ...state,
          passwordConf: action.payload
        }
      case VISIBLE:
        return {
          ...state,
          visible: !state.visible
        }
      case ERROR:
        return {
          ...state,
          error: !state.error
        }
      default:
        return state
    }
  }