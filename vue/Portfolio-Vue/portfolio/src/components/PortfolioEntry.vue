<template>
    <div class="portfolio-entry">
        <div class="portfolio-icons">
            <ul class="icons-list">
                <a href="/"><li><i class="fas fa-home"> all projects</i></li></a>
            </ul>
        </div>

        <div class="project-page-header">
            <h1>{{ game.title }}</h1>
            <table>
                <tr v-if="game.projectType">
                    <td><strong>Project Type:</strong></td>
                    <td>{{ game.projectType }}</td>
                </tr>
                <tr v-if="game.engine">
                    <td><strong>Engine:</strong></td>
                    <td>{{ game.engine }}</td>
                </tr>
                <tr v-if="game.languages">
                    <td><strong>Languages:</strong></td>
                    <td>{{ game.languages }}</td>
                </tr>
            </table>
        </div>

        <!-- TERRIBLE CODE FIX THIS -->
        <div v-if="game.gameTemplate == 'DefenseesComponent'">
            <DefenseesComponent></DefenseesComponent>
        </div>
    </div>
</template>

<script>
import DefenseesComponent from './gameComponents/Defensees.vue'

export default {
    props: ['game'],
    components: {
        DefenseesComponent
    },
    mounted: function() {
        if(!this.game) {
            window.location.href = '/';
        }
    }
}
</script>

<style scoped>
.portfolio-entry-intro .selfie {
    max-width: 20%;
    margin-bottom: 15px;
    border-radius: 40%;
    box-shadow: 0;
    opacity: 1;
    transition: all .2s;
}

.portfolio-entry-intro .selfie:hover {
    box-shadow: 0 0px 4px 0 rgba(0,0,0,0.18),0 0px 12px 0 rgba(0,0,0,0.15);
    opacity: .8;
}

.project-page-header table {
    margin-left: auto;
    margin-right: auto;
}

.project-page-header table tr td {
    padding: 5px;
}

.portfolio-entry {
    text-align: center;
}

.icons-list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
}

.icons-list a {
    color: indigo;
    text-decoration: none;
}

.icons-list li {
    border-radius: 20px;
    border: 1px solid #b0b0b0;
    margin: .5em;
    padding: .5em 1em;
    transition: all .2s;
    font-weight: 600;
}

.icons-list li:hover {
    border: 1px solid #c44e45;
    padding: .5em 1.5em;
    color: #c44e45;
}

.portfolio-image-holder {
    padding: 1em 0;
    text-align: center;
}
</style>
