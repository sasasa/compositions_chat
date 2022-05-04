<template>
  <div>
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <input type="email" required placeholder="メールアドレス" v-model="email">
      <input type="password" required placeholder="パスワード" v-model="password">
      <div class="error">{{ error }}</div>
      <button>ログインする</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { setItem } from '../auth/setItem'
import { ref, defineEmits, } from 'vue'

const emits = defineEmits(['redirectToChatRoom'])
const email = ref('')
const password = ref('')
const error = ref(null)
const login = async() => {// eslint-disable-line no-unused-vars
  error.value = null
  try {
    const res = await axios.post('http://localhost:3000/auth/sign_in', {
      email: email.value,
      password: password.value,
      }
    )
    if (!res) {
      throw new Error('メールアドレスかパスワードが違います')
    }
    if (!error.value) {
      console.log({ res })
      setItem(res.headers, res.data.data.name)
      emits('redirectToChatRoom')
    }
    return res
  } catch (e) {
    console.log({ e })
    error.value = 'メールアドレスかパスワードが違います'
  }
}
</script>