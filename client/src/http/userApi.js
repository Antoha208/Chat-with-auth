import jwt_decode from 'jwt-decode'

import {$host , $authHost} from './index'

export const registration = async (username, password) => {
    const {data} = await $host.post('api/registration', {username, password, role: 'User'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
} 

export const check = async () => {
    const {data} = await $authHost.get('/api/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
} 

export const getUsers = async () => {
    const {data} = await $authHost.get('/api/users')
    return data
} 


