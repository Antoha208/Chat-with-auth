const MESSAGES = 'messages'
const FILEPATH = 'filePath'
const SHOWATTACH = 'showAttach'
const HIDEATTACH = '!showAttach'
const ZOOMATTACH = 'zoomAttach'
const UNZOOMATTACH = '!zoomAttach'

export default function localReducer(state, action) {
    switch (action.type) {
      case MESSAGES:
        return {
          ...state,
          messages: state.messages.concat(action.payload)
        }
      case FILEPATH:
        return {
          ...state,
          filePath: action.payload
        }
      case SHOWATTACH:
        return {
          ...state,
          showAttach: true
        }
      case HIDEATTACH:
        return {
          ...state,
          showAttach: false
        }
      case ZOOMATTACH:
        return {
          ...state,
          zoomAttach: true
        }
      case UNZOOMATTACH:
        return {
          ...state,
          zoomAttach: false
        }
      default:
        return state
    }
  }