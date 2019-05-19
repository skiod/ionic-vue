<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<script>


  export default {
    name: 'app'
  }
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition-duration: 0.2s;
      transition-property: opacity;
      transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
      opacity: 0
    }
</style>
