<template>
  <div class="step-container">
    <div class="bar">
      <a-popover v-model:visible="addNoteVisible" @openChange="handlePlanChange" title="添加规划" trigger="click"
                 placement="leftTop">
        <template #content>
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            style="width: 400px"
          >
            <a-form-item
              label="标题"
              name="标题"
            >
              <a-input id="note_add_title" v-model:value="formState.title" size="small" style="width: 350px"/>
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
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6" v-for="item in list">
        <div class="gutter-box">
          <div class="title">
            {{ item.title }}
          </div>
          <a-steps
            progress-dot
            direction="vertical"
            :current="item.current"
            :items="item.steps"
            @change="stepChange(item,$event)"
          ></a-steps>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {PlusOutlined} from "@ant-design/icons-vue";
import {reactive, ref} from "vue";
import {addNote} from "@/axios";
interface FormState {
  title: string;
}

const addNoteVisible = ref<boolean>(false);
const list = ref([
  {
    title: '计划1',
    current: -1,
    steps: [
      {
        title: 'Finished',
        description: 'This is a description. This is a description.',
      },
      {
        title: 'Finished',
        description: 'This is a description. This is a description.',
      },
      {
        title: 'In Progress',
        description: 'This is a description. This is a description.',
      }
    ]
  },
  {
    title: '计划2',
    current: -1,
    steps: [
      {
        title: 'Finished',
        description: 'This is a description. This is a description.',
      },
      {
        title: 'Finished',
        description: 'This is a description. This is a description.',
      },
      {
        title: 'In Progress',
        description: 'This is a description. This is a description.',
      }
    ]
  }
]);
const formState = reactive<FormState>({
  title: ''
});

const handlePlanChange = (isOpen: boolean) => {
  if (isOpen) {
    formState.title = '';
  }
}

const stepChange = (step: any, value: number) => {
  step.current = value;
}

const saveNote = () => {
  if (!formState.title) {
    return;
  }
  addNote(formState).then(() => {
    // getAllNotes();
    addNoteVisible.value = false;
  })
}
</script>

<style scoped>
.step-container {
  padding: 50px;
  height: calc(100% - 100px);
  overflow-y: auto;
}

.bar {
  margin-bottom: 30px;
}

.save-btn-layout {
  text-align: right;
}

.gutter-box {
  border: 1px solid #000000;
  padding: 24px;
  margin-bottom: 20px;
  height: 600px;
  overflow-y: auto;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
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
