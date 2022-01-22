export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PORTAL ZIP PK',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/webAssets/images/favicon.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/webAssets/images/favicon.png' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assests/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/helpers.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/',
    // baseURL: 'https://scilipback.copyclutch.com/',
  },

  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "active",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
