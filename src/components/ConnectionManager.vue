<template>
  <a-button @click="connect()" class="margin-right">重连</a-button>
  <a-button danger @click="disconnect()">断开连接</a-button>
</template>

<script setup lang="ts">
import {socket} from "../socket/socket.ts";

const connect = () => {
  socket.connect();
}

const disconnect = () => {
  socket.disconnect();
}
</script>


<style scoped>
.margin-right {
  margin-right: 12px;
}
</style>
