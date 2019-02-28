class MvvmObj {
  constructor(obj: object, callback: Function) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      console.error(`This parameter must be an object, but got ${typeof obj}`)
    }
    this.callback = callback;
    this.observe(obj);
  }
  private callback: Function;

  private opt(obj: any): string {
    return Object.prototype.toString.call(obj)
  }

  private observe(obj: object) {
    Object.keys(obj).forEach((key: string | number | symbol, index: number, keyArr: object) => {
      let oldValue = obj[key];
      Object.defineProperty(obj, key, {
        get: () => oldValue,
        set: (newValue) => {
          if (newValue !== oldValue) {
            if (this.opt(newValue) === '[object Object]') {
              this.observe(newValue)
            }
            this.callback(newValue, oldValue);
            oldValue = newValue;
          }
        }
      })

      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        this.observe(obj[key])
      }
    })
  }
}

let data = {
  a: 200,
  level1: {
    b: 'str',
    c: [1, 2, 3],
    level2: {
      d: 90
    }
  }
}
function callback(newValue: any, oldValue: any) {
  console.log(newValue, oldValue);
}

const mv: MvvmObj = new MvvmObj(data, callback);

data.a = 300;
data.level1.b = 'sssss';
data.level1.level2.d = 888;
