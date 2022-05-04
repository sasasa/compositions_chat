<template>
  <div class="container">
    <NavbarItem />
    <ChatWindow
      @connectCable="connectCable"
      v-bind:messages="formattedMessages"
      ref="chatWindow" />
    <NewChatForm
      @connectCable="connectCable" />
  </div>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem'
import ChatWindow from '../components/ChatWindow'
import NewChatForm from '../components/NewChatForm'
import axios from 'axios'
import ActionCable from 'actioncable'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const messages = ref([])
const chatWindow = ref(null)
const formattedMessages = computed(() => {
  if (!messages.value.length) { return [] }
  return messages.value.map(message => {
    let time = formatDistanceToNow(new Date(message.created_at), { locale: ja })
    return { ...message, created_at: time }
  })
})
let messageChannel = null
onMounted(() => {
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  messageChannel = cable.subscriptions.create('RoomChannel', {
    connected: () => {
      getMessages().then(() => {
        chatWindow.value.scrollToBottom()
      })
    },
    received: () => {
      getMessages().then(() => {
        chatWindow.value.scrollToBottom()
      })
    }
  })
})
onBeforeUnmount(() => {
  messageChannel.unsubscribe()
})
const connectCable = (message) => {
  messageChannel.perform('receive', {
    message: message,
    email: window.localStorage.getItem('uid')
  })
}
const getMessages = async() => {
  try {
    const res = await axios.get('http://localhost:3000/messages', {
      headers: {
        uid: window.localStorage.getItem('uid'),
        "access-token": window.localStorage.getItem('access-token'),
        client:window.localStorage.getItem('client')
      }
    })
    if (!res) {
      new Error('メッセージ一覧を取得できませんでした')
    }
    messages.value = res.data
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
</style>