<template>
  <div class="note-container">
    <div class="bar">
      <a-button type="primary" shape="circle" @click="addNote">
        <template #icon>
          <plus-outlined/>
        </template>
      </a-button>
    </div>

    <div class="note-list">
      <a-row :gutter="16">
        <a-col v-for="note in noteList" class="note-row" :span="6">
          <NoteCard :note="note"/>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {PlusOutlined} from "@ant-design/icons-vue";
import NoteCard from "@/components/NoteCard.vue";

const noteList = ref<{ title: string, content: string }>([]);

onMounted(() => {
  noteList.value = [
    {
      title: "AAA",
      content: "BBB"
    },
    {
      title: "AAA2",
      content: "BBB2"
    }
  ];
})

const addNote = () => {
  noteList.value.unshift({
    title: "AAA2",
    content: "BBB2"
  });
}

</script>

<style scoped>
.note-container {
  height: calc(100vh - 100px);
  padding: 50px;
}

.bar {
  margin-bottom: 30px;
}

.note-list {
  height: calc(100vh - 112px);
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.note-row {
  margin-bottom: 18px;
}

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

  .detail {
    height: calc(100% - 42px);
    overflow-y: auto;
    padding: 6px;
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
