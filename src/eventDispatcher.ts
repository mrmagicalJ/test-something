import { JSEventType } from './eventDispatchType';

// class Uikit {
//   EventTypes = {
//     EVENT_NODE: 0,
//     EVENT_INDEX_CHANGE: 1,
//     EVENT_LIST_DATA_READY: 2,
//     EVENT_GRID_DATA_READY: 3,
//   };
// }

// class JSEvent {
//   type: number;
//   object: object;

//   /**
//    * 定义事件类,事件包括类型和事件中包含的数据
//    * @param {JSEventType} {type = 0, object = {}}
//    * @memberof JSEvent
//    */
//   constructor({type = 0, object = {}}: JSEventType = {}) {
//     this.type = type;
//     this.object = object;
//   }

//   getType(): number {
//     return this.type;
//   }

//   getObject(): object {
//     return this.object;
//   }

// }


class JSListener {
  sence: number;
  handle: () => void;
  constructor({sence, handle}: {sence: number, handle: () => void}) {
    this.sence = sence;
    this.handle = handle;
  }

  getSense(): number {
    return this.sence;
  }
}
