<template>
  <div class="left-content">
    <div class="logo">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手👍</span>
    </div>
    <ul class="menu">

      <SettingOutlined class="add-btn"/>

      <a-popover v-model:visible="addGroupVisible" @openChange="handleGroupChange" title="添加分类" trigger="click"
                 placement="bottom">
        <template #content>
          <a-input v-model:value="newGroup" size="small"/>
          <div class="save-btn-layout">
            <a-button type="primary" size="small" class="save-btn" @click="saveGroup">保存</a-button>
          </div>
        </template>
        <plus-outlined class="add-btn"/>
      </a-popover>
      <li @click="setSelectedGroup(-1)"><span :class="{ active: selectedGroup === -1 }">全部</span></li>
      <li v-for="(item, index) in groupOptions" :class="{ active: selectedGroup === index }"
          @click="setSelectedGroup(index)">{{ item.name }} <span
        class="group-progress">{{ item.progress }}/{{ item.total }}</span></li>
    </ul>
  </div>

  <div class="right-content">
    <div class="search-bar">
      <a-input-search
        v-model:value="value"
        :placeholder="placeholder"
        style="width: 400px"
        @search="onSearch"
      />
      <a-popover v-model:visible="addPlanVisible" @openChange="handlePlanChange" title="添加“学习计划”" trigger="click"
                 placement="leftTop">
        <template #content>
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            style="width: 500px"
          >
            <a-form-item
              label="标题"
              name="标题"
            >
              <a-input v-model:value="formState.title" size="small" style="width: 350px"/>
            </a-form-item>

            <a-form-item
              label="链接"
              name="链接"
            >
              <a-input v-model:value="formState.url" size="small" style="width: 350px"/>
            </a-form-item>

            <a-form-item
              label="分类"
              name="分类"
            >
              <a-select
                v-model:value="formState.group"
                size="small"
                style="width: 350px">
                <a-select-option v-for="item in groupOptions" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
          <div class="save-btn-layout">
            <a-button type="primary" size="small" class="save-btn" @click="savePlan">保存</a-button>
          </div>
        </template>
        <a-button type="primary" shape="circle" class="float-right">
          <template #icon>
            <plus-outlined/>
          </template>
        </a-button>
      </a-popover>
    </div>
    <div class="table-content">
      <a-table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 15 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              学习计划
            </span>
          </template>
          <template v-if="column.key === 'progress'">
            <span>
              进度
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              操作
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a :href="record.url" target="_blank">
              {{ record.title }}
            </a>
          </template>
          <template v-else-if="column.key === 'progress'">
            <a-progress :percent="record.progress" :steps="10" strokeColor="#52c41a"/>
          </template>
          <template v-else-if="column.key === 'action'">
            <EditOutlined class="action-icon"/>
            <CloseOutlined class="action-icon"/>
          </template>
        </template>
      </a-table>
    </div>


  </div>
  <!--  <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />-->
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {UserOutlined, VideoCameraOutlined, UploadOutlined} from '@ant-design/icons-vue';
import {SmileOutlined, DownOutlined} from '@ant-design/icons-vue';
import {ref, reactive} from 'vue';
import {PlusOutlined, CloseOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons-vue';

interface FormState {
  title: string;
  url: string;
  group: string;
}

const value = ref<string>('');
const newGroup = ref<string>('');
const placeholder = ref<string>('在 “ 全部 ” 下搜索');
const addGroupVisible = ref<boolean>(false);
const addPlanVisible = ref<boolean>(false);
const selectedGroup = ref<number>(-1);

const setSelectedGroup = (index: number) => {
  selectedGroup.value = index;
  if (index === -1) {
    placeholder.value = '在 “ 全部 ” 下搜索';
  } else {
    const groupName: string = groupOptions.value[index].name;
    placeholder.value = `在 “ ${groupName} ” 下搜索`;
  }
}

const handleGroupChange = (isOpen: boolean) => {
  if (isOpen) {
    newGroup.value = '';
  }
}
const saveGroup = () => {
  addGroupVisible.value = false;
};

const handlePlanChange = (isOpen: boolean) => {
  if (isOpen) {
    formState.title = '';
    formState.url = '';
    formState.group = '';
  }
}
const savePlan = () => {
  addPlanVisible.value = false;
};
const formState = reactive<FormState>({
  title: '',
  url: '',
  group: '',
});

const groupOptions = ref([
  {id: '1', name: '掘金小册', total: 10, progress: 2},
  {id: '2', name: 'JavaScript', total: 16, progress: 9},
  {id: '3', name: 'React Native', total: 23, progress: 2},
  {id: '4', name: 'VUE', total: 10, progress: 5},
  {id: '1', name: '掘金小册', total: 10, progress: 2},
  {id: '2', name: 'JavaScript', total: 16, progress: 9},
  {id: '3', name: 'React Native React Native React Native', total: 23, progress: 2},
  {id: '4', name: 'VUE', total: 10, progress: 5},
  {id: '1', name: '掘金小册', total: 10, progress: 2},
  {id: '2', name: 'JavaScript', total: 16, progress: 9},
  {id: '3', name: 'React Native', total: 23, progress: 2},
  {id: '4', name: 'VUE', total: 10, progress: 5},
  {id: '1', name: '掘金小册', total: 10, progress: 2},
  {id: '2', name: 'JavaScript', total: 16, progress: 9},
  {id: '3', name: 'React Native', total: 23, progress: 2},
  {id: '4', name: 'VUE', total: 10, progress: 5},
]);

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Progress',
    key: 'progress',
    width: 240,
  },
  {
    title: 'Action',
    key: 'action',
    width: 80,
  }
];

const data = [
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  },
  {
    key: '1',
    title: '想成为中高级前端，必须理解这10种javascript设计模式',
    url: 'https://juejin.cn/post/7433277439634096168',
    progress: 30
  },
  {
    key: '2',
    title: '28个令人惊艳的JavaScript单行代码',
    url: 'https://juejin.cn/post/7307963529872605218Ò',
    progress: 40
  },
  {
    key: '3',
    title: '前端必会，教你从 0 开始使用 docker + nginx 部署项目，太赞了',
    url: 'https://juejin.cn/post/7390735346847907874',
    progress: 40
  }
];

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};

</script>

<style scoped>
.left-content {
  border-right: 1px solid #d5d5d5;
  width: 250px;
  height: 100vh;
  position: relative;
  float: left;
}

.ant-form-item {
  margin-bottom: 10px;
}

.ant-btn-primary {
  background-color: #52c41a
}

.ant-btn-primary:hover {
  background-color: #52c41acc
}

.right-content {
  width: calc(100% - 251px);
  height: 100vh;
  position: relative;
  float: left;

  .search-bar {
    height: 24px;
    padding: 48px 40px;
  }

  .table-content {
    padding: 0 40px;
  }
}

.logo {
  height: 100px;
  padding-top: 20px;
  font-size: 38px;
  text-align: center;
  border-bottom: 1px solid #d5d5d5;
  align-items: center;
  justify-content: center;
  span{
    display: block;
  }
  .title{
    color: #52c41a;
    //text-shadow: 3px 3px 0px #555ed5;
    font-weight: bold;
  }
  .slogan{
    font-size: 12px;
    color: #2e2e2e;
  }
}

.save-btn-layout {
  text-align: right;
}

.save-btn {
  margin-top: 10px;
  word-spacing: -2px;
}

.action-icon {
  cursor: pointer;
  margin-right: 12px;
}

.menu {
  padding: 10px 20px 10px 70px;

  li {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin: 12px 0;
    cursor: pointer;
    color: #00000050;
  }
}

.active {
  color: #000000 !important;
}

.add-btn {
  color: #000000;
  float: right;
  cursor: pointer;
  font-size: 16px;
  margin-top: 12px;
  margin-left: 10px;
}

.group-progress {
  display: inline-block;
  background: #4fb020;
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 4px;
}

a {
  color: #000000;
}

a:hover {
  text-decoration: underline;
}

.float-right {
  float: right;
}

/*header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>
