<template>
  <div class="realtime-container">
    实时数据
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import { io } from "socket.io-client";

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
