<template>
  <div id="app">
    <div class="row">
      <div class="col-md-5">

        <portfolio-info>
          <div class="row">
            <div class="col-md-6" v-for="(game, index) in works.tier1works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid" v-bind:src="game.preview" alt="">
            </div>

            <div class="col-md-4" v-for="(game, index) in works.tier2works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid" v-bind:src="game.preview" alt="">
            </div>

            <div class="col-md-3" v-for="(game, index) in works.tier3works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid portfolio-image" v-bind:src="game.preview" alt="">
            </div>
          </div>
        </portfolio-info>
        
      </div>
      <div class="col-md-7">
        <portfolio-content :description="description" :title="title" :links="links">
        </portfolio-content>
      </div>
    </div>
  </div>
</template>

<script>
import Portfolio from './components/Portfolio.vue'
import Content from './components/Content.vue'
import Works from './assets/works/sample.json'
export default {
  data: function() {
    return {
      title: "",
      description: "",
      links: {},
      works: Works
    }
  },
  components: {
    'portfolio-info': Portfolio,
    'portfolio-content': Content,
  },
  methods: {
    printOnConsole(param) {
      console.log(param);
    },
    UpdateRenderedProject(title, description, links) {
      this.title = title;
      this.description = description;
      this.links = links;
    }
  }
}
</script>

<style>
body {
  width: 100%;
  min-height: 100%;
}
.row, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7 {
  margin: 0;
  padding: 0;
}
</style>
