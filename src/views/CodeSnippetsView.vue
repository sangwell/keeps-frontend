<template>
  <div class="left-container">
    <a-button block @click="startAdd">
      <PlusOutlined/>
      添加代码
    </a-button>
    <ul class="code-list">
      <li v-for="item in codeTitleList" @click="getById(item.id)"
          :class="{ active: selectedSnippetId === item.id }">{{ item.title }}
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
        <a-popconfirm v-if="codeState === StateEnum.View"
                      placement="rightBottom" title="确认删除？" ok-text="删除" cancel-text="取消"
                      @confirm="delSnippet()">
          <delete-outlined class="delete-btn"/>
        </a-popconfirm>
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
      <a-row>
        <a-col class="gutter-row" :span="16">
          <codemirror
            v-model="formState.code"
            placeholder="Hello World!"
            :style="{ fontSize: '18px', height: 'calc(100vh - 123px)', fontFamily: 'sans-serif' }"
            :autofocus="true"
            :disabled="codeState === StateEnum.View"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions"
            @ready="handleReady"
          />
        </a-col>
        <a-col :span="8">
          <div class="code-detail">
            <div class="code-title" v-if="codeState === StateEnum.View">{{ formState.title }}</div>
            <div class="code-title" v-if="codeState === StateEnum.Add || codeState === StateEnum.Edit">
              <a-input v-model:value="formState.title" placeholder="输入标题"/>
            </div>
            <pre v-if="codeState === StateEnum.View && formState.description" class="code-content">
            {{ formState.description }}
          </pre>
            <a-textarea v-if="codeState === StateEnum.Add || codeState === StateEnum.Edit"
                        v-model:value="formState.description"
                        placeholder="输入描述"
                        :rows="40"
                        class="code-textarea"/>
          </div>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, shallowRef} from 'vue';
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'
import {addSnippet, getSnippetById, getSnippetsTitles, deleteSnippet, updateSnippet} from "@/axios";

interface FormState {
  id: string;
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
const selectedSnippetId = ref<string>('');
const codeTitleList = ref<{ id: string; title: string }>([]);
const formState = reactive<FormState>({
  id: '',
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
  selectedSnippetId.value = '';
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
  getFirstSnippet();
}

const saveAdd = async () => {
  const data = {
    title: formState.title,
    description: formState.description,
    code: encodeURIComponent(formState.code)
  }
  await addSnippet(data);
  codeState.value = StateEnum.View;
  await getAllCodeTitles();
  getFirstSnippet();
}

const saveEdit = () => {
  const data = {
    id: formState.id,
    title: formState.title,
    description: formState.description,
    code: encodeURIComponent(formState.code)
  }
  updateSnippet(data).then(() => {
    codeState.value = StateEnum.View;
  })
}

const delSnippet = () => {
  deleteSnippet(formState.id).then(async () => {
    await getAllCodeTitles();
    getFirstSnippet();
  })
}

const getFirstSnippet = () => {
  const firstSnippet = codeTitleList.value[0];
  if (firstSnippet) {
    const id = firstSnippet.id;
    getById(id);
  }
}

onMounted(async () => {
  await getAllCodeTitles();
  getFirstSnippet();
})

const getAllCodeTitles = async () => {
  const result = await getSnippetsTitles();
  codeTitleList.value = result.data;
}

const getById = (id: string) => {
  selectedSnippetId.value = id;
  getSnippetById(id).then((res) => {
    const snippet = res.data[0];
    formState.id = snippet.id;
    formState.code = decodeURIComponent(snippet.code);
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
  list-style: auto;
  padding: 20px 0 20px 20px;

  li {
    font-size: 14px;
    padding: 6px 6px 6px 8px;
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

.code-detail {
  height: calc(100vh - 155px);
  background: #ffffff;
  padding: 16px;
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
  font-weight: bold;
  background: #52c41a52;
  border-radius: 6px;
}

.save-btn {
  float: right;
  margin-left: 10px;
}

.delete-btn {
  float: right;
  margin-left: 10px;
  margin-top: 7px;
  cursor: pointer;
  color: red;
}

.code-view {
  height: calc(100vh - 112px);
  overflow-y: auto;
  overflow-x: hidden;
}

.code-title {
  font-weight: bold;
  font-size: 20px;
}

.code-content {
  white-space: pre-line;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 26px;
  border-radius: 5px;
}

.code-textarea {
  margin-top: 12px;
  height: calc(100vh - 165px);
}

.ant-btn-default:not(:disabled):hover {
  color: #52c41a;
  border-color: #52c41a;
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
