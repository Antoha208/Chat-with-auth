const VALUE = 'value'
const SEARCH = 'search'
const PLUS = 'plus'
const CHOSENTAB = 'chosenTab'
const ANCHORELEVENT = 'anchorElEvent'
const MENUOPEN = 'menuOpen'

export default function localReducer(state, action) {
    switch (action.type) {
      case VALUE:
        return {
          ...state,
          value: action.payload
        }
      case SEARCH:
        return {
          ...state,
          search: action.payload
        }
      case PLUS:
        return {
          ...state,
          plus: !state.plus
        }
      case CHOSENTAB:
        return {
          ...state,
          chosenTab: action.payload
        }
      case ANCHORELEVENT:
        return {
          ...state,
          anchorEl: action.payload
        }
      case MENUOPEN:
        return {
          ...state,
          menuOpen: !state.menuOpen
        }
      default:
        return state
    }
  }