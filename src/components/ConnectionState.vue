<template>
  <p>State: {{ connected }}</p>
</template>

<script setup lang="ts">
import { state } from "../socket/socket.ts";
import {computed} from "vue";

const connected = computed(()=>{
  return state.connected;
})
</script>

<style scoped>

</style>
