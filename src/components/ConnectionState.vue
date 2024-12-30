<template>
  <h3>
    <span v-if="connected" class="online">在线</span>
    <span v-if="!connected" class="offline">离线</span>
  </h3>
</template>

<script setup lang="ts">
import { state } from "../socket/socket.ts";
import {computed} from "vue";

const connected = computed(()=>{
  return state.connected;
})
</script>

<style scoped>
.online{
  color: #52c41a;
}
.offline{
  color: red;
}
</style>
