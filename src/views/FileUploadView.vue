<template>
  <div class="resume-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <h3>文件列表</h3>
          <a-list bordered :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>
                {{ item }}
                <template #actions>
                  <a class="list-item-download" @click="download(item)">下载</a>

                  <a-popconfirm
                    title="确认删除？"
                    ok-text="删除"
                    cancel-text="取消"
                    @confirm="deleteSelectedFile(item)"
                  >
                    <a class="list-item-delete">删除</a>
                  </a-popconfirm>
                </template>
              </a-list-item>
            </template>
          </a-list>

        </div>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <h3>文件上传</h3>
          <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            :multiple="true"
            action="http://localhost:8066/upload/add"
            @change="handleChange"
            @drop="handleDrop"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">点击或将文件拖到此区域上传</p>
            <p class="ant-upload-hint">
              支持单个或批量上传
            </p>
          </a-upload-dragger>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {InboxOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import type {UploadChangeParam} from 'ant-design-vue';
import {getFileNames, deleteFile, downloadFile} from "@/axios";

const fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`"${info.file.name}" 上传成功！`);
    getFileNameList();
  } else if (status === 'error') {
    message.error(`"${info.file.name}" 上传失败！`);
  }
};

function handleDrop(e: DragEvent) {
  console.log(e);
}

const data = ref([]);

const getFileNameList = () => {
  getFileNames().then((files) => {
    data.value = files.data.files;
  })
}

const deleteSelectedFile = (name: string) => {
  deleteFile(name).then(() => {
    getFileNameList();
  })
}

const download = (name: string) => {
  downloadFile(name).then((response) => {
    console.log(response);
    // 创建临时链接
    const href = URL.createObjectURL(response.data);

    // 创建 <a> 标签并设置属性
    const link = document.createElement('a');
    link.href = href;
    link.download = name; // 设置下载的文件名
    document.body.appendChild(link);

    // 触发下载
    link.click();

    // 清理临时链接
    URL.revokeObjectURL(href);
    document.body.removeChild(link);
  })
}

onMounted(() => {
  getFileNameList();
})
</script>

<style scoped>
.resume-container {
  height: calc(100vh - 100px);
  padding: 50px;
}

.ant-list-item {
  font-size: 16px;
}

.list-item-download {
  color: #52c41a;
  font-size: 16px;
}

.list-item-delete {
  color: red;
  font-size: 16px;
}
</style>
