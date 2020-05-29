export default function sendNotify ($notify) {
  this.$store.commit('SET_NOTIFY', $notify)
}
