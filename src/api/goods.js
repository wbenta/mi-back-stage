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
export const getgoodslist = (id) => {
  return request.get('api/getgoodslist', {
    params: {
      id
    }
  })
}
export const deleteBiglogo = (id) => {
  return request({
    method: 'post',
    url: '/my/goodsinfo/deletebiglogo',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const deleteSmalllogo = (id) => {
  return request({
    method: 'post',
    url: '/my/goodsinfo/deletesmalllogo',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const deleteGoodsItem = (id) => {
  return request({
    method: 'post',
    url: '/my/goodsinfo/deletegoodsitem',
    data: qs.stringify({
      id
    }),
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
