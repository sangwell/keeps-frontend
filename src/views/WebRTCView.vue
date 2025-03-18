<template>
  <h1>WebRTC</h1>
  <div>选择摄像头:
    <a-select
      ref="select"
      v-model:value="formInline.videoId"
      style="width: 120px"
      @focus="focus"
    >
      <a-select-option v-for="item in localDevice.videoIn" :value="item.id">{{ item.label }}</a-select-option>
    </a-select>
  </div>
  <div>选择麦克风:
    <a-select
      ref="select"
      v-model:value="formInline.audioInId"
      style="width: 120px"
      @focus="focus"
    >
      <a-select-option v-for="item in localDevice.audioIn" :value="item.id">{{ item.label }}</a-select-option>
    </a-select>
  </div>
  <div>选择听筒:
    <a-select
      ref="select"
      v-model:value="formInline.audioOutId"
      style="width: 120px"
      @focus="focus"
    >
      <a-select-option v-for="item in localDevice.audioOut" :value="item.id">{{ item.label }}</a-select-option>
    </a-select>
  </div>
  <div>
    分辨率Width：
    <a-input-number v-model:value="formInline.width"/>
  </div>
  <div>
    分辨率Height：
    <a-input-number v-model:value="formInline.height"/>
  </div>
  <div>
    FPS：
    <a-input-number v-model:value="formInline.frameRate"/>
  </div>
  <a-button type="primary" @click="onSubmit">确定</a-button>
  <video id="localdemo01" autoplay controls muted></video>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

const localDevice = ref(
  {
    audioIn: [],
    videoIn: [],
    audioOut: []
  }
)
const formInline = ref({
  videoId: undefined,
  audioInId: undefined,
  audioOutId: undefined,
  width: 1080,
  height: 720,
  frameRate: 24,
})

const onSubmit = async () => {
  const domId = "localdemo01";
  const video: any = document.getElementById(domId);
  const stream = video.srcObject;
  if (stream) {
    stream.getAudioTracks().forEach(e => {
      stream.removeTrack(e)
    })
    stream.getVideoTracks().forEach(e => {
      stream.removeTrack(e)
    })
  }

  video.srcObject = await getTargetDeviceMedia(formInline.value.videoId, formInline.value.audioInId)
  video.muted = true
}

const getLocalUserMedia = async (constraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints)
}

const getTargetDeviceMedia = async (videoId, audioId) => {
  const constraints = {
    audio: {deviceId: audioId ? {exact: audioId} : undefined},
    video: {
      deviceId: videoId ? {exact: videoId} : undefined,
      width: formInline.value.width,
      height: formInline.value.height,
      frameRate: {ideal: formInline.value.frameRate, max: 24}
    }
  };
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  //被调用方法前面有，此处不再重复
  return await getLocalUserMedia(constraints).catch(handleError);
}

const handleError = (error) => {
  // alert("摄像头无法正常使用，请检查是否占用或缺失")
  console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}
const initInnerLocalDevice = () => {
  // const localDevice = {
  //   audioIn:[],
  //   videoIn: [],
  //   audioOut: []
  //
  // }
  const constraints = {video: true, audio: true}
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("浏览器不支持获取媒体设备");
    return;
  }
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {


      stream.getTracks().forEach(trick => {
        trick.stop()
      })

      // List cameras and microphones.
      navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
          devices.forEach(function (device) {
            const obj = {id: device.deviceId, kind: device.kind, label: device.label}
            if (device.kind === 'audioinput') {
              if (localDevice.value.audioIn.filter(e => e.id === device.deviceId).length === 0) {
                localDevice.value.audioIn.push(obj)
              }
            }
            if (device.kind === 'audiooutput') {
              if (localDevice.value.audioOut.filter(e => e.id === device.deviceId).length === 0) {
                localDevice.value.audioOut.push(obj)
              }
            } else if (device.kind === 'videoinput') {
              if (localDevice.value.videoIn.filter(e => e.id === device.deviceId).length === 0) {
                localDevice.value.videoIn.push(obj)
              }
            }
          });
        })
        .catch(handleError);

    })
    .then(() => {
      console.log(localDevice)
      console.log("audioIn", localDevice.value.audioIn)
      console.log("audioOut", localDevice.value.audioOut)
      console.log("videoIn", localDevice.value.videoIn)
    })
    .catch(handleError);
}

onMounted(() => {
  initInnerLocalDevice();
})
</script>

<style scoped>
#localdemo01 {
  width: 500px;
  height: 400px;
}
</style>
