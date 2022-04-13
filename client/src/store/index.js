import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
    isAuth: authReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools()) 
