// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', "@nuxt/image", 'shadcn-nuxt',],
  spaLoadingTemplate: 'spa-loading-template.html',
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},

    },

  },
  runtimeConfig: {
    API_BASE_URL: process.env.NUXT_API_BASE_URL,

    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
    }

  },
  imports: {
    dirs: [
      '@/stores/',
      '@/components/ui'
    ]
  },
})