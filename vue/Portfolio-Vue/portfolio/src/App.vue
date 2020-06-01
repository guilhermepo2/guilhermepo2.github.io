<template>
  <div class="container">
    <div class="page-wrapper">
      <Header></Header>
      <Links></Links>
      <h1>Portfolio</h1>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Links from './components/Links.vue'

export default {
  name: 'Portfolio',
  components: {
    Header,
    Links
  }
}
</script>

<style>
body {
  background: #161616;
  line-height: 1.5;
  font: 16px, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #b0b0b0;
  margin: 0;
  display:block;
}
</style>
