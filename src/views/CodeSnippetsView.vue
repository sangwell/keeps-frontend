<template>
  <div class="left-container">
    <a-button block @click="startAdd">
      <PlusOutlined/>
      添加 Code snippets
    </a-button>
    <ul class="code-list">
      <li v-for="(item, index) in codeTitleList" @click="getById(item.id, index)"
          :class="{ active: selectedSnippet === index }">{{ item.title }}
      </li>
    </ul>
  </div>
  <div class="code-container">
    <div class="bar">
      <div>
        <span v-if="codeState === StateEnum.View" class="state-title">预览</span>
        <span v-if="codeState === StateEnum.Add" class="state-title">添加新代码</span>
        <span v-if="codeState === StateEnum.Edit" class="state-title">编辑代码</span>
      </div>
      <div>
        <a-button v-if="codeState === StateEnum.Add" class="save-btn" type="primary" @click="saveAdd">保存</a-button>
        <a-button v-if="codeState === StateEnum.Add" class="save-btn" @click="cancelAdd">取消</a-button>
        <a-button v-if="codeState === StateEnum.View" class="save-btn" type="primary" @click="startEdit">开始编辑
        </a-button>
        <a-button v-if="codeState === StateEnum.Edit" class="save-btn" type="primary" @click="saveEdit">保存编辑
        </a-button>
        <a-button v-if="codeState === StateEnum.Edit" class="save-btn" @click="cancelEdit">取消编辑</a-button>
      </div>
    </div>

    <div class="code-view">
      <a-row :gutter="20">
        <a-col class="gutter-row" :span="16">
          <codemirror
            v-model="formState.code"
            placeholder="Hello World!"
            :style="{ fontSize: '20px', height: 'calc(100vh - 123px)' }"
            :autofocus="true"
            :disabled="false"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions"
            @ready="handleReady"
          />
        </a-col>
        <a-col :span="8">
          <div class="code-title" v-if="codeState === StateEnum.View">{{ formState.title }}</div>
          <div class="code-title" v-if="codeState === StateEnum.Add || codeState === StateEnum.Edit">
            <a-input v-model:value="formState.title" placeholder="输入标题"/>
          </div>
          <pre v-if="codeState === StateEnum.View" class="code-content">
            {{ formState.description }}
          </pre>
          <a-textarea v-if="codeState === StateEnum.Add || codeState === StateEnum.Edit"
                      v-model:value="formState.description"
                      placeholder="输入描述"
                      :rows="40"
                      class="code-textarea"/>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, shallowRef} from 'vue';
import {PlusOutlined} from "@ant-design/icons-vue";
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'
import {addSnippet, getSnippetById, getSnippetsTitles} from "@/axios";

interface FormState {
  title: string;
  description: string;
  code: string;
}

const StateEnum = {
  View: 'view',
  Add: 'add',
  Edit: 'edit'
};

const codeState = ref(StateEnum.View);
const selectedSnippet = ref<number>(-1);
const codeTitleList = ref<{ id: string; title: string }>([]);
const formState = reactive<FormState>({
  title: '',
  description: '',
  code: ''
});

const extensions = [javascript(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

const startAdd = () => {
  codeState.value = StateEnum.Add;
  formState.title = '';
  formState.description = '';
  formState.code = '';
}
const startEdit = () => {
  codeState.value = StateEnum.Edit;
}
const cancelEdit = () => {
  codeState.value = StateEnum.View;
}

const cancelAdd = () => {
  codeState.value = StateEnum.View;
}

const saveAdd = () => {
  addSnippet(formState).then(() => {
    codeState.value = StateEnum.View;
    getAllCodeTitles();
  })
}

const saveEdit = () => {
  codeState.value = StateEnum.View;
}


onMounted(() => {
  getAllCodeTitles();
})

const getAllCodeTitles = () => {
  getSnippetsTitles().then((res) => {
    codeTitleList.value = res.data;
  })
}

const getById = (id: string, index: number) => {
  selectedSnippet.value = index;
  getSnippetById(id).then((res) => {
    const snippet = res.data[0];
    formState.code = snippet.code;
    formState.description = snippet.description;
    formState.title = snippet.title;
  })
}

</script>

<style scoped>
.left-container {
  height: calc(100vh - 100px);
  width: 350px;
  padding: 50px 30px;
  border-right: 1px solid #d5d5d5;
  position: relative;
  float: left;
}

.code-list {
  margin: 0;
  list-style: none;
  padding: 20px 6px;

  li {
    font-size: 14px;
    padding: 4px 6px 4px 8px;
    cursor: pointer;
  }

  li:hover {
    background: #52c41a52;
    border-radius: 6px;
    cursor: pointer;
  }
}

.code-container {
  width: calc(100% - 471px);
  position: relative;
  float: left;
  height: calc(100vh - 100px);
  padding: 50px 30px;
  background: #f3f3f3;
}

.bar {
  display: flex;

  .state-title {
    font-weight: bold;
  }

  div {
    flex: 1;
    padding: 0 0 12px 0;
  }
}

.active {
  color: #000000 !important;
  background: #52c41a52;
  border-radius: 6px;
}

.save-btn {
  float: right;
  margin-left: 10px;
}

.code-view {
  height: calc(100vh - 112px);
  overflow-y: auto;
  overflow-x: hidden;
}

.code-title {
  font-weight: bold;
  font-size: 16px;
}

.code-content {
  white-space: pre-line;
  font-size: 16px;
  font-family: sans-serif;
}

.code-textarea {
  margin-top: 12px;
  height: calc(100vh - 165px);
}

.save-btn-layout {
  text-align: right;
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
