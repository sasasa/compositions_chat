<template>
  <div>
    <p>これはコンポーネントから表示されています。</p>
    <p>{{ message }}</p>
    <p>{{ isEnabled }}</p>
    <button @click="onClick">親メソッドを実行するボタン</button>
  </div>
</template>

<script>
export default {
  props: ['message', 'isEnabled'],
  methods: {
    onClick() {
      this.$emit('toggle')
    }
  }
}
</script>