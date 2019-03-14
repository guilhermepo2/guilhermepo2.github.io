<template>
  <div id="app">
    <div class="row">
      <div class="col-md-5">

        <portfolio-info>
          <div class="row">
            <div class="portfolio-block-lg col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-for="(game, index) in works.tier1works">
              <div @click="UpdateRenderedProject(game.title, game.year, game.platform, game.builtWith, game.context, game.contentImage, game.description, game.links)" class="portoflio-bg-img" v-bind:style="{ backgroundImage: 'url(' + myMethod(game.preview) + ')' }"></div>
            </div>

            <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-for="(game, index) in works.tier1works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid" v-bind:src="game.preview" alt="">
            </div> -->

            <div class="portfolio-block-md col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" v-for="(game, index) in works.tier2works">
              <div @click="UpdateRenderedProject(game.title, game.year, game.platform, game.builtWith, game.context, game.contentImage, game.description, game.links)" class="portoflio-bg-img" v-bind:style="{ backgroundImage: 'url(' + game.preview + ')' }"></div>
            </div>

            <!-- <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" v-for="(game, index) in works.tier2works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid" v-bind:src="game.preview" alt="">
            </div> -->

            <div class="portfolio-block-sm col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" v-for="(game, index) in works.tier3works">
              <div @click="UpdateRenderedProject(game.title, game.year, game.platform, game.builtWith, game.context, game.contentImage, game.description, game.links)" class="portoflio-bg-img" v-bind:style="{ backgroundImage: 'url(' + game.preview + ')' }"></div>
            </div>

            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" v-for="(game, index) in works.tier3works">
              <img @click="UpdateRenderedProject(game.title, game.description, game.links)" class="portfolio-bg img-fluid portfolio-image" v-bind:src="game.preview" alt="">
            </div> -->
          </div>
        </portfolio-info>
        
      </div>
      <div class="col-md-7">
        <portfolio-content :description="description" :title="title" :links="links" :platform="platform" :builtWith="builtWith" :context="context" :contentImage="contentImage" :year="year">
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
      year: "",
      platform: "",
      builtWith: "",
      context: "",
      contentImage: "",
      description: "",
      links: {},

      works: Works,
      publicPath: process.env.BASE_URL
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
    myMethod(image) {
      console.log(this.publicPath);
      return image;
    },
    UpdateRenderedProject(title, year, platform, builtWith, context, contentImage, description, links) {
      this.title = title;
      this.year = year;
      this.platform = platform;
      this.builtWith = builtWith;
      this.context = context;
      this.contentImage = contentImage;
      this.description = description;
      this.links = links;
      window.scrollTo(0,0);
    }
  }
}
</script>

<style>
body {
  width: 100%;
  min-height: 100%;
  font-family: 'Lato', sans-serif;
}
.row, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xl-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xl-4, .col-md-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xl-5, .col-md-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xl-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xl-7 {
  margin: 0;
  padding: 0;
}
</style>
