import request from '@/utils/request'
import qs from 'qs'

export const reg = (form) => {
  return request({
    method: 'post',
    url: '/api/reg',
    data: qs.stringify({
      form
    })
  })
}
export const login = (user, pwd) => {
  return request({
    method: 'post',
    url: '/api/login',
    data: qs.stringify({
      user,
      pwd
    })
  })
}
export const getavatar = () => {
  return request({
    method: 'get',
    url: '/my/userinfo/avatar',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
