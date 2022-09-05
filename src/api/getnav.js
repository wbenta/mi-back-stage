import request from '@/utils/request'
import qs from 'qs'
export const getnav = () => {
  return request.get('api/nav')
}
export const insertnav = (title, src) => {
  console.log({ title, src })
  return request({
    method: 'post',
    url: '/my/insertnav',
    data: qs.stringify({
      title,
      src
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
