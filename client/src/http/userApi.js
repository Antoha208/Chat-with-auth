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

export const addAboutInfo = async (about) => {
    const {data} = await $authHost.post('/api/addAboutInfo', {about})
    return data 
} 

export const removeAboutInfo = async () => {
    const {data} = await $authHost.delete('/api/removeAboutInfo')
    return data 
} 

export const addLogInfo = async (iat, exp) => {
    const {data} = await $authHost.post('/api/addLogInfo', {iat, exp})
    return data 
} 

export const removeLogInfo = async () => {
    const {data} = await $authHost.delete('/api/removeLogInfo')
    return data 
} 

export const getUsers = async () => {
    const {data} = await $authHost.get('/api/users')
    return data
} 

export const getOneUser = async (_id) => {
    const {data} = await $authHost.get('/api/oneUser/' + _id)
    return data
} 

export const deleteAllUsers = async () => {
    const {data} = await $authHost.delete('/api/deleteAll')
    return data
} 

export const deleteOneUser = async (_id) => {
    const {data} = await $authHost.delete('/api/deleteOne/' + _id)
    return data
} 


