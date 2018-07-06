import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Inscripciones from '@/pages/Inscripciones/Inscripciones'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inscripciones',
      name: 'Inscripciones',
      component: Inscripciones
    }
  ]
})
