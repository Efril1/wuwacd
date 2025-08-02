// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
    colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode', 
    hid: 'nuxt-color-mode-script', 
  },
  vite: {
  plugins: [
    tailwindcss(),
  ],
},

  modules: ['@pinia/nuxt','@nuxt/ui'],
})