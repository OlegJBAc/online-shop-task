import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'

require('./API/instance')

const app =  createApp(App)

app
    .use(store)
    .use(router)
    .provide('test', 'HELLLOOOOOOOO')
    .mount('#app')
