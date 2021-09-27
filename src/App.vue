<!--
 * @Author: Hclle
 * @Date: 2021-08-11 11:49:22
 * @LastEditTime: 2021-09-27 17:27:10
 * @LastEditors: Hclle
 * @Description: 
-->
<template>
  <div class="main">
    <Controller
      :controller="controller"
      :isShowOptions="isShowOptions"
      @on-mask="onClickMask"
      @on-skip="onHandleEvent"
      @on-option="onHandleEvent"
    />
    <VideoPlayer
      :ref="(el) => (video = el)"
      :src="src"
      :events="events"
      @on-video="onHandleEvent"
      @on-ended="onEnded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { StepsType, EventsClickType } from "./types/steps";
import stepsData from './steps.json'
import Controller from "./components/controller/index.vue";
import VideoPlayer from "./components/video-player/index.vue";

export default defineComponent({
  name: "App",
  components: {
    Controller,
    VideoPlayer,
  },
  setup() {
    let timer: any = null;
    const video = ref<any>(null);

    const current = ref(1);
    const isShowOptions = ref(false);
    const steps = reactive<StepsType>(stepsData as StepsType);

    const controller = computed(() => {
      return steps[current.value].controller || {};
    });
    const events = computed(() => {
      return steps[current.value].events || {};
    });
    const src = computed(() => {
      return steps[current.value].src || "";
    });

    // 点击遮罩
    const onClickMask = () => {
      video.value?.onClickVideo();
    };

    // 处理回调
    const onHandleEvent = (event: EventsClickType) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        switch (event.event) {
          case "jump":
            if (event.props) current.value = event.props;
            break;
          case "reset":
            video.value.onReset();
            break;
          case "end":
            video.value.onJumpEnd();
            break;
        }
        isShowOptions.value = false;
      }, 10);
    };

    // 视频播放结束回调
    const onEnded = () => {
      isShowOptions.value = true;
    };

    return {
      video,
      current,
      isShowOptions,
      steps,
      controller,
      events,
      src,
      onClickMask,
      onEnded,
      onHandleEvent,
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
