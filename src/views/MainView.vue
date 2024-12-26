<template>
  <div class="left-content">
    <div class="logo">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手👍</span>
    </div>

    <ul class="menu">
      <li :class="{'menu-selected':currentPath==='/plans'}" @click="goToPage('/plans')">
        <flag-outlined/>
        学习计划
      </li>
      <li :class="{'menu-selected':currentPath==='/notes'}" @click="goToPage('/notes')">
        <appstore-add-outlined/>
        便笺
      </li>
      <li :class="{'menu-selected':currentPath==='/code-snippets'}" @click="goToPage('/code-snippets')">
        <appstore-add-outlined/>
        Code snippets
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
import {
  AppstoreAddOutlined,
  FlagOutlined
} from "@ant-design/icons-vue";
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
  }
}

.menu {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    padding: 12px 10px 12px 30px;
    font-size: 14px;
    cursor: pointer;
  }

  .menu-selected {
    background: #52c41a3b;
    color: #52c41a;
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
