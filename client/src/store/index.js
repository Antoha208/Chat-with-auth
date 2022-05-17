import { createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'
import { usersListReducer } from './usersListReducer'
import { companionReducer } from './companionReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    isAuth: authReducer,
    user: userReducer,
    companion: companionReducer,
    users: usersListReducer,
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
