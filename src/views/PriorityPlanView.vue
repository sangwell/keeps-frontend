<template>
  <div class="page-container">
    <a-dropdown :trigger="['contextmenu']">
      <div class="priority-area" ref="areaRef">

        <div class="not-urgent">不紧急</div>
        <div class="urgent">紧急</div>
        <div class="not-important">不重要</div>
        <div class="important">重要</div>

        <div class="one-zone">第一象限：既紧急又重要 - 优先解决立即做</div>
        <div class="two-zone">第二象限：重要但不紧急 - 制定计划去做</div>
        <div class="three-zone">第三象限：紧急但不重要 - 安排别人去做</div>
        <div class="four-zone">第四象限：不重要不紧急 - 尽量别做</div>

        <div class="card" v-for="(item,index) in plans" :style="{left:item.x+'px',top:item.y+'px'}">
          <span v-if="!item.editable">{{ item.title }}</span>
          <a-input v-if="item.editable" v-model:value="item.title" size="small"/>
          <CheckOutlined v-if="item.editable" class="save-icon" @click="savePlan(item)"/>
          <CloseOutlined v-if="item.editable" class="cancel-add-icon" @click="cancelAddPlan(index)"/>

          <CloseOutlined v-if="!item.editable" class="delete-icon" @click="deletePlan(item.id)"/>
        </div>
      </div>

      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click="addPlan">添加计划</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>


  </div>
</template>

<script setup lang="ts">
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";
import {ref, onMounted} from "vue";
import {addPriorityPlan, deletePriorityPlan, getPriorityPlans} from "@/axios";

const plans = ref([]);
const areaRef = ref(null);

const addPlan = ($event: any) => {
  if (areaRef.value) {
    const rect = areaRef.value.getBoundingClientRect();
    const [x, y] = [$event.x, $event.y];
    plans.value.push({title: '', x: x - rect.x, y: y - rect.y, editable: true});
  }
}

const savePlan = (plan: any) => {
  addPriorityPlan(plan).then(() => {
    plan.editable = false;
    getAllPlans();
  });
}

const cancelAddPlan = (index: number) => {
  plans.value.splice(index, 1);
}

const deletePlan = (id: string) => {
  deletePriorityPlan(id).then(() => {
    getAllPlans();
  })
}

const getAllPlans = () => {
  getPriorityPlans().then((data) => {
    console.log(data.data);
    plans.value = data.data;
  })
}

onMounted(() => {
  getAllPlans();
})

</script>

<style scoped>
.one-zone {
  position: absolute;
  left: calc(50% + 10px);
  font-size: 26px;
  color: #ebebeb;
}

.two-zone {
  position: absolute;
  left: 10px;
  font-size: 26px;
  color: #ebebeb;
}

.three-zone {
  position: absolute;
  left: calc(50% + 10px);
  top: calc(50% + 8px);
  font-size: 26px;
  color: #ebebeb;
}

.four-zone {
  position: absolute;
  left: 10px;
  top: calc(50% + 8px);
  font-size: 26px;
  color: #ebebeb;
}

.not-urgent {
  position: absolute;
  top: calc(50% - 11px);
  left: -60px;
  font-size: 16px;
}

.urgent {
  position: absolute;
  right: -40px;
  top: calc(50% - 11px);
  font-size: 16px;
}

.not-important {
  position: absolute;
  bottom: -25px;
  left: calc(50% - 23px);
  font-size: 16px;
}

.important {
  position: absolute;
  top: -25px;
  left: calc(50% - 16px);
  font-size: 16px;
}

.card {
  border: 2px solid #c1ffa4;
  position: absolute;
  font-size: 12px;
  padding: 3px 2px 5px 2px;
  cursor: pointer;
  font-weight: bold;
}

.card::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  width: 6px;
  height: 6px;
  background-color: #52c41a;
}

.card:hover {
  .delete-icon {
    display: block;
  }
}

.save-icon {
  float: right;
  margin-top: 4px;
  font-size: 16px;
  cursor: pointer;
  color: #52c41a;
}

.cancel-add-icon {
  margin-top: 4px;
  font-size: 16px;
  cursor: pointer;
  color: red;
}

.delete-icon {
  display: none;
  position: absolute;
  top: 3px;
  right: 2px;
  font-size: 14px;
  background: #ff0000;
}

.page-container {
  padding: 30px;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.priority-area {
  width: 1200px;
  height: 1000px;
  position: relative;
}

.priority-area::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: black;
}

.priority-area::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  width: 100%;
  background-color: black;
  transform: translateX(-50%);
}

.row {
  display: flex;

  .panel {
    flex: 1;
    height: 500px;
    background: #effce8;
  }

  .one {
    border-right: 2px solid #000000;
    border-bottom: 2px solid #000000;
  }

  .two {
    border-bottom: 2px solid #000000;
  }

  .three {
    border-right: 2px solid #000000;
  }
}

svg {
  overflow: visible;
}

line {
  stroke-width: 1;
}

text {
  font-family: Verdana;
  font-size: 12px;
  fill: black;
}
</style>
