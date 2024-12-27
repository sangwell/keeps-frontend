<template>
  <h2>Three.js</h2>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const threeContainer = ref(null);
let scene, camera, renderer, cube;
const initThree = () => {
  // 创建场景
  scene = new THREE.Scene();
  // 创建相机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  // camera.position.z = 5;
  camera.position.set( 0, 0, 100 );
  camera.lookAt( 0, 0, 0 );
  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);
  // 创建立方体
  // const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });



  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.Line( geometry, material );


  cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  scene.add( line );
  // 动画循环
  // animate();
  renderer.render( scene, camera );
};
/*const animate = () => {
  requestAnimationFrame(animate);
  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};*/

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  // 清理资源
  if (renderer) {
    renderer.dispose();
  }
});
// 监听窗口大小变化
/*window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});*/
</script>

<style scoped>
.three-container {
  width: 100%;
  height: calc(100vh - 32px);
}
</style>
