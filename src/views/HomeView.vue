<template>
  <div class="left-content">
    <div class="logo">
      <span class="title">Keeps</span>
      <span class="slogan">你的学习进度管理助手👍</span>
    </div>
    <ul class="menu">


      <li class="all-group" @click="setSelectedGroup(-1)" :class="{ active: selectedGroup === -1 }">
        全部
      </li>

      <SettingOutlined v-if="!groupEditable" class="setting-btn" @click="toggleGroupEditable"/>
      <CheckOutlined v-if="groupEditable" class="setting-btn" @click="toggleGroupEditable"/>

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

      <li v-for="(item, index) in groupOptions" :class="{ active: selectedGroup === index }"
          @click="setSelectedGroup(index)">
        <MinusOutlined v-if="groupEditable" class="group-delete-icon" @click="deleteGroup"/>
        {{ item.name }} <span class="group-progress">{{ item.progress }}/{{ item.total }}</span></li>
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

            <a-form-item
              label="进度"
              name="进度"
            >
              <a-progress :percent="formState.progress" :steps="10" strokeColor="#52c41a" style="width: 350px"/>
              <a-button-group>
                <a-button @click="decline" size="small">
                  <template #icon><minus-outlined /></template>
                </a-button>
                <a-button @click="increase" size="small">
                  <template #icon><plus-outlined /></template>
                </a-button>
              </a-button-group>
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
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  SettingOutlined,
  MinusOutlined,
  CheckOutlined
} from '@ant-design/icons-vue';

interface FormState {
  title: string;
  url: string;
  group: string;
  progress: number;
}

const value = ref<string>('');
const newGroup = ref<string>('');
const placeholder = ref<string>('在 “ 全部 ” 下搜索');
const addGroupVisible = ref<boolean>(false);
const addPlanVisible = ref<boolean>(false);
const selectedGroup = ref<number>(-1);
const groupEditable = ref<boolean>(false);

const setSelectedGroup = (index: number) => {
  selectedGroup.value = index;
  if (index === -1) {
    placeholder.value = '在 “ 全部 ” 下搜索';
  } else {
    const groupName: string = groupOptions.value[index].name;
    placeholder.value = `在 “ ${groupName} ” 下搜索`;
  }
}

const increase = () => {
  const percent = formState.progress + 10;
  formState.progress = percent > 100 ? 100 : percent;
};

const decline = () => {
  const percent = formState.progress - 10;
  formState.progress = percent < 0 ? 0 : percent;
};

const toggleGroupEditable = () => {
  console.log(111)
  groupEditable.value = !groupEditable.value;
}

const deleteGroup = (event: any) => {
  event.stopPropagation(); // 阻止事件冒泡
  console.log('Icon clicked!');
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
  progress: 0
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
  width: 350px;
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
  width: calc(100% - 351px);
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

  span {
    display: block;
  }

  .title {
    color: #52c41a;
    //text-shadow: 3px 3px 0px #555ed5;
    font-weight: bold;
  }

  .slogan {
    font-size: 12px;
    color: #2e2e2e;
  }
}

.all-group {
  width: 200px;
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

.menu {
  height: calc(100vh - 158px);
  overflow-y: scroll;
  padding: 10px 20px 10px 70px;

  li {
    display: block;
    font-size: 14px;
    font-weight: bold;
    //margin: 12px 0;
    padding: 4px 0px 4px 8px;
    cursor: pointer;
    //color: #00000050;
    position: relative;
  }
}

.group-delete-icon {
  position: absolute;
  top: 7px;
  left: -18px;
  cursor: pointer;
  color: #000000;
}

.active {
  color: #000000 !important;
  background: #52c41a52;
  border-radius: 6px;
}

.add-btn {
  color: #000000;
  float: right;
  cursor: pointer;
  font-size: 16px;
  margin-top: -22px;
  margin-right: 26px;
}

.setting-btn {
  color: #000000;
  float: right;
  cursor: pointer;
  font-size: 16px;
  margin-top: -22px;
  margin-left: 10px;
}

.group-progress {
  display: inline-block;
  //background: #4fb020;
  color: #959595;
  font-size: 10px;
  border-radius: 4px;
  padding: 3px 4px;
  float: right;
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
</style>
