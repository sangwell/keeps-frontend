<template>
  <div class="page-container">
    <a-dropdown :trigger="['contextmenu']">
      <div class="priority-area" ref="areaRef">

        <div class="card" v-for="(item,index) in plans" :style="{left:item.x+'px',top:item.y+'px'}">
          <span v-if="!item.editable">{{ item.title }}</span>
          <a-input v-if="item.editable" v-model:value="item.title" size="small"/>
          <CheckOutlined v-if="item.editable" class="save-icon" @click="savePlan(item)"/>
          <CloseOutlined v-if="item.editable" class="delete-icon" @click="deletePlan(index)"/>
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
import {ref} from "vue";

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
  plan.editable = false;
}

const deletePlan = (index: number) => {
  plans.value.splice(index, 1);
}

</script>

<style scoped>
.card {
  border: 2px solid #c1ffa4;
  position: absolute;
  font-size: 12px;
  padding: 3px 2px 5px 2px;
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

.save-icon {
  float: right;
  margin-top: 4px;
  font-size: 16px;
  cursor: pointer;
  color: #52c41a;
}

.delete-icon {
  margin-top: 4px;
  font-size: 16px;
  cursor: pointer;
  color: red;
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
  background: #effce8;
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
