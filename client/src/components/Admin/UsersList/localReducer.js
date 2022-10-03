const CHECKED = 'checked'
const COUNT = 'count'
const SEARCH = 'search'

export default function localReducer(state, action) {
    switch (action.type) {
      case CHECKED:
        return {
          ...state,
          checked: action.payload
        }
      case COUNT:
        return {
          ...state,
          count: action.payload
        }
      case SEARCH:
        return {
          ...state,
          search: action.payload
        }
      default:
        return state
    }
  }