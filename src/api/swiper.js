import request from '@/utils/request'
import qs from 'qs'

export const getswiper = () => {
  return request.get('api/getswiper')
}
export const setSwiper = (url) => {
  return request({
    method: 'post',
    url: '/my/setswiper',
    data: qs.stringify({
      url
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const deleteSwiper = (id) => {
  return request({
    method: 'post',
    url: '/my/deleteswiper',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const updateswiperhref = (href, id) => {
  return request({
    method: 'post',
    url: '/my/updateswiperhref',
    data: qs.stringify({
      href,
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
