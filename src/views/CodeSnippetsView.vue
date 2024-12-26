<template>
  <div class="left-container">
    <a-button block @click="startAdd">
      <PlusOutlined/>
      添加 Code snippets
    </a-button>
    <ul class="code-list">
      <li>实现一个快速排序方法</li>
      <li>实现一个递归排序方法</li>
      <li>动态规划</li>
      <li>字符串及其反转</li>
      <li>三维数组反转</li>
      <li>实现一个快速排序方法</li>
      <li>实现一个递归排序方法</li>
      <li>动态规划</li>
      <li>字符串及其反转</li>
      <li>三维数组反转</li>
      <li>实现一个快速排序方法</li>
      <li>实现一个递归排序方法</li>
      <li>动态规划</li>
      <li>字符串及其反转</li>
      <li>三维数组反转</li>
      <li>实现一个快速排序方法</li>
      <li>实现一个递归排序方法</li>
      <li>动态规划</li>
      <li>字符串及其反转</li>
      <li>三维数组反转</li>
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
        <a-button v-if="codeState === StateEnum.View" class="save-btn" type="primary" @click="startEdit">开始编辑</a-button>
        <a-button v-if="codeState === StateEnum.Edit" class="save-btn" type="primary" @click="saveEdit">保存编辑</a-button>
        <a-button v-if="codeState === StateEnum.Edit" class="save-btn" @click="cancelEdit">取消编辑</a-button>
      </div>
    </div>

    <div class="code-view">
      <a-row :gutter="20">
        <a-col class="gutter-row" :span="16">
          <codemirror
            v-model="code"
            placeholder="Code goes here..."
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
          <div class="code-title">实现一个快速排序方法</div>
          <pre class="code-content">
            给你一个字符串 s ，请你判断字符串 s 是否存在一个长度为 2 的子字符串，在其反转后的字符串中也出现。

如果存在这样的子字符串，返回 true；如果不存在，返回 false。

示例 1：

输入：s = "leetcode"
输出：true

解释：子字符串 "ee" 的长度为 2，它也出现在 reverse(s) == "edocteel" 中。

示例 2：

输入：s = "abcba"
输出：true

解释：所有长度为 2 的子字符串 "ab"、"bc"、"cb"、"ba" 也都出现在 reverse(s) == "abcba" 中。

示例 3：

输入：s = "abcd"
输出：false

解释：字符串 s 中不存在满足「在其反转后的字符串中也出现」且长度为 2 的子字符串。
          </pre>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, shallowRef} from 'vue';
import {PlusOutlined} from "@ant-design/icons-vue";
import {getNotes, addNote} from "@/axios/note.ts";
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'

interface FormState {
  title: string;
  content: string;
  url: string;
}

const StateEnum = {
  View: 'view',
  Add: 'add',
  Edit: 'edit'
};

const codeState = ref(StateEnum.View);

const addNoteVisible = ref<boolean>(false);
const noteList = ref<{ title: string, content: string }>([]);
const formState = reactive<FormState>({
  title: '',
  content: '',
  url: ''
});


const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

const startAdd = () => {
  codeState.value = StateEnum.Add;
}
const startEdit = () => {
  codeState.value = StateEnum.Edit;
}
const cancelEdit = () => {
  codeState.value = StateEnum.View;
}

const saveAdd = () => {
  codeState.value = StateEnum.View;
}

const saveEdit = () => {
  codeState.value = StateEnum.View;
}



// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}


onMounted(() => {
  // getAllNotes();
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
  .state-title{
    font-weight: bold;
  }

  div {
    flex: 1;
    padding: 0 0 12px 0;
  }
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
