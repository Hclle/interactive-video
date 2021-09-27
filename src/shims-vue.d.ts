/*
 * @Author: Hclle
 * @Date: 2021-08-11 11:53:43
 * @LastEditTime: 2021-08-11 11:53:45
 * @LastEditors: Hclle
 * @Description: 
 */
/* shims-vue.d.ts */
declare module '*.vue' {
  import { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}