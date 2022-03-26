<template>
  <div>
    <h1>Hello world</h1>

    <nuxt-link to="/login">ログイン</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  auth: false,
})
</script>
