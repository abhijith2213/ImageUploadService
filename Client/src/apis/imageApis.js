import privateAxios from '../axiosConfig/private'

export const uploadImage = (data) => privateAxios.put('/image/upload',data)

export const getImages = ()=> privateAxios.get('/image/myImages')


export const getThumbnails = (data) => privateAxios.get(`/image/thumbnails/${data}`)

