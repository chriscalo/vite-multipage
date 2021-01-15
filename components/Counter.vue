<template>
  <button @click="state.count--">−</button>
  <span>count = {{ state.count }}</span>
  <button @click="state.count++">+</button>
</template>

<script>
  import { defineProps, reactive, ref } from "vue";
  
  export default {
    setup() {
      const state = reactive({ count: 0 });
      return {
        state,
      };
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
