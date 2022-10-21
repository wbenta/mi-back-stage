import request from '@/utils/request'
import qs from 'qs'
export const recycle = () => {
  return request.get('api/recycle')
}
export const reduction = (title, item) => {
  return request({
    method: 'post',
    url: '/my/reduction',
    data: qs.stringify({
      title,
      item
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const deleterow = (title, item) => {
  return request({
    method: 'post',
    url: '/my/deleterow',
    data: qs.stringify({
      title,
      item
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
