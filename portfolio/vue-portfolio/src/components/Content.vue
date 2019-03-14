<template>
    <section>
        <img v-if="contentImage" class="img-fluid" v-bind:src="contentImage" alt="">
        <div class="portfolio-content container">
            <h1 v-if="title"> {{ title }} ({{ year }})</h1>
            <p v-if="platform"><strong>Available On:</strong> {{ platform }}.</p>
            <p v-if="builtWith"><strong>Made With:</strong> {{ builtWith }}.</p>
            <p v-if="context"><strong>Context of the Project:</strong> {{ context }}.</p>
            <div v-html="description"></div>

            <nav v-if="links" class="links">
                <ul>
                    <li v-for="(link, index) in links">
                        <a v-bind:href="link.url" target="_BLANK"><font-awesome-icon icon="link"></font-awesome-icon> {{ link.label }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script>
export default {
    props: ['title', 'year', 'contentImage', 'platform', 'builtWith', 'context', 'description', 'links']
}
</script>

<style scoped>
.portfolio-content {
    /* background: green; */
    padding: 2rem 1rem;
    text-align: justify;
}

.links ul {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    
    list-style: none;
    margin: 0;
    padding: 0;
}

.links ul li {
    font-weight: 700;
    border-radius: 20px;
    border: 1px solid black;
    padding: .5rem 1rem;
    margin: .5rem;
    transition: all .2s;
}

.links ul li:hover {
    border: 1px solid red;
    padding: .5rem 1.5rem;
}

.links ul li a {
    color: black;
}

.links ul li a:hover {
    text-decoration: none;
    color: red;
}


</style>