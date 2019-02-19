<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-model="modelData" :propA="msg" propC="Welcome to Your Vue.js + TypeScript App"/>
    {{modelData}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})

export default class Home extends Vue {
  private msg: number = 12;
  private modelData: string = '123';

  @Provide() private msg1 = this;
}

</script>
