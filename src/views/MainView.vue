<template>
  <div class="left-content">
    <div class="logo">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手<a>👍</a></span>
    </div>

    <ul class="menu">
      <li :class="{'menu-selected':currentPath==='/plans'}" @click="goToPage('/plans')">
        <span class="menu-icon">🙋‍♀️</span>
        学习计划
      </li>
      <li :class="{'menu-selected':currentPath==='/priority-plan'}" @click="goToPage('/priority-plan')">
        <span class="menu-icon">🥌</span>
        优先级计划
      </li>
      <li :class="{'menu-selected':currentPath==='/step-planning'}" @click="goToPage('/step-planning')">
        <span class="menu-icon">⛳</span>
        分步规划
      </li>
      <li :class="{'menu-selected':currentPath==='/code-snippets'}" @click="goToPage('/code-snippets')">
        <span class="menu-icon">📒</span>
        代码库
      </li>
      <li :class="{'menu-selected':currentPath==='/three-js'}" @click="goToPage('/three-js')">
        <span class="menu-icon">🤩</span>
        Three.js
      </li>
      <li :class="{'menu-selected':currentPath==='/realtime'}" @click="goToPage('/realtime')">
        <span class="menu-icon">📲</span>
        实时数据
      </li>
      <li :class="{'menu-selected':currentPath==='/notes'}" @click="goToPage('/notes')">
        <span class="menu-icon">👩‍💻</span>
        职位
      </li>
      <li :class="{'menu-selected':currentPath==='/ai-resume'}" @click="goToPage('/ai-resume')">
        <span class="menu-icon">🤖</span>
        简历 AI 助手
      </li>
      <li :class="{'menu-selected':currentPath==='/file-upload'}" @click="goToPage('/file-upload')">
        <span class="menu-icon">📂️</span>
        文件上传
      </li>
    </ul>

    <div class="calendar-layout">
      <div>
        <span class="today">{{ selectedDay }}</span>
        <a class="today-btn" @click="backToToday">今天</a>
      </div>
      <a-calendar v-model:value="calendarValue" :fullscreen="false" @select="onDaySelect">
        <template #headerRender>
        </template>
      </a-calendar>
    </div>
  </div>

  <div class="right-content">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import dayjs from 'dayjs';

const currentPath = ref('');
const router = useRouter();
const selectedDay = ref(dayjs().format('YYYY-MM-DD'));

const calendarValue = ref();

onMounted(() => {
  const route = useRoute();
  currentPath.value = route.path;
})

const goToPage = (path) => {
  router.push(path);
  currentPath.value = path;
}

const onDaySelect = (date) => {
  selectedDay.value = dayjs(date).format('YYYY-MM-DD');
}

const backToToday = () => {
  selectedDay.value = dayjs().format('YYYY-MM-DD');
  calendarValue.value = dayjs();
}

</script>

<style scoped>
.left-content {
  border-right: 1px solid #d5d5d5;
  width: 230px;
  height: 100vh;
  position: relative;
  float: left;
}

.calendar-layout {
  height: 300px;
  scale: 0.9;
  position: absolute;
  bottom: -15px;
}

.right-content {
  width: calc(100% - 231px);
  height: 100vh;
  position: relative;
  float: left;
}

.today {
  color: #52c41a;
  font-weight: bold;
}

.today-btn {
  cursor: pointer;
  color: #52c41a;
  float: right;
}

.logo {
  height: 100px;
  padding-top: 20px;
  font-size: 38px;
  text-align: left;
  padding-left: 30px;
  //border-bottom: 1px solid #d5d5d5;
  align-items: center;
  justify-content: center;

  span {
    display: block;
  }

  .title {
    color: #52c41a;
    font-weight: bold;
  }

  .slogan {
    font-size: 14px;
    font-weight: bold;
    color: #2e2e2e;
    a{
      font-size: 22px;
    }
  }
}

.menu {
  margin: 0;
  padding: 0;

  .menu-icon {
    font-size: 20px;
  }

  li {
    list-style: none;
    padding: 12px 10px 12px 30px;
    font-size: 16px;
    cursor: pointer;
  }

  li:hover {
    background: #52c41a3b;
  }

  .menu-selected {
    background: #52c41a3b;
    color: #52c41a;
    font-weight: bold;
  }
}

/deep/ .ant-picker-content th {
  width: 32px !important;
}

/deep/ .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
  border-color: #52c41a;
}

/deep/ .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
  background: #52c41a;
}
</style>
