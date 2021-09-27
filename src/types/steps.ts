/*
 * @Author: Hclle
 * @Date: 2021-08-12 14:22:45
 * @LastEditTime: 2021-08-12 16:30:06
 * @LastEditors: Hclle
 * @Description: 
 */
// jump 跳转到指定播放进度
// reset 重新播放当前进度
// end 跳转到当前播放结尾
export type EventType = 'jump' | 'reset' | 'end'

export interface EventsClickType {
  event: EventType;
  props?: number;
}

export interface ControllerType {
  skip?: {
    text: string;
    events: {
      click: EventsClickType
    };
  };
  options?: {
    text: string;
    events: {
      click: EventsClickType;
    };
  }[];
}

export interface StepsType {
  [id: number]: {
    src: string;
    controller?: ControllerType;
    events?: {
      click?: EventsClickType;
    };
  };
}