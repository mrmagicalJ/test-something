<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>id is {{id}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  @Prop(String) private id!: string;
}
</script>

