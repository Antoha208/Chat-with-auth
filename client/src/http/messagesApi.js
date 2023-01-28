import {$authHost} from './index.js'


export const addMessage = async (_id, event, username, message, avatar, id) => {
    const {data} = await $authHost.post('/api/chats/message/add/' + _id, {event, username, message, avatar, id})
    return data
}

// export const deleteOneMessage = async (_id, objectId) => {
//     const {data} = await $authHost.delete('/api/chats/message/deleteOne/' + `${_id}/` + objectId)
//     return data
// } 

export const deleteAllMessagesFromChat = async (_id) => {
    const {data} = await $authHost.delete('/api/chats/message/deleteAllFromChat/' + _id)
    return data
} 

// export const updateMessage = async (_id, objectId, message) => {
//     const {data} = await $authHost.put('/api/chats/message/updateOne/' + `${_id}/` + objectId, {message}) 
//     return data
// } 

export const getMessages = async (_id) => {
    const {data} = await $authHost.get('/api/chats/message/getMessages/' + _id)
    return data
} 
