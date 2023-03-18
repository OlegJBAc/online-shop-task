import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import authUser from './middlewares/authUser'
import store from '../store'
import Home from "@/components/pages/Home.vue";
import Products from "@/components/pages/Products.vue";
import NotFound from "@/components/pages/NotFound.vue";

const routes = [
  {
    path: '/',
    name: 'main',
    component: App,
    meta: {
      middleware: [
        authUser,
      ]
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      middleware: [
        authUser, // Сделано для принудительной переадресации на единственную рабочую страницу,
                  // если надо будет на Home попсть, то нужно просто удалить middleware из роута.
      ]
    },
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()

  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context
  })
})



export default router
