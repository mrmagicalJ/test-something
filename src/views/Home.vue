<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :propA="msg" propC="Welcome to Your Vue.js + TypeScript App"/>
    {{count}} {{fullName}}
    <!-- <router-view /> -->
    <!-- 命名路由 -->
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import { Getter, Action, State, Mutation, namespace } from 'vuex-class';
import { VuexStateType } from '../store/type';

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  // for vue-router 2.2+
  'beforeRouteUpdate',
]);

const moduleA = namespace('a');

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // initial data
  msg: number = 12;

  @Provide() msg1 = this;

  @State((state: VuexStateType) => state.count) count;
  @State firstName;
  @State lastName;
  @Getter fullName;
  @Mutation('plusCount') plusCount;
  @Mutation('updateCountAsync') updateCountAsync;
  @Mutation('updateCount') updateCount;
  @moduleA.State text;
  @moduleA.Mutation('updateText') moduleAUpdateText;

  beforeRouteEnter(to, from, next) {
    console.log('home vue beforeRouteEnter');
    // 接受一个会调，参数是vm对象
    next((vm) => {
      console.log(vm.msg);

      vm.moduleAUpdateText(123);
      console.log(vm.text);
    });
  }
  beforeRouteUpdate(to, from, next) {
    console.log('home vue beforeRouteUpdate');
    next();
  }
  beforeRouteLeave(to, from, next) {
    console.log('home vue beforeRouteLeave');
    next();
  }
}

</script>
