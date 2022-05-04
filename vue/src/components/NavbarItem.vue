<template>
  <nav>
    <div>
      <p>こんにちは、<span class="name">{{ name }}</span>さん</p>
      <p class="email">現在、 {{ email }} でログイン中です</p>
      <div class="error">{{ error }}</div>
    </div>
    <button @click="logout">ログアウト</button>
  </nav>
</template>

<script setup>
import axios from 'axios'
import { removeItem } from '../auth/removeItem'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref(window.localStorage.getItem('name'))// eslint-disable-line no-unused-vars
const email = ref(window.localStorage.getItem('uid'))
const error = ref(null)
const logout = async() => {// eslint-disable-line no-unused-vars
  error.value = null
  try {
    const res = await axios.delete('http://localhost:3000/auth/sign_out', {
      headers: {
        uid: email.value,
        "access-token": window.localStorage.getItem('access-token'),
        client: window.localStorage.getItem('client')
      }
    })
    if (!res) {
      new Error('ログアウトできませんでした')
    }
    if (!error.value) {
      console.log("ログアウトしました")
      removeItem()
      router.push({ name: 'MyWelcome' })
    }
    return res
  } catch (e) {
    console.log({ e })
    error.value = 'ログアウトできませんでした'
  }
}
</script>


<style scoped>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>