<template>
  <base-material-snackbar
    v-model="getNotify.show"
    :type="getNotify.type"
    v-bind="{
      [parsedDirection[0]]: true,
      [parsedDirection[1]]: true
    }"
  >
    {{ getNotify.message }}
  </base-material-snackbar>
</template>

<script>

  export default {
    name: 'Notify',
    data () {
      return {
        direction: 'top right',
      }
    },
    computed: {
      getNotify () {
        return this.$store.state.notify
      },
      parsedDirection () {
        return this.direction.split(' ')
      },
    },
  }
</script>
