<template>
  <div class="resume-container">
    <div class="step">
      <div class="step-item">
        <h2>第一步：上传简历</h2>
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p class="ant-upload-hint">
            只支持单次上传
          </p>
        </a-upload-dragger>
      </div>

      <div class="step-item">
        <h2>第二步：选择职位</h2>
        <a-select
          ref="select"
          style="width: 100%"
          placeholder="选择职位"
          @change="selectChange"
        >
          <a-select-option v-for="item in jobList" :value="item.content">{{ item.title }}</a-select-option>
        </a-select>
      </div>

      <div class="step-item">
        <h2>第三步：开始匹配</h2>
        <a-button type="primary" :size="'large'" @click="startMatch">
          <template #icon>
            <ThunderboltOutlined/>
          </template>
          开始匹配
        </a-button>
      </div>
    </div>
    <div class="result">
      <h2>分析结果：</h2>
      <div class="result-content">
        {{ matchResult }}

<!--        这个招聘要求主要针对前端开发工程师的职位，具体分析如下：
        ### 1. **技术栈要求**
        - **Vue.js**：要求候选人熟悉Vue.js框架，能够使用Vue进行组件化开发，构建单页面应用（SPA）。
        - **HTML/CSS/JavaScript**：这是前端开发的基础，要求候选人能够熟练使用HTML进行页面结构搭建，CSS进行样式设计，JavaScript实现交互逻辑。
        - **Ajax**：要求候选人能够使用Ajax进行异步数据交互，实现前后端的数据通信。
        ### 2. **UI设计与实现**
        - **与UI设计师配合**：要求候选人能够与UI设计师紧密合作，理解设计师的设计意图，并将其准确地转化为前端代码。
        - **视觉效果实现**：要求候选人能够通过前端技术实现设计师所期望的视觉效果，包括布局、动画、交互等。
        ### 3. **前后端协作**
        - **与后台开发工程师配合**：要求候选人能够与后端开发人员协作，完成前后端的数据交互和功能联调。
        - **页面交互功能实现**：要求候选人能够根据需求实现页面的交互功能，如表单验证、动态内容加载等。
        ### 4. **性能优化**
        - **页面整体优化**：要求候选人能够对页面进行性能优化，包括加载速度、渲染效率等方面的优化。
        - **效率调优**：要求候选人能够通过代码优化、资源压缩等手段提升页面的运行效率。
        ### 5. **其他隐含要求**
        - **代码规范与标准**：要求候选人能够编写符合W3C标准的代码，确保页面的兼容性和可维护性。
        - **问题分析与解决能力**：要求候选人能够分析页面性能瓶颈，并提出有效的优化方案。
        ### 总结： 这个职位要求候选人具备扎实的前端开发基础，熟悉Vue.js框架，能够与设计师和后端开发人员紧密合作，实现高质量的页面效果和交互功能。同时，候选人还需要具备一定的性能优化能力，能够提升页面的加载速度和运行效率。-->

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {InboxOutlined, ThunderboltOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import type {UploadChangeParam} from 'ant-design-vue';
import {getNotes, match} from "@/axios";

const fileList = ref([]);
const jobList = ref<{ title: string, content: string }>([]);
const jobContent = ref('');
const matchResult = ref('');

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const selectChange = (content: string) => {
  console.log(content);
  jobContent.value = content;
}

const getAllJobs = () => {
  getNotes().then((res) => {
    jobList.value = res.data;
  })
}

const startMatch = () => {
  const data = {
    jobContent: jobContent.value + '\\n分析下上面的招聘要求',
  };
  match(data).then(res => {
    console.log(res.data)
    matchResult.value = res.data;
  })
}

onMounted(() => {
  getAllJobs();
})

function handleDrop(e: DragEvent) {
  console.log(e);
}
</script>

<style scoped>
.resume-container {
  height: calc(100vh - 100px);
  padding: 50px;
  display: flex;

  .step {
    flex: 1;
    padding: 0 20px;
    overflow: auto;
  }

  .result {
    flex: 2;
    padding: 0 20px;
    overflow: auto;
  }
}

.step-item {
  margin-bottom: 80px;
}

.result-content {
  height: calc(100vh - 197px);
  background: #ffffff;
  overflow: auto;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 12px;
}

/deep/ .ant-upload-drag {
  height: auto !important;
}
</style>
