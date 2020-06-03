<template>
  <div class="container">
    <div class="page-wrapper">
      <Header></Header>
      <Links></Links>
      <div v-if="this.MyRepos">
        <h3>Public GitHub Activity</h3>
        <div v-for="repository in MyRepos.slice(0, 5)" :key="repository.name">
          <p><a :href="repository.html_url" target="_BLANK">{{ repository.name }}</a> (Last Update: {{ GetDate(repository.updated_at) }})</p>
        </div>
      </div>
      
      <!-- <div v-if="this.MyProfile">{{ MyProfile["updated_at"]}}</div> -->
      <PortfolioWorks></PortfolioWorks>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Links from './components/Links.vue'
import PortfolioWorks from './components/PortfolioWorks.vue'

// Github.js api => https://www.npmjs.com/package/github-api
// API Documentation => http://github-tools.github.io/github/docs/3.2.3/index.html
var GitHub = require('github-api')

export default {
  name: 'Portfolio',
  components: {
    Header,
    Links,
    PortfolioWorks
  },
  data: function() {
    return {
      MyRepos: [],
      MyProfile: []
    }
  },
  methods: {
    LoadMyRepos: function() {
      const github = new GitHub();
      const myuser = github.getUser('guilhermepo2');

      myuser.listRepos((err, repos) => {
        this.MyRepos = repos;
      });
    },

    LoadMyProfile: function() {
      const github = new GitHub();
      const myuser = github.getUser('guilhermepo2');

      myuser.getProfile((err, profile) => {
        this.MyProfile = profile;
      });
    },

    GetDate(date) {
      var newDate = new Date(date);
      return newDate.getMonth() + '/' + newDate.getDate() + ' at ' + newDate.getHours() + ':' + newDate.getMinutes();
    }
  },
  mounted: function() {
    console.log("mounted");
    this.LoadMyRepos();
    this.LoadMyProfile();
  }
  
}
</script>

<style>
body {
  background: #161616;
  color: #b0b0b0;
}
</style>
