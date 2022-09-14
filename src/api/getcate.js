import request from '@/utils/request'
import qs from 'qs'
export const getcate = () => {
  return request.get('api/getcate')
}
export const insertcate = (title, src) => {
  return request({
    method: 'post',
    url: '/my/cate/insert',
    data: qs.stringify({
      title,
      src
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export const updatecate = (title, src, id) => {
  console.log({ title, src, id })
  return request({
    method: 'post',
    url: '/my/cate/update',
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
export const deletecate = (id) => {
  return request({
    method: 'post',
    url: '/my/cate/delete',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
