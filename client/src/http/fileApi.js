import {$authHost} from './index'

export const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const {data} = await $authHost.post('/api/files/upload', formData)
    return data.user.avatar
}

export const deleteAvatar = async () => {
    const {data} = await $authHost.delete('/api/files/delete')
    return data
} 

export const uploadAttachment = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const {data} = await $authHost.post('/api/files/upload/file', formData)
    return data
}

export const deleteAttachment = async (file) => {
    const {data} = await $authHost.delete('/api/files/delete/file/' + file)
    return data
} 