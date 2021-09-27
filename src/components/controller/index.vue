<!--
 * @Author: Hclle
 * @Date: 2021-08-12 10:33:19
 * @LastEditTime: 2021-09-27 15:38:57
 * @LastEditors: Hclle
 * @Description: 
-->
<template>
  <div class="controller" @click="onClickMask">
    <div v-show="!isShowOptions" class="skip" v-if="skip" @click.self.stop="onClickSkip">
      {{ skip.text }}
    </div>
    <div class="options" v-show="isShowOptions">
      <div
        class="option"
        v-for="(item, index) of options"
        :key="index"
        @click.self.stop="onClickOption(item.events.click)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, computed } from "vue";
import { ControllerType, EventsClickType } from "../../types/steps";

export default defineComponent({
  name: "Controller",
  props: {
    controller: {
      type: Object as PropType<ControllerType>,
    },
    isShowOptions: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "on-mask": null, // 点击遮罩
    "on-skip": null, // 点击跳过
    "on-option": null, // 点击选项
  },
  setup(props, { emit }) {
    const { controller } = toRefs(props);

    // 点击遮罩
    const onClickMask = () => {
      emit("on-mask");
    };

    const skip = computed(() => {
      return controller.value?.skip || false;
    });
    // 点击跳过
    const onClickSkip = () => {
      if (skip.value) {
        emit("on-skip", skip.value.events.click);
      }
    };

    const options = computed(() => {
      return controller.value?.options || [];
    });
    // 点击选项
    const onClickOption = (event: EventsClickType) => {
      emit("on-option", event);
    };

    return {
      skip,
      onClickMask,
      onClickSkip,
      options,
      onClickOption,
    };
  },
});
</script>

<style lang="less" scoped>
.controller {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
  .skip {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  .options {
    box-sizing: border-box;
    position: absolute;
    bottom: 50px;
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    flex-flow: nowrap;
    color: #fff;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    .option {
      padding: 20px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
