<template>
  <div class="note-container">
    <a-button type="primary" shape="circle">
      <template #icon>
        <plus-outlined/>
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">

import {PlusOutlined} from "@ant-design/icons-vue";
</script>

<style scoped>
.note-container{
  height: calc(100vh - 100px);
  padding: 50px;
}
</style>
