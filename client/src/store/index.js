import { createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import { authReducer } from './authReducer.js'
import { userReducer } from './userReducer.js'
import { usersListReducer } from './usersListReducer.js'
import { companionReducer } from './companionReducer.js'
import { chatsReducer } from './chatsReducer.js'
import { messagesReducer } from './messagesReducer.js'

const rootReducer = combineReducers({
    isAuth: authReducer,
    user: userReducer,
    companion: companionReducer,
    users: usersListReducer,
    chats: chatsReducer,
    messages: messagesReducer,
})

const RESET = 'RESET'

const wrapRootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return rootReducer(state, action);
}

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, wrapRootReducer)

export const resetApp = () => ({type: RESET})
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store) 
