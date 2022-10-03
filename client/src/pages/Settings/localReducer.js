const CHECKMODAL = 'checkModal'
const ACCEPTMODAL = 'acceptModal'
const SHORTCUTSMODAL = 'shortcutsModal'
const SELECTED = 'selected'

export default function localReducer(state, action) {
    switch (action.type) {
      case CHECKMODAL:
        return {
          ...state,
          openCheckModal: !state.openCheckModal
        }
      case ACCEPTMODAL:
        return {
          ...state,
          openAcceptModal: !state.openAcceptModal
        }
      case SHORTCUTSMODAL:
        return {
          ...state,
          openShortcutsModal: !state.openShortcutsModal
        }
      case SELECTED:
        return {
          ...state,
          selected: action.payload
        }
      default:
        return state
    }
  }