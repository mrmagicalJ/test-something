<template>
  <div class="hello">
    <h2>prop</h2>
    <p>propA: {{propA}}</p>
    <p>propB: {{propB}}</p>
    <p>propC: {{propC}}</p>
    <p>computedTest: {{computedTest}}</p>
    <input type="text" :value="modalValue" @input="modalValuePlus">
  </div>
</template>

<script lang="ts">
// vue属性装饰器
import { Vue, Component, Prop, Model, Emit, Watch, Inject } from 'vue-property-decorator';

@Component
export default class Hello extends Vue {
  @Prop(Number) private propA!: number;
  @Prop({default: 'default value'}) private propB!: string;
  @Prop([String, Boolean]) private propC!: string | boolean;
  @Inject('msg1') private msg123!: string;

  @Model('change', {type: String}) private modalValue!: string;

  @Emit('change')
  private modalValuePlus(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
  @Watch('modalValue')
  private onModalValueChange(newValue: string, oldValue: string) {
    // console.log(newValue, oldValue);
  }

  get computedTest() {
    return this.propA + '666';
  }

  private mounted() {
    // console.log(this.msg123);
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
