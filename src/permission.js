import router from './router'
import { getToken } from '@/util/auth'

router.beforeEach((to, from, next) => {
  // auth
  if (to.matched.some(record => record.meta.auth)) {
    if (getToken() == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      })
    } else {
      // const user = JSON.parse(localStorage.getItem('user'))
      // if (to.matched.some(record => record.meta.is_admin)) {
      //   if (user.is_admin == 1) {
      //     next()
      //   } else {
      //     next({ name: 'userboard' })
      //   }
      // } else {
      //   next()
      // }

      next()
    }
  } else {
    next()
  }
})

export default router
