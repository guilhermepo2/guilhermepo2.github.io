<template>
    <div>
        <Header></Header>
        <Links></Links>

        <!-- TODO: Transform this into its own component? -->
        <div class="github-activity" v-if="this.MyRepos">
        <h3 class="title">Public GitHub Activity</h3>
        <div class="row">
            <div class="github-activity-entry col-sm-6 col-md-6 col-lg-6" v-for="repository in MyRepos.slice(0, 6)" :key="repository.name">
            <p><a :href="repository.html_url" target="_BLANK">{{ repository.name }}</a> (Last Update: {{ GetDate(repository.updated_at) }})</p>
            </div>
        </div>
        </div>
        
        <PortfolioWorks></PortfolioWorks>
    </div>
</template>

<script>

import Header from './Header.vue'
import Links from './Links.vue'
import PortfolioWorks from './PortfolioWorks.vue'

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
