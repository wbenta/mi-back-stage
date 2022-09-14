import request from '@/utils/request'
import qs from 'qs'
export const getnav = () => {
  return request.get('api/nav')
}
export const insertnav = (title, src) => {
  return request({
    method: 'post',
    url: '/my/nav/insert',
    data: qs.stringify({
      title,
      src
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const updatenav = (title, src, id) => {
  console.log({ title, src, id })
  return request({
    method: 'post',
    url: '/my/nav/update',
    data: qs.stringify({
      title,
      src,
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const deletenav = (id) => {
  return request({
    method: 'post',
    url: '/my/nav/delete',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const setSwiper = (id) => {
  return request({
    method: 'post',
    url: '/my/setswiper',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
