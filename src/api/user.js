import request from '@/utils/request'
import qs from 'qs'

export const reg = (form) => {
  return request({
    method: 'post',
    url: '/my/reg',
    data: qs.stringify({
      form
    })
  })
}
