const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://notion-blog.netlify.app'
    : 'http://localhost:8888'
export default {
  target: 'static',
  head: {
    title: 'blog-notion-api',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/composition-api/module',
  ],
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: `${BASE_URL}/.netlify/functions`,
  },
  build: {},
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page',
        path: '/blog/:pageId/:slug',
        component: resolve(__dirname, 'pages/blog/Page.vue'),
      })
    },
  },
}
