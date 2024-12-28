<template>
  <form @submit.prevent="onSubmit">
    <input v-model="value" />

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import {socket} from "../socket/socket.ts";
import {ref} from "vue";

const isLoading = ref(false);
const value = ref("");

const onSubmit = () => {
  isLoading.value = true;
  socket.emit("chat", value.value, () => {
    isLoading.value = false;
  });
}

</script>

<style scoped>

</style>
