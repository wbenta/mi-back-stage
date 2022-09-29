import request from '@/utils/request'
import qs from 'qs'

export const setgoods = (form) => {
  return request({
    method: 'post',
    url: '/my/goodsinfo/setgoods',
    data: qs.stringify({
      form
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
