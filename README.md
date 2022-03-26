# nuxt-auth-example

nuxt-auth と fastify-passportで認証の仕組みを作ったサンプル


## 概要


フロントエンドは[Nuxt.js](https://nuxtjs.org/ja/)で認証ライブラリは [nuxt/auth](https://auth.nuxtjs.org/)で
バックエンドは[fastify](https://www.fastify.io/)で認証ライブラリは[fastify-passport](https://www.npmjs.com/package/fastify-passport)で構成している。


```

Nuxt.js                                                       fastify
  └──nuxt/auth  <---> fastify-passport(passport-http-bearer) --┘

```