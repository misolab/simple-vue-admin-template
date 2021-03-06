import ls from 'store'
import store from '@/store/'
import { Notification } from 'element-ui'

export default function checkUser(to, from, next) {
  const { dispatch, getters } = store

  if (to.matched.some(record => record.meta.requiresUser)) {
    const token = ls.get('X-Token')
    if (!token) {
      next('/login')
      return
    }

    if (!getters.username) {
      dispatch('GetUserInfo')
        .then(() => {
          next()
        })
        .catch(() => {
          Notification.error({
            title: '인증 오류',
            message: '사용자 정보가 확인되지 않았습니다'
          })
        })
    } else {
      next()
    }
  } else {
    next()
  }
}
