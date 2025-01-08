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

        <a-button type="primary" :size="'large'" @click="startMatchStream" style="margin-left: 20px">
          <template #icon>
            <ThunderboltOutlined/>
          </template>
          开始匹配(Stream)
        </a-button>
      </div>
    </div>
    <div class="result">
      <h2>分析结果：</h2>
      <div class="result-content">
        <VMarkdownView
          :mode="mode"
          :content="matchResult"
        ></VMarkdownView>
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
import {VMarkdownView} from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import baseApiUrl from "@/axios/url.ts";

const mode = ref('light');
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
    matchResult.value = res.data;
  })
}

const startMatchStream = async () => {
  try {
    const response = await fetch(baseApiUrl + '/chat/matchStream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobContent: jobContent.value + '\\n分析下上面的招聘要求'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response?.body.getReader(); // 获取流式数据的读取器
    const decoder = new TextDecoder('utf-8'); // 用于将二进制数据解码为字符串

    while (true) {
      const {done, value} = await reader.read(); // 读取数据块
      if (done) break; // 如果流结束，退出循环

      const chunk = decoder.decode(value, {stream: true}); // 解码数据块
      matchResult.value += chunk;
    }
  } catch (error) {
    console.error('Error fetching streaming data:', error);
  }
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
