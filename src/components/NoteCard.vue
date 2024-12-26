<template>
  <div class="note-box">
    <div class="title">
      <div class="main">
        <span class="inner" v-if="!isEdit"><a :href="props.note.url" target="_blank">{{ props.note.title }}</a></span>
        <a-input v-model:value="props.note.title" size="small"/>
      </div>
      <a-popconfirm v-if="!isEdit" placement="bottom" title="确认删除？" ok-text="删除" cancel-text="取消"
                    @confirm="delNote()">
        <CloseOutlined class="delete-icon"/>
      </a-popconfirm>

      <EditOutlined v-if="!isEdit" class="edit-icon" @click="startEdit"/>

      <check-outlined v-if="isEdit" class="save-btn" @click="saveNote"/>

      <undo-outlined v-if="isEdit" class="undo-btn" @click="undo"/>
    </div>
    <pre class="detail" v-if="!isEdit">
      {{ props.note.content }}
    </pre>
    <div class="detail" v-if="isEdit">
      <a-textarea v-model:value="props.note.content" :rows="16"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CloseOutlined, EditOutlined, CheckOutlined, UndoOutlined} from "@ant-design/icons-vue";
import {deleteNote, updateNote} from "@/axios/note.ts";
import {ref} from 'vue';

const props = defineProps<{
  note: { id: string; title: string, content: string }
}>()

const emits = defineEmits(['reload']);

const isEdit = ref(false);

const startEdit = () => {
  isEdit.value = true;
}

const delNote = () => {
  const id = props.note.id;
  deleteNote(id).then(() => {
    emits('reload');
  });
}

const saveNote = () => {
  const data = {
    id: props.note.id,
    title: props.note.title,
    content: props.note.content
  }
  updateNote(data).then(() => {
    isEdit.value = false;
    emits('reload');
  })
}

const undo = () => {
  isEdit.value = false;
  emits('reload');
}
</script>

<style scoped>
.note-box {
  height: 400px;
  background: #ffffff;
  border: 1px solid #aaaaaa;

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

      .inner {
        width: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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

  .save-btn {
    position: absolute;
    right: 23px;
    margin-top: 6px;
    margin-right: 8px;
    cursor: pointer;
  }

  .undo-btn {
    position: absolute;
    right: 7px;
    margin-top: 6px;
    cursor: pointer;
  }

  .detail {
    height: calc(100% - 42px);
    overflow-y: auto;
    white-space: pre-line;
    font-size: 16px;
    font-family: sans-serif;
    padding: 6px;
    margin: 0;
  }
}

a {
  color: #000000;
}

a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
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
