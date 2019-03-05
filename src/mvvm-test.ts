const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

class MvvmObj {
  private callback: (newValue?: any, oldValue?: any) => void;
  constructor(obj: object, cb: (newValue?: any, oldValue?: any) => void) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      console.error(`This parameter must be an object, but got ${typeof obj}`);
    }
    this.callback = cb;
    this.observe(obj);
  }

  private opt(obj: any): string {
    return Object.prototype.toString.call(obj);
  }
  /**
   * 深层递归监测对象
   * @param obj
   */
  private observe(obj: object) {
    // 如果发现 监测的对象是数组的话就要调用 overrideArrayProto 方法
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      this.overrideArrayProto((obj as []));
    }
    Object.keys(obj).forEach((key: string | number | symbol, index: number, keyArr: object) => {
      let oldValue = obj[key];
      Object.defineProperty(obj, key, {
        get: () => oldValue,
        set: (newValue) => {
          if (newValue !== oldValue) {
            if (this.opt(newValue) === '[object Object]') {
              this.observe(newValue);
            }
            this.callback(newValue, oldValue);
            oldValue = newValue;
          }
        },
      });

      if (Object.prototype.toString.call(obj[key]) === '[object Object]' ||
        Object.prototype.toString.call(obj[key]) === '[object Array]') {
        this.observe(obj[key]);
      }
    });
  }

  private overrideArrayProto(arr) {
    const originalProto = Array.prototype;
    const overrideProto = Object.create(Array.prototype);
    const THIS = this;
    let result: any;

    Object.keys(OAM).forEach((key, index, array) => {
      const method = OAM[index];
      let oldArr = [];

      Object.defineProperty(overrideProto, method, {
        value() {
          oldArr = this.slice(0);

          // 将类数组转化为数组
          const arg = [].slice.apply(arguments);
          // 调用原始 原型 的数组方法
          result = originalProto[method].apply(this, arg);
          // 对新的数组进行监测
          THIS.observe(this);
          // 执行回调
          THIS.callback(this, oldArr);

          return result;
        },
        writable: true,
        enumerable: false,
        configurable: true,
      })

      // 最后 让该数组实例的 __proto__ 属性指向 假的原型 overrideProto
      arr.__proto__ = overrideProto;
    });

  }

}

// let data = {
//   a: 200,
//   level1: {
//     b: 'str',
//     c: [1, 2, 3],
//     level2: {
//       d: 90,
//     },
//   },
// };
// function callback(newValue: any, oldValue: any) {
//   console.log(newValue, oldValue);
// }

// const mv: MvvmObj = new MvvmObj(data, callback);

// data.a = 300;
// data.level1.b = 'sssss';
// data.level1.level2.d = 888;
// data.level1.c.push(4);

export default MvvmObj;
