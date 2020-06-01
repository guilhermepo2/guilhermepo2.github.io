<template>
  <div class="container">
    <div class="page-wrapper">
      <Header></Header>
      <Links></Links>
      <h1>Portfolio</h1>
      <PortfolioWorks></PortfolioWorks>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Links from './components/Links.vue'
import PortfolioWorks from './components/PortfolioWorks.vue'

export default {
  name: 'Portfolio',
  components: {
    Header,
    Links,
    PortfolioWorks
  }
}
</script>

<style>
body {
  background: #161616;
  color: #b0b0b0;
}
</style>
