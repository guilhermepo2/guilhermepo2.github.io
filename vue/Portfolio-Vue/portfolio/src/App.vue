<template>
  <div class="container">
    <div class="page-wrapper">
    <Home></Home>

    <hr>
    <footer class="portfolio-footer">
      <p>Guilherme Oliveira © 2020</p>
    </footer>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  components: {
    Home
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  background: #161616;
  color: #b0b0b0;
}

.github-activity {
  padding: 1em 0;
  text-align: center;
}

.github-activity .title {
  padding: .5em 0;
}

.github-activity-entry {
  text-align: center;
}

.portfolio-footer p {
  padding-top: 3em;
  padding-bottom: 3em;
  text-align: center;
}
</style>
