<!--
 * @Author: Hclle
 * @Date: 2021-08-11 11:49:22
 * @LastEditTime: 2021-08-12 16:48:31
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
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { StepsType, EventsClickType } from "./types/steps";
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
    const steps = reactive<StepsType>({
      1: {
        src: "https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4",
        events: {
          click: {
            event: "jump",
            props: 2,
          },
        },
      },
      2: {
        src: "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4",
        controller: {
          skip: {
            text: "跳过",
            events: {
              click: {
                event: "end",
              },
            },
          },
          options: [
            {
              text: "跳转到第三个视频",
              events: {
                click: {
                  event: "jump",
                  props: 3,
                },
              },
            },
            {
              text: "从头播放",
              events: {
                click: {
                  event: "reset",
                },
              },
            },
          ],
        },
      },
      3: {
        src: "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4",
        controller: {
          skip: {
            text: "跳过",
            events: {
              click: {
                event: "end",
              },
            },
          },
          options: [
            {
              text: "跳回第一个视频",
              events: {
                click: {
                  event: "jump",
                  props: 1,
                },
              },
            },
          ],
        },
      },
    });

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
