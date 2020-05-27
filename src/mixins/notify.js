export default {
  created: function () {
  },
  methods: {
    sendNotify: function ($notify) {
      this.$store.commit('SET_NOTIFY', $notify)
    },
  },
}
