<template>
  <div>
    <h1>ログインしました。こんにちわ</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
  async asyncData({ $auth }) {
    if (!$auth.loggedIn) {
      return
    }
  },
})
</script>
