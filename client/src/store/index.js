import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'
import { usersListReducer } from './usersListReducer'

const rootReducer = combineReducers({
    isAuth: authReducer,
    user: userReducer,
    users: usersListReducer
})

export const store = createStore(rootReducer, composeWithDevTools()) 
