<template>
  <div class="note-box">
    <div class="title">
      {{ props.note.title }}
      <CloseOutlined class="delete-icon"/>
      <EditOutlined class="edit-icon"/>
    </div>
    <div class="detail">
      {{ props.note.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {CloseOutlined,EditOutlined} from "@ant-design/icons-vue";

const props = defineProps<{
  note: { title: string, content: string }
}>()
</script>

<style scoped>
.note-box {
  height: 400px;
  background: #ffffff;
  border: 1px solid #d7f1ca;

  .title {
    background: #d7f1ca;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
    padding: 0 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .delete-icon {
    display: none;
    float: right;
    margin-top: 6px;
    cursor: pointer;
  }

  .edit-icon{
    display: none;
    float: right;
    margin-top: 6px;
    margin-right: 8px;
    cursor: pointer;
  }

  .detail {
    height: calc(100% - 42px);
    overflow-y: auto;
    padding: 6px;
  }
}

.note-box:hover {
  .delete-icon {
    display: block;
  }
  .edit-icon{
    display: block;
  }
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
