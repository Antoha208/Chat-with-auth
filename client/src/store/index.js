import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'
import { usersListReducer } from './usersListReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    isAuth: authReducer,
    user: userReducer,
    users: usersListReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store) 
