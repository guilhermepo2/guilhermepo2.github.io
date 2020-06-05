<template>
    <div class="row row-eq-height">
        <div class="portfolio-entry-wrapper col-sm-6 col-md-6 col-lg-6" v-for="game in works.tier1" :key="game.title">
            <div class="portfolio-entry-content">
                <router-link :to="{ name: 'portfolio-entry', params: {game: game} }">
                    <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                </router-link>

                <router-link :to="{ name: 'portfolio-entry', params: { game: game } }"><h1 class="portfolio-title">{{ game.title }}</h1></router-link>
                <!-- <h4>{{ game.year }}</h4> -->
                <p>{{ game.shortDescription }}</p>
            </div>
        </div>

        <div class="portfolio-entry-wrapper col-sm-3 col-md-3 col-lg-3" v-for="game in works.tier2" :key="game.title">
            <div class="portfolio-entry-content">
                <router-link :to="{ name: 'portfolio-entry', params: {game: game} }">
                    <img class="portfolio-image" v-bind:src="require(`../assets/${game.preview}`)"/>
                </router-link>

                <router-link :to="{ name: 'portfolio-entry', params: { game: game } }"><h1 class="portfolio-title">{{ game.title }}</h1></router-link>
                <!-- <h4>{{ game.year }}</h4> -->
                <p>{{ game.shortDescription }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Works from '../works/overview.json'

export default {
    data: function() {
        return {
            works: Works
        }
    }
}
</script>

<style scoped>
.portfolio-entry-wrapper {
    padding: 1px;
}

.portfolio-entry-content {
    padding: .5em;
    background: #333;
    color: #aaa;
}

.portfolio-image {
    border-radius: 20%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.portfolio-title {
    text-align:center;
}
</style>