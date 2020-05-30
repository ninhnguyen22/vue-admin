import store from '@/store'

export function sendNotify ($notify) {
  store.commit('SET_NOTIFY', $notify)
}

export function getNotify ($notify) {
  return store.state.notify
}

export function resetNotify () {
  return store.commit('SET_NOTIFY', { show: false, type: 'info', message: '' })
}
