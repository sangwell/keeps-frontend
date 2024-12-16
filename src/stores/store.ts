import {ref} from 'vue';
import {defineStore} from 'pinia';

export const userStore = defineStore('userStore', () => {
  const isAuthenticated = ref(false)

  function login() {
    isAuthenticated.value = true;
  }

  return { isAuthenticated, login }
})
