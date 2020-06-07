import request from '@/util/request'

export function getData (query) {
  return request({
    url: '/api/admin/permissions',
    method: 'get',
    params: query,
  })
}
