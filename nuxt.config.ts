// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'vue3-toastify/dist/index.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
  ],

  imports: {
    autoImport: true
  },

  runtimeConfig: {
    public: {
      socketURI: process.env.NUXT_PUBLIC_SOCKET_BASE_URL
    }
  },
})
