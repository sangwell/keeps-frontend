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
                  <a-popconfirm
                    title="确认删除？"
                    ok-text="删除"
                    cancel-text="取消"
                    @confirm="deleteSelectedFile(item)"
                  >
                    <a key="list-loadmore-more">删除</a>
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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
import {getFileNames, deleteFile} from "@/axios";

const fileList = ref([]);
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
    // data.value = files.data.files;
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
</style>
