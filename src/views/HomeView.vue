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
            <a-button type="primary" size="small" class="save-btn" @click="saveGroup">确认</a-button>
          </div>
        </template>
        <plus-outlined class="add-btn"/>
      </a-popover>

      <li v-for="(item, index) in groupOptions" :class="{ active: selectedGroup === index }"
          @click="setSelectedGroup(index)">
        <a-popconfirm placement="right" title="确认删除？" ok-text="删除" cancel-text="取消"
                      @confirm="delGroup($event,item)">
          <MinusOutlined v-if="groupEditable" class="group-delete-icon"/>
        </a-popconfirm>
        <a-popover :visible="editingGroupIndex === index" placement="right" title="修改名称" trigger="click">
          <template #content>
            <a-input v-model:value="selectedGroupName" size="small"/>
            <div class="save-btn-layout">
              <StarFilled v-if="isGroupFavorite" class="fab-icon-left fab-selected"
                          @click="isGroupFavorite = !isGroupFavorite"/>
              <StarOutlined v-else class="fab-icon-left" @click="isGroupFavorite = !isGroupFavorite"/>
              <a-button type="primary" size="small" class="save-btn" @click="saveGroupName">确认</a-button>
            </div>
          </template>
          <EditOutlined v-if="groupEditable" class="group-edit-icon" @click="editGroup($event,item,index)"/>
        </a-popover>
        <StarFilled v-if="!groupEditable && item.favorite" class="fab-icon"/>
        {{ item.name }} <span v-if="item.total" class="group-progress">{{ item.progress_100_count }}/{{
          item.total
        }}</span>
      </li>
    </ul>

    <div class="user-info">

      <a-popconfirm
        title="确认备份？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="confirmBackUp"
      >
        <a-button type="primary">数据库备份</a-button>
      </a-popconfirm>

    </div>
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
              <a-input v-model:value="formState.name" size="small" style="width: 350px"/>
            </a-form-item>

            <a-form-item
              label="链接"
              name="链接"
            >
              <a-textarea
                v-model:value="formState.url"
                size="small"
                style="width: 350px;max-width: 350px"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>

            <a-form-item
              label="分类"
              name="分类"
            >
              <a-select
                v-model:value="formState.groupId"
                size="small"
                style="width: 350px">
                <a-select-option v-for="item in groupOptions" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              label="进度"
              name="进度"
            >
              <div class="progress-layout">
                <div class="left-btn">
                  <a-button @click="decline" size="small">
                    <template #icon>
                      <minus-outlined/>
                    </template>
                  </a-button>
                </div>
                <div>
                  <a-progress :percent="formState.progress" :steps="10" strokeColor="#52c41a"/>
                </div>
                <div>
                  <a-button @click="increase" size="small">
                    <template #icon>
                      <plus-outlined/>
                    </template>
                  </a-button>
                </div>
                <div style="margin-left: 39px;">
                  <a-button type="primary" @click="setPlanDone" size="small">
                    100%
                  </a-button>
                </div>
              </div>
            </a-form-item>
          </a-form>
          <div class="save-btn-layout">
            <a-button type="primary" size="small" class="save-btn" @click="savePlan">确认</a-button>
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
      <a-table :columns="columns" :data-source="data" size="small" :locale="{ emptyText: '暂无数据' }"
               :pagination="{ pageSize: 15 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span class="column-name">
              学习计划
            </span>
          </template>
          <template v-if="column.key === 'group'">
            <span class="column-name">
              分类
            </span>
          </template>
          <template v-if="column.key === 'createTime'">
            <span class="column-name">
              创建时间
            </span>
          </template>
          <template v-if="column.key === 'progress'">
            <span class="column-name">
              进度
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <span class="column-name">
              操作
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a :href="record.url" target="_blank" :class="{'progress-done':record.progress === 100}">
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'group'">
            <span class="group-name-style">{{ record.groupName }}</span>
          </template>
          <template v-else-if="column.key === 'createTime'">
            {{ $formatDate(record.timestamp) }}
          </template>
          <template v-else-if="column.key === 'progress'">
            <a-progress :percent="record.progress" :steps="10" strokeColor="#52c41a"/>
          </template>
          <template v-else-if="column.key === 'action'">
            <EditOutlined class="action-icon" @click="editPlan(record)"/>
            <a-popconfirm title="确认删除？" cancelText="取消" okText="删除" @confirm="delPlan(record.id)">
              <template #icon>
                <question-circle-outlined style="color: red"/>
              </template>
              <CloseOutlined class="action-icon"/>
            </a-popconfirm>

          </template>
        </template>
      </a-table>
    </div>
  </div>

  <EditPlanModal ref="editPlanModal" @update-success="getPlansAfterUpdating"/>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue';
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  SettingOutlined,
  MinusOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
  StarFilled,
  StarOutlined
} from '@ant-design/icons-vue';
import {
  addGroup,
  getGroups,
  deleteGroup,
  getPlans,
  addPlan,
  deletePlan,
  getPlansByGroupId,
  updateGroupName, backup
} from "@/axios";
import EditPlanModal from "@/components/EditPlanModal.vue";

interface FormState {
  name: string;
  url: string;
  groupId: string;
  progress: number;
}

const editPlanModal = ref();
const value = ref<string>('');
const newGroup = ref<string>('');
const selectedGroupName = ref<string>('');
const isGroupFavorite = ref<boolean>(false);
const selectedGroupId = ref<string>('');
const editingGroupIndex = ref<number>(-1);
const placeholder = ref<string>('在 “ 全部 ” 下搜索');
const addGroupVisible = ref<boolean>(false);
const addPlanVisible = ref<boolean>(false);
const selectedGroup = ref<number>(-1);
const groupEditable = ref<boolean>(false);
const groupOptions = ref<any[]>([]);

const setSelectedGroup = (index: number) => {
  selectedGroup.value = index;
  if (index === -1) {
    placeholder.value = '在 “ 全部 ” 下搜索';
    getAllPlans();
  } else {
    const groupName: string = groupOptions.value[index].name;
    const groupId: string = groupOptions.value[index].id;
    getAllPlansByGroupId(groupId);
    placeholder.value = `在 “ ${groupName} ” 下搜索`;
  }
}

const setGroupFavorite = () => {
  isGroupFavorite.value = true;
}

const clearGroupFavorite = () => {
  isGroupFavorite.value = false;
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
  groupEditable.value = !groupEditable.value;
}

const delGroup = (event: any, group: any) => {
  event.stopPropagation(); // 阻止事件冒泡
  if (group.total > 0) {
    alert('分组下有数据，禁止删除！');
    return;
  }
  deleteGroup(group.id).then(() => {
    getAllGroups();
  });
}

const editGroup = (event: any, group: any, index: number) => {
  event.stopPropagation(); // 阻止事件冒泡
  selectedGroupName.value = group.name;
  selectedGroupId.value = group.id;
  editingGroupIndex.value = index;
}

const editPlan = (plan: any) => {
  editPlanModal.value.open(plan, groupOptions.value);
}

const delPlan = (id: string) => {
  deletePlan(id).then(() => {
    getPlansAfterUpdating();
    getAllGroups();
  });
}

const handleGroupChange = (isOpen: boolean) => {
  if (isOpen) {
    newGroup.value = '';
  }
}

const setPlanDone = () => {
  formState.progress = 100;
}

const saveGroup = () => {
  addGroup({name: newGroup.value}).then(() => {
    addGroupVisible.value = false;
    getAllGroups();
  });
};


const saveGroupName = () => {
  const id = selectedGroupId.value;
  const name = selectedGroupName.value;
  const favorite = isGroupFavorite.value ? 1 : 0;
  updateGroupName({id, name, favorite}).then(() => {
    editingGroupIndex.value = -1;
    getAllGroups();
  });
};


const getPlansAfterUpdating = () => {
  if (selectedGroup.value === -1) {
    getAllPlans();
  } else {
    const groupId: string = groupOptions.value[selectedGroup.value].id;
    getAllPlansByGroupId(groupId);
  }
}

const handlePlanChange = (isOpen: boolean) => {
  if (isOpen) {
    formState.name = '';
    formState.url = '';
    formState.groupId = '';
    formState.progress = 0;
  }
}
const savePlan = () => {
  if (!formState.name || !formState.url || !formState.groupId) {
    return;
  }
  addPlan(formState).then(() => {
    getPlansAfterUpdating();
    getAllGroups();
  })
  addPlanVisible.value = false;
};
const formState = reactive<FormState>({
  name: '',
  url: '',
  groupId: '',
  progress: 0
});

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
    name: 'Group',
    dataIndex: 'group',
    key: 'group',
  },
  {
    name: 'CreateTime',
    dataIndex: 'createTime',
    key: 'createTime',
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

const data = ref([]);

const onSearch = (searchValue: string) => {
  if (searchValue) {
    getAllPlans(searchValue);
  } else {
    getAllPlans();
  }
};

const getAllGroups = () => {
  getGroups().then((res: any) => {
    groupOptions.value = res.data;
  })
}

const getAllPlans = (searchValue: string = '') => {
  getPlans(searchValue).then((res: any) => {
    data.value = res.data;
  })
}

const getAllPlansByGroupId = (groupId: string) => {
  getPlansByGroupId(groupId).then((res: any) => {
    data.value = res.data;
  })
}

const confirmBackUp = () => {
  backup().then(() => {
    alert('备份成功！');
  })
}

onMounted(() => {
  getAllGroups();
  getAllPlans();
})

</script>

<style scoped>
.left-content {
  border-right: 1px solid #d5d5d5;
  width: 350px;
  height: 100vh;
  position: relative;
  float: left;
}

.column-name {
  font-size: 16px;
}

.fab-icon-left {
  float: left;
  margin-top: 14px;
  margin-left: 4px;
  font-size: 16px;
}

.fab-selected {
  color: #ff9000;
}

.fab-icon {
  color: #ff9000;
  position: absolute;
  left: -18px;
  top: 6px;
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

.group-name-style {
  background: #ffffff;
  color: #52c41a;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid #52c41a;
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
    font-weight: bold;
  }

  .slogan {
    font-size: 14px;
    font-weight: bold;
    color: #2e2e2e;
  }
}

.all-group {
  width: 192px;
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

.progress-layout {
  display: flex;

  .left-btn {
    margin-right: 10px;
  }
}

.menu {
  height: calc(100vh - 260px);
  overflow-y: auto;
  padding: 22px 20px 10px 70px;
  margin: 0;

  li {
    display: block;
    font-size: 14px;
    padding: 4px 6px 4px 8px;
    cursor: pointer;
    position: relative;
  }

  li:hover {
    background: #52c41a52;
    border-radius: 6px;
  }
}

.user-info {
  height: 106px;
  border-top: 1px solid #d5d5d5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-delete-icon {
  position: absolute;
  top: 7px;
  left: -40px;
  cursor: pointer;
  color: #000000;
}

.group-edit-icon {
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
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
  padding: 1px 6px;
  float: right;
  background: #52c41a;
}

a {
  color: #000000;
  font-size: 16px;
}

a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.progress-done {
  color: #00000070;
}

.float-right {
  float: right;
}

/deep/ .ant-pagination-item-active a {
  color: #52c41a; /* 设置你想要的文本颜色 */
}

/deep/ .ant-pagination-item-active {
  border-color: #52c41a;
}
</style>
