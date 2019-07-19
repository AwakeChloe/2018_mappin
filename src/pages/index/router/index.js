import Vue from 'vue'
import Router from 'vue-router'

const makePoint = resolve => require(['../view/makePoint'], resolve)
const myMessage = resolve => require(['../view/myMessage'], resolve)
const login = resolve => require(['../view/login'], resolve)
const watchPoint = resolve => require(['../view/watchPoint'], resolve)
const personalMessage = resolve => require(['../view/personalMessage'], resolve)
const accountSafe = resolve => require(['../view/accountSafe'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: '/makePoint'
    },
    {
      path: '/makePoint',
      name: 'makePoint',
      component: makePoint
    },
    {
      path: '/myMessage',
      name: 'myMessage',
      component: myMessage
    },
    {
      path: '/myMessage/personalMessage',
      name: 'personalMessage',
      component: personalMessage
    },
    {
      path: '/myMessage/accountSafe',
      name: 'accountSafe',
      component: accountSafe
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/watchPoint',
      name: 'watchPoint',
      component: watchPoint
    }
  ]
})
