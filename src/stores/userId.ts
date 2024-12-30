import {defineStore} from 'pinia';

export const userIdStore = defineStore('userIdStore', {
  state: () => ({
    userId: Math.random().toString(36).substr(2, 9)
  }),
  actions: {
    getUserId() {
      return this.userId;
    }
  }
})
