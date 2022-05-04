<template>
  <div class="chat-window">
    <div v-if="messages" class="messages" ref="messagesPane">
      <ul v-for="message in messages" :key="message.id">
        <li :class="{ received: message.email !== uid, sent: message.email === uid }">
          <span class="name">{{ message.name }}</span>
          <div class="message" @dblclick="handleLike(message)">
            {{ message.content }}
            <div v-if="message.likes.length" class="heart-container">
              <font-awesome-icon icon="heart" class="heart" />
              <span class="heart-count">{{ message.likes.length }}</span>
            </div>
          </div>
          <span class="created-at">{{ message.created_at }}前</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, defineEmits, defineProps, defineExpose } from 'vue'

const emits = defineEmits(['connectCable'])
const props = defineProps({// eslint-disable-line no-unused-vars
  messages: {
    type: Array,
    required: true
  },
})
const messagesPane = ref(null)
const uid = ref(localStorage.getItem('uid'))

const handleLike = (message) => {
  for (let i = 0; i < message.likes.length; i++) {
    const like = message.likes[i]
    if (like.email === uid.value) {
      deleteLike(like.id, message.id)
      return
    }
  }
  createLike(message.id)
}
const createLike = async(messageId) => {
  try {
    const res = await axios.post(`http://localhost:3000/messages/${messageId}/likes`, {},
      {
        headers: {
          uid: uid.value,
          "access-token": window.localStorage.getItem('access-token'),
          client: window.localStorage.getItem('client')
        }
      })
    if (!res) {
      new Error('いいねできませんでした')
    }
    emits('connectCable')
  } catch (e) {
    console.log({e})
  }
}
const deleteLike = async(likeId) => {
  try {
    const res = await axios.delete(`http://localhost:3000/likes/${likeId}`,
      {
        headers: {
          uid: uid.value,
          "access-token": window.localStorage.getItem('access-token'),
          client: window.localStorage.getItem('client')
        }
      })
    if (!res) {
      new Error('いいねを削除できませんでした')
    }
    emits('connectCable')
  } catch (e) {
    console.log(e)
  }
}
const scrollToBottom = () => {// eslint-disable-line no-unused-vars
  const element = messagesPane.value
  element.scrollTop = element.scrollHeight
}
defineExpose({
  scrollToBottom,
});
</script>



<style scoped>
  .chat-window {
    background: white;
    padding: 30px 20px;
    border-bottom: 1px solid #eee;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    display:inline-block;
    clear: both;
  }
  .received .message {
    background: #eee;
    padding: 10px;
    display: inline-block;
    border-radius: 30px;
    margin-bottom: 2px;
    max-width: 400px;
  }
  .received {
    float: left;
  }
  .sent {
    float: right;
  }
  .sent .message {
    background: #677bb4;
    color: white;
    padding: 10px;
    display: inline-block;
    border-radius: 30px;
    margin-bottom: 2px;
    max-width: 400px;
  }
  .name {
    position: relative;
    margin-right: 6px;
    display: block;
    font-size: 13px;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 20px;
    margin-left: 4px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
  .message {
    position: relative;
  }
  .heart-container {
    background: white;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 30px;
    min-width: 25px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(245, 245, 245);
    padding: 1px 2px;
    z-index: 2;
    bottom: -7px;
    right: 0px;
    font-size: 9px;
  }
  .heart {
    color: rgb(236, 29, 29);
  }
  .heart-count {
    color: rgb(20, 19, 19);
  }
  .received .message::selection {
    background: #eee;
  }

  .sent .message::selection {
    background: #677bb4;
  }
</style>