import { createRouter, createWebHistory } from 'vue-router'
import MyWelcome from '../views/MyWelcome'
import MyChatroom from '../views/MyChatroom'
import useValidate from '../auth/validate'

const { error, validate } = useValidate()
const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('access-token')

  if (!uid || !client || !accessToken) {
    console.log('ログインしていません')
    next({ name: 'MyWelcome' })
    return
  }
  await validate()
  if (error.value) {
    console.log('認証に失敗しました')
    next({ name: 'MyWelcome' })
  } else {
    next()
  }
}
const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('access-token')
  if (!uid && !client && !accessToken) {
    next()
    return
  }
  await validate()
  if (!error.value) {
    next({ name: 'MyChatroom' })
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'MyWelcome',
    component: MyWelcome,
    beforeEnter: noRequireAuth,
  },
  {
    path: '/my-chatroom',
    name: 'MyChatroom',
    component: MyChatroom,
    beforeEnter: requireAuth,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
