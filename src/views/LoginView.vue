<template>
  <div class="container">
    <div class="logo-position" @click="loginDirect">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手👍</span>
    </div>
    <div class="login-layout">
      <h3>欢迎👏</h3>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
      >
        <a-form-item name="username">
          <a-input v-model:value="formState.username" placeholder="请输入用户名"/>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="formState.password" placeholder="请输入密码"/>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block @click="login" id="login_btn">登录</a-button>
        </a-form-item>
        <div class="register-layout">
          <a>注册新账号</a>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {reactive} from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const router = useRouter();

const login = () => {
  if (formState.username === 'admin' && formState.password === 'admin') {
    router.push('/plans');
  }
}

const loginDirect = () => {
  router.push('/plans');
}

</script>

<style>
.container {
  background: #f6fff8;
  height: 100vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.ant-btn-primary {
  background-color: #52c41a
}

.ant-btn-primary:not(:disabled):hover {
  background-color: #52c41acc
}

.ant-btn-primary:not(:disabled):active {
  background-color: #52c41acc
}

.ant-input, .ant-input-affix-wrapper {
  border-radius: 3px;
}

.register-layout {
  text-align: center;
}

.logo-position {
  position: absolute;
  top: 50px;
  left: 80px;
  scale: 1.2;

  span {
    display: block;
  }

  .title {
    font-size: 38px;
    color: #52c41a;
    //text-shadow: 3px 3px 0px #555ed5;
    font-weight: bold;
  }

  .slogan {
    font-size: 14px;
    font-weight: bold;
    color: #404040;
  }
}

.login-layout {
  width: 260px;
  border: 1px solid #dedede;
  box-shadow: 0px 0px 6px 0px #898989;
  border-radius: 5px;
  background: #ffffff;
  padding: 20px 30px;
}
</style>
