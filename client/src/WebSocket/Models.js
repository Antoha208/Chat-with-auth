const CONNECTION = 'connection'
const REQUEST = 'request'
const EDIT = 'edit'
const MESSAGE = 'message'
const DELETECHAT = 'deleteChat'
const DISCONNECT = 'disconnect'


export const modelMessage = (event, userStore, compStore, text, answer, oldKey) => {
  switch (event) {
    case CONNECTION:
        return {
            event: 'connection',
            username: userStore.username,
            key: Date.now(),
            id: userStore.id,
        }
    case REQUEST:
        switch (answer) {
            case undefined:
                return {        
                    event: 'request',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    message: text,
                    compId: compStore.id,
                    chatId: compStore.chatId,
                    compStoreInfo: userStore
                }
            case true:
                return {        
                    event: 'request',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.id,
                    chatId: compStore.chatId,
                    answer: true
                }
            case false:
                return {        
                    event: 'request',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.id,
                    chatId: compStore.chatId,
                    answer: false
                }
            case 'cancel':
                return {        
                    event: 'request',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.compId,
                    chatId: compStore.chatId,
                    answer: 'cancel'
                }
            default:
                break;
        }
    case EDIT:
        return {
            event: 'edit',
            username: userStore.username,
            key: Number(oldKey),
            id: userStore.id,
            message: text,
            compId: compStore.id,
            chatId: compStore.chatId,
            attachment: '',
            avatar: userStore.avatar,
            isUpdated: true,
            isUpdating: true,
            updatedAt: ''
        }
    case MESSAGE:
        return {
            event: 'message',
            username: userStore.username,
            key: Date.now(),
            id: userStore.id,
            message: text,
            compId: compStore.id,
            chatId: compStore.chatId,
            attachment: '',
            avatar: compStore.avatar,
            isUpdated: false,
            isUpdating: false
          }
    case DELETECHAT:
        switch (answer) {
            case undefined:
                return {        
                    event: 'deleteChat',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.id,
                    chatId: compStore.chatId
                }
            case true:
                return {        
                    event: 'deleteChat',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.id,
                    chatId: compStore.chatId,
                    answer: true,
                }
            case false:
                return {        
                    event: 'deleteChat',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.compId,
                    chatId: compStore.chatId,
                    answer: false
                }
            case 'cancel':
                return {        
                    event: 'deleteChat',
                    username: userStore.username,
                    key: Date.now(),
                    id: userStore.id,
                    compId: compStore.compId,
                    chatId: compStore.chatId,
                    answer: 'cancel'
                }
            default:
                break;
        }
    case DISCONNECT:
        return {
            event: 'disconnect',
            username: userStore.username,
            key: Date.now(),
            id: userStore.id,
            compId: compStore.id,
            chatId: compStore.chatId,
        }
    default:
      break;
  }
}

