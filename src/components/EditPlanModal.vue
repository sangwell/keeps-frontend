<template>
  <a-modal v-model:open="open" title="修改计划" :maskClosable="false" cancel-text="取消" ok-text="确认" @ok="handleOk">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 10 }"
      autocomplete="off"
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
        <!--        <a-progress :percent="formState.progress" :steps="10" strokeColor="#52c41a" style="width: 350px"/>
        <a-button-group>
          <a-button @click="decline" size="small">
            <template #icon>
              <minus-outlined/>
            </template>
          </a-button>
          <a-button @click="increase" size="small">
            <template #icon>
              <plus-outlined/>
            </template>
          </a-button>
        </a-button-group>-->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {MinusOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {updatePlan} from "@/axios";

interface FormState {
  id: string;
  name: string;
  url: string;
  groupId: string;
  progress: number;
}

const emits = defineEmits(['update-success']);

const open = ref<boolean>(false);
const groupOptions = ref<any[]>([]);

const formState = reactive<FormState>({
  id: '',
  name: '',
  url: '',
  groupId: '',
  progress: 0
});

const increase = () => {
  const percent = formState.progress + 10;
  formState.progress = percent > 100 ? 100 : percent;
};

const decline = () => {
  const percent = formState.progress - 10;
  formState.progress = percent < 0 ? 0 : percent;
};

const setPlanDone = () => {
  formState.progress = 100;
}

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  updatePlan(formState).then(() => {
    open.value = false;
    emits('update-success');
  })
};

defineExpose({
  open(plan: any, groups: any[]) {
    showModal();
    groupOptions.value = groups;
    formState.id = plan.id;
    formState.name = plan.name;
    formState.url = plan.url;
    formState.groupId = plan.groupId;
    formState.progress = plan.progress;
  }
});
</script>

<style scoped>
.progress-layout {
  display: flex;

  .left-btn {
    margin-right: 10px;
  }
}

.ant-form-item {
  margin-bottom: 10px;
}
</style>
