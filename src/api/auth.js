import request from '@/util/request'

export function login (data) {
  console.log(process.env.APP_BASE_API)
  return request({
    url: '/api/auth/login',
    method: 'post',
    data,
  })
}

export function getInfo (token) {
  return request({
    url: '/api/auth/me',
    method: 'get',
    params: { token },
  })
}

export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post',
  })
}
