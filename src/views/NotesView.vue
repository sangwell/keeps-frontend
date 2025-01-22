<template>
  <div class="note-container">
    <div class="bar">
      <a-popover v-model:visible="addNoteVisible" @openChange="handlePlanChange" title="添加便笺" trigger="click"
                 placement="leftTop">
        <template #content>
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            style="width: 700px"
          >
            <a-form-item
              label="标题"
              name="标题"
            >
              <a-input id="note_add_title" v-model:value="formState.title" size="small" style="width: 550px"/>
            </a-form-item>

            <a-form-item
              label="内容"
              name="内容"
            >
              <a-textarea id="note_add_content"
                v-model:value="formState.content"
                size="small"
                style="width: 550px;max-width: 550px"
                :auto-size="{ minRows: 15, maxRows: 15 }"
              />
            </a-form-item>

            <a-form-item
              label="链接"
              name="链接"
            >
              <a-input id="note_add_url" v-model:value="formState.url" size="small" style="width: 550px"/>
            </a-form-item>
          </a-form>
          <div class="save-btn-layout">
            <a-button id="note_save_btn" type="primary" size="small" class="save-btn" @click="saveNote">确认</a-button>
          </div>
        </template>
        <a-button id="note_add_btn" type="primary" shape="circle">
          <template #icon>
            <plus-outlined/>
          </template>
        </a-button>
      </a-popover>
    </div>

    <div class="note-list">
      <a-row :gutter="16">
        <a-col v-for="note in noteList" class="note-row" :span="6">
          <NoteCard :note="note" @reload="getAllNotes"/>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue';
import {PlusOutlined} from "@ant-design/icons-vue";
import NoteCard from "@/components/NoteCard.vue";
import {getNotes, addNote} from "@/axios/note.ts";

interface FormState {
  title: string;
  content: string;
  url: string;
}

const addNoteVisible = ref<boolean>(false);
const noteList = ref<{ title: string, content: string }>([]);
const formState = reactive<FormState>({
  title: '',
  content: '',
  url: ''
});

onMounted(() => {
  getAllNotes();
})

const getAllNotes = () => {
  getNotes().then((res) => {
    noteList.value = res.data;
  })
}

const handlePlanChange = (isOpen: boolean) => {
  if (isOpen) {
    formState.title = '';
    formState.content = '';
    formState.url = '';
  }
}

const saveNote = () => {
  if (!formState.title || !formState.content) {
    return;
  }
  addNote(formState).then(() => {
    getAllNotes();
    addNoteVisible.value = false;
  })
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

.save-btn-layout {
  text-align: right;
}

/* 修改整个滚动条的样式 */
::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
  height: 5px;
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
