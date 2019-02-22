<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :propA="msg" propC="Welcome to Your Vue.js + TypeScript App"/>
    <!-- <router-view /> -->
    <!-- 命名路由 -->
    <!-- <router-view name="a" /> -->
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

  @Provide() private msg1 = this;
}

</script>
