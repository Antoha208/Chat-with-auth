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