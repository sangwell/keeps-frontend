<template>
  <div class="note-box">
    <div class="title">
      <span class="main">{{ props.note.title }}</span>
      <a-popconfirm placement="right" title="确认删除？" ok-text="删除" cancel-text="取消"
                    @confirm="delNote()">
        <CloseOutlined class="delete-icon"/>
      </a-popconfirm>

      <EditOutlined class="edit-icon"/>
    </div>
    <div class="detail">
      {{ props.note.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {CloseOutlined, EditOutlined} from "@ant-design/icons-vue";
import {deleteNote} from "@/axios/note.ts";

const props = defineProps<{
  note: { id: string; title: string, content: string }
}>()

const emits = defineEmits(['reload']);

const delNote = () => {
  const id = props.note.id;
  deleteNote(id).then(() => {
    emits('reload');
  });
}
</script>

<style scoped>
.note-box {
  height: 400px;
  background: #ffffff;
  border: 1px solid #d7f1ca;

  .title {
    background: #d7f1ca;
    position: relative;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
    padding: 0 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .main {
      width: calc(100% - 50px);
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .delete-icon {
    position: absolute;
    right: 7px;
    margin-top: 7px;
    cursor: pointer;
    opacity: 0.3;
  }

  .edit-icon {
    position: absolute;
    right: 23px;
    margin-top: 6px;
    margin-right: 8px;
    cursor: pointer;
    opacity: 0.3;
  }

  .detail {
    height: calc(100% - 42px);
    overflow-y: auto;
    padding: 6px;
  }
}

.note-box:hover {
  .delete-icon {
    opacity: 1;
  }

  .edit-icon {
    opacity: 1;
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
