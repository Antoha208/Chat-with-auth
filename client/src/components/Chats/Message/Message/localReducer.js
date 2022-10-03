const ZOOM = 'zoom'
const UNZOOM = '!zoom'
const ANCHOREL = 'anchorEl'
const OPENMENU = 'openMenu'
const CLOSEMENU = '!openMenu'
const FINDCLICKED = 'findClicked'
const NEWTEXT = 'newText'
const UPDATEDMESS = 'updatedMess'
const DELETEDMESS = 'deletedMess'

export default function localReducer(state, action) {
    switch (action.type) {
        case ZOOM:
            return {
                ...state,
                zoom: true
            }
        case UNZOOM:
        return {
            ...state,
            zoom: false
        }
        case ANCHOREL:
            return {
                ...state,
                anchorEl: action.payload
            }
        case OPENMENU:
            return {
                ...state,
                openMenu: true
            }
        case CLOSEMENU:
            return {
                ...state,
                openMenu: false
            }
        case FINDCLICKED:
            return {
                ...state,
                findClicked: action.payload
            }
        case NEWTEXT:
            return {
                ...state,
                newText: action.payload
            }
        case UPDATEDMESS:
            return {
                ...state,
                updatedMess: {...state.updatedMess, ...action.payload}
            }
        case DELETEDMESS:
            return {
                ...state,
                deletedMess: {...state.deletedMess, ...action.payload}
            }
        default:
            return state
    }
}