<template>
  <div>
    <h2>アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <input type="text" required placeholder="名前" v-model="name">
      <input type="email" required placeholder="メールアドレス" v-model="email">
      <input type="password" required placeholder="パスワード" v-model="password">
      <input type="password" required placeholder="パスワード（確認用）" v-model="passwordConfirmation">
      <div class="error">{{ error }}</div>
      <button>登録する</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { setItem } from '../auth/setItem'
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['redirectToChatRoom'])
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref(null)
const signUp = async() => {
  error.value = null
  try {
    const res = await axios.post('http://localhost:3000/auth', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
      }
    )
    if (!res) {
      throw new Error('アカウントを登録できませんでした')
    }
    if (!error.value) {
      setItem(res.headers, res.data.data.name)
      emits('redirectToChatRoom')
    }
    console.log({ res })
    return res
  } catch (e) {
    console.log({ e })
    error.value = 'アカウントを登録できませんでした'
  }
}
</script>