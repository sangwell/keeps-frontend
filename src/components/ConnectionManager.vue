<template>
  <button @click="connect()">Connect</button>
  <button @click="disconnect()">Disconnect</button>
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

</style>
