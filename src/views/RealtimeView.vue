<template>
  <div class="realtime-container">
    <h3>实时聊天</h3>
    <ConnectionState></ConnectionState>
    <ConnectionManager></ConnectionManager>
    <ChatForm></ChatForm>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, onUnmounted} from 'vue';
import { io } from "socket.io-client";
import ConnectionState from "@/components/ConnectionState.vue";
import ConnectionManager from "@/components/ConnectionManager.vue";
import ChatForm from "@/components/ChatForm.vue";

onMounted(() => {
  // const socket = io();
  // const socket = io("wss://localhost:8088");
  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
})

</script>

<style scoped>
.realtime-container {
  padding: 30px;
}
</style>
