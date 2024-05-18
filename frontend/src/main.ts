import { createApp } from 'vue'
import './assets/scss/main.scss'
import App from './App.vue'
import router from './routes'
import { key, store } from './store'

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
