<template>
  <div class="left-content">
    <div class="logo">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手👍</span>
    </div>

    <ul class="menu">
      <li :class="{'menu-selected':currentPath==='/plans'}" @click="goToPage('/plans')">
        <flag-outlined />
        学习计划
      </li>
      <li :class="{'menu-selected':currentPath==='/notes'}" @click="goToPage('/notes')">
        <appstore-add-outlined/>
        便笺
      </li>
    </ul>
  </div>

  <div class="right-content">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import {
  AppstoreAddOutlined,
  FlagOutlined
} from "@ant-design/icons-vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router';

const currentPath = ref('');
const router = useRouter();

onMounted(()=>{
  const route = useRoute();
  currentPath.value=route.path;
  console.log(route.path);
})

const goToPage = (path)=>{
  router.push(path);
  currentPath.value=path;
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

.right-content {
  width: calc(100% - 231px);
  height: 100vh;
  position: relative;
  float: left;
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

  .menu-selected{
    background: #52c41a3b;
    color: #52c41a;
  }
}
</style>
