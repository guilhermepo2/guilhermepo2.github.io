<template>
    <div class="row">
        <div class="col-sm-6 col-md-6 col-lg-6" v-for="game in works.tier1" :key="game.title">
            <img v-bind:src="require(`../assets/${game.preview}`)"/>
            <h1>{{ game.title }}</h1>
            <h4>{{ game.year }}</h4>
            <p>{{ game.shortDescription }}</p>
        </div>
    </div>
</template>

<script>
import Works from '../works/overview.json'

export default {
    data: function() {
        return {
            works: Works,
            publicPath: process.env.BASE_URL
        }
    }
}
</script>