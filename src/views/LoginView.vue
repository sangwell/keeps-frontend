<template>
  <div class="about">
    <h1>Login Page</h1>

    <button type="button" @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const login = () => {
  router.push('/home');
}

</script>

<style>

</style>
