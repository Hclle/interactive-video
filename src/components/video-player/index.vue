<!--
 * @Author: Hclle
 * @Date: 2021-08-11 14:23:37
 * @LastEditTime: 2021-08-12 17:00:40
 * @LastEditors: Hclle
 * @Description: 
-->
<template>
  <video
    class="video-player"
    autoplay
    :ref="(el) => (video = el)"
    :src="src"
  ></video>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from "vue";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      default: "",
    },
    events: {
      type: Object,
    },
  },
  emits: {
    "on-video": null, // 点击video回调
    "on-ended": null, // 视频播放结束回调
  },
  setup(props, { emit }) {
    const video = ref<any>(null);
    // 点击播放器
    const onClickVideo = () => {
      if (
        Math.round(video.value.currentTime) === Math.round(video.value.duration)
      )
        return false;
      if (props?.events?.click) {
        emit("on-video", props.events.click);
      }
      if (video.value.paused) {
        video.value.play();
      } else {
        video.value.pause();
      }
    };
    // 重置播放进度
    const onReset = () => {
      nextTick(() => {
        video.value.currentTime = 0;
        video.value.play();
      });
    };
    // 跳转视频结尾
    const onJumpEnd = () => {
      nextTick(() => {
        video.value.currentTime = Math.round(video.value.duration);
      });
    };
    watch(video, (val) => {
      if (val) {
        video.value.addEventListener("ended", () => {
          emit("on-ended");
        });
      }
    });

    return {
      video,
      onClickVideo,
      onReset,
      onJumpEnd,
    };
  },
});
</script>

<style lang="less" scoped>
.video-player {
  width: 100%;
  height: 100%;
}
</style>
