import {$authHost} from './index'


export const createNewChat = async (_id, ids, usernames, avatars) => {
    const {data} = await $authHost.post('/api/chats/create/' + _id, {ids, usernames, avatars})
    return data
}

export const deleteAllChats = async (_id) => {
    const {data} = await $authHost.delete('/api/chats/deleteAll/' + _id)
    return data
} 

export const deleteOneChat = async (_id, objectId) => {
    const {data} = await $authHost.delete('/api/chats/deleteOne/' + `${_id}/` + objectId)
    return data
} 

export const getChats = async (_id) => {
    const {data} = await $authHost.get('/api/chats/getChats/' + _id)
    return data
} 