<template>
    <div v-if="this.workLoaded">
        <portfolio-entry :game="workLoaded"></portfolio-entry>
    </div>
    <div v-else class="row display-flex">
        <div class="portfolio-entry-wrapper col-sm-6 col-md-6 col-lg-6" v-for="game in works.tier1" :key="game.title">
            <div class="portfolio-entry-content">
                <div v-if="game.pageLink">
                    <a v-bind:href="game.pageLink" target="_BLANK">
                        <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                        <h1 class="portfolio-title">{{ game.title }}</h1>
                    </a>
                </div>
                <div v-else>
                    <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                    <h1 class="portfolio-title">{{ game.title }}</h1>
                </div>
                
                <!-- BADGES -->
                <div v-if="game.badges" class="work-badges">
                    <span v-for="badge in game.badges" v-bind:key="badge" class="badge badge-primary">{{ badge }}</span>
                </div>

                <!-- DESCRIPTION -->
                <p class="portfolio-description">{{ game.shortDescription }}</p>

                <!-- BULLET POINTS -->
                <div v-if="game.bulletPoints" class="portfolio-bullet-points">
                    <ul>
                        <li v-for="bulletPoint in game.bulletPoints" v-bind:key="bulletPoint">{{bulletPoint}}</li>
                    </ul>
                </div>

                <!-- LINKS -->
                <ul v-if="game.links" class="portfolio-links">
                    <li v-for="link in game.links" v-bind:key="link.name">
                        <a v-bind:href="link.url" target="_BLANK"><i class="fa fa-link"></i> {{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="portfolio-entry-wrapper col-sm-3 col-md-3 col-lg-3" v-for="game in works.tier2" :key="game.title">
            <div class="portfolio-entry-content">
                <div v-if="game.pageLink">
                    <a v-bind:href="game.pageLink" target="_BLANK">
                        <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                        <h3 class="portfolio-title">{{ game.title }}</h3>
                    </a>
                </div>
                <div v-else>
                    <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                    <h3 class="portfolio-title">{{ game.title }}</h3>
                </div>
                
                <!-- BADGES -->
                <div v-if="game.badges" class="work-badges">
                    <span v-for="badge in game.badges" v-bind:key="badge" class="badge badge-primary">{{ badge }}</span>
                </div>

                <!-- DESCRIPTION -->
                <p class="portfolio-description">{{ game.shortDescription }}</p>

                <!-- BULLET POINTS -->
                <div v-if="game.bulletPoints" class="portfolio-bullet-points">
                    <ul>
                        <li v-for="bulletPoint in game.bulletPoints" v-bind:key="bulletPoint">{{bulletPoint}}</li>
                    </ul>
                </div>

                <!-- LINKS -->
                <ul v-if="game.links" class="portfolio-links">
                    <li v-for="link in game.links" v-bind:key="link.name">
                        <a v-bind:href="link.url" target="_BLANK"><i class="fa fa-link"></i> {{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Works from '../works/overview.json'

export default {
    data: function() {
        return {
            works: Works,
        }
    }
}
</script>

<style scoped>
.row.display-flex {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
}

.portfolio-entry-wrapper {
    padding: .1em;
    color: #aaa;
}

.portfolio-entry-content {
    padding: 1em;
    background: #333;
    height: 100%;
}

.portfolio-image {
    border-radius: 20%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.portfolio-title {
    padding-top: .5em;
    margin-bottom: 0;
}

.portfolio-title, .portfolio-description {
    text-align:center;
}

.work-badges {
    text-align: center;
    padding: .75em 0;
}

.portfolio-bullet-points {
    text-align: justify;
}

.work-badges span {
    margin-left: .2em;
    margin-right: .2em;
}

.portfolio-links {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    list-style: none;
    margin: 0;
    padding: 0;
}

.portfolio-links li {
    font-weight: 700;
    border-radius: 20px;
    border: 1px solid #b0b0b0;
    padding: .5em 1em;
    margin: .5em;
    transition: all .2s;
}

.portfolio-links li:hover {
    border: 1px solid #c44e45;
    padding: .5em 1.5em;
}

.portfolio-links li a {
    color: #b0b0b0;
}

.portfolio-links li a:hover {
    text-decoration: none;
    color:#c44e45;
}
</style>