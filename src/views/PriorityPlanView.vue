<template>
  <div class="page-container">
    <div class="priority-area">
      <div class="row">
        <div class="panel one"></div>
        <div class="panel two"></div>
      </div>
      <div class="row">
        <div class="panel three"></div>
        <div class="panel four"></div>
      </div>

      <div class="card">
        123
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.card{
  width: 150px;
  height: 80px;
  border: 2px solid #52c41a;
  position: absolute;
  left: 50px;
  top: 50px;
}


.card::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  width: 6px;
  height: 6px;
  background-color: #52c41a;
  border-radius: 50%;
}

.page-container{
  padding: 30px;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  //background-image: url("../assets/priority.svg");
}
.priority-area{
  width: 1200px;
  height: 1000px;
  position: relative;
}
.row{
  display: flex;
  .panel{
    flex: 1;
    height: 500px;
    background: #c4e1b6;
  }
  .one{
    border-right: 2px solid #000000;
    border-bottom: 2px solid #000000;
  }
  .two{
    border-bottom: 2px solid #000000;
  }
  .three{
    border-right: 2px solid #000000;
  }
}
svg{
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
