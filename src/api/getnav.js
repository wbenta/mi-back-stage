import request from '@/utils/request'
import qs from 'qs'
export const getnav = () => {
  return request.get('api/nav')
}
export const insertnav = (title, src) => {
  return request({
    method: 'post',
    url: '/my/insertnav',
    data: qs.stringify({
      title,
      src
    })
  })
}
export const updatenav = (title, src, id) => {
  console.log({ title, src, id })
  return request({
    method: 'post',
    url: '/my/updatenav',
    data: qs.stringify({
      title,
      src,
      id
    })
  })
}
export const deletenav = (id) => {
  return request({
    method: 'post',
    url: '/my/deletenav',
    data: qs.stringify({
      id
    })
  })
}
