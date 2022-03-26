<template>
  <div>
    <h1>こんにちは {{ $auth.user.username }}さん</h1>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
  },
})
</script>
