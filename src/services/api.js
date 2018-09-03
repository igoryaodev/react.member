// import { stringify } from 'qs'
import request from './request'

/*
* @ 票务列表
* @ Product
*/

export function queryProductList(params) {
  return request(`/api/product`, {
    method: 'GET',
    params: params,
  })
}

