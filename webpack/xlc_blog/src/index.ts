import { createApp } from 'vue'
import App from './App';
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './router/index';
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#root');