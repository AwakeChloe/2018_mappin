import Vue from 'vue'
import Router from 'vue-router'

const makePoint = resolve => require(['../view/makePoint'], resolve)
const me = resolve => require(['../view/myMessage'], resolve)
const login = resolve => require(['../view/login'], resolve)
const secretChange = resolve => require(['../view/secretChange'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/makePoint',
      name: 'makePoint',
      component: makePoint
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/secretChange',
      name: 'secretChange',
      component: secretChange
    }
  ]
})
