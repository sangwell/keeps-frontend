<template>
  <div class="chat-layout">
    <div class="rooms">
      <ul class="room-list">
        <li v-for="item in rooms">{{ item }}</li>
      </ul>
    </div>
    <div class="chat-window">
      <div class="chat-content">
        <ul class="message-list">
          <li v-for="item in messages" :class="{'text-right':item.userId===userId}">
            <span>{{ item.msg }}</span>
          </li>
        </ul>
      </div>
      <div class="chat-input">
        <form @submit.prevent="onSubmit">
          <a-input-group compact>
            <a-input v-model:value="text" class="chat-text"/>
            <a-button type="primary" html-type="submit">发送</a-button>
          </a-input-group>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {socket} from "../socket/socket.ts";
import {ref, onMounted} from "vue";
import {userIdStore} from "@/stores/userId.ts";

const isLoading = ref(false);
const text = ref("");
const userId = ref("");
const rooms = ref(['room1', 'room2', 'room3']);
const messages = ref([
  // {msg: '你好', userId: 'me'},
  // {msg: '我叫Jim', userId: 'me'}
]);

const onSubmit = () => {
  isLoading.value = true;
  socket.emit("chat", {msg: text.value, userId: userId.value}, () => {
    isLoading.value = false;
  });
  text.value = "";
}

onMounted(() => {
  userId.value = userIdStore().getUserId();
  socket.on("chat", (message) => {
    messages.value.push(message);
  });
})

</script>

<style scoped>
.chat-layout {
  width: 800px;
  height: 700px;
  border: 1px solid #cccccc;
  margin: 30px 0;
}

.rooms {
  height: 100%;
  width: 200px;
  border-right: 1px solid #cccccc;
  float: left;
  overflow: auto;
}

.room-list {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    height: 50px;
    border-bottom: 1px solid #cccccc;
    line-height: 50px;
    padding: 0 12px;
  }
}

.text-right {
  text-align: right;
}

.message-list {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    height: 50px;
    line-height: 50px;
    padding: 0 12px;

    span {
      background: #52c41a;
      color: #ffffff;
      padding: 6px 15px;
      border-radius: 16px;
    }
  }
}

.chat-window {
  height: 100%;
  float: left;
  width: calc(100% - 201px);
}

.chat-content {
  height: calc(100% - 51px);
  overflow: auto;
}

.chat-input {
  height: 50px;
  border-top: 1px solid #cccccc;
  padding: 10px;
}

.chat-text {
  width: calc(100% - 63px);
}

/* 修改整个滚动条的样式 */
::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

/* 修改滚动条的滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #c1c1c1; /* 滑块颜色 */
  border-radius: 5px; /* 滑块圆角 */
}

/* 修改滚动条的轨道样式 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 轨道颜色 */
}
</style>
