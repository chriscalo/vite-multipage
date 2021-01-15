<template>
  <h1>{{ msg }}</h1>
  
  <Nav/>
  <button @click="state.count--">−</button>
  <span>count = {{ state.count }}</span>
  <button @click="state.count++">+</button>
</template>

<script>
  import { defineProps, reactive, ref } from "vue";
  import Nav from "./Nav.vue";
  
  export default {
    props: {
      msg: String,
    },
    setup() {
      const state = reactive({ count: 0 });
      return {
        state,
      };
    },
    components: {
      Nav,
    },
  };
</script>

<style scoped>
  a {
    color: #42b983;
  }
  
  span {
    padding: 0.5em;
  }
</style>
