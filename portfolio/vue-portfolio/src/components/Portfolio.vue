<template>
    <div class="portfolio-info container">
        <div class="portfolio-top">
            <a href="http://gueepo.me">
                <img src="../assets/img/portrait.png" alt="Guilherme, that's me!">
            </a>

            <h3>Guilherme Oliveira</h3>
            <p>Here you can see some of my works!</p>
            <ul>
                <li><a href="http://gueepo.me"><font-awesome-icon icon="home"></font-awesome-icon> home</a></li>
                <li><a href="mailto:guilherme.061@gmail.com"><font-awesome-icon icon="envelope"></font-awesome-icon> email</a></li>
                <li><a href="https://twitter.com/guilhermepo2" target="_BLANK"><font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon> twitter</a></li>
            </ul>
            <hr>
        </div>

        <slot></slot>
    </div>
</template>

<script>
</script>

<style scoped>

.portfolio-info {
    
}

.portfolio-top {
    padding-top: 2rem;
    text-align: center;
}

.portfolio-top img {
    border-radius: 100%;
    padding-top: 1rem 0;
    opacity: 1;
    transition: all .25s;
}

.portfolio-top img:hover {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .18), 0 0 12px 0 rgba(0, 0, 0, .15);
    opacity: 0.8;
}

.portfolio-top ul {
    padding: 0;
    margin: 0;
    font-weight: 600;
    list-style: none;
    display: flex;
    justify-content: center;
}

.portfolio-top li {
    border-radius: 20px;
    border: 1px solid black;
    margin: .5rem;
    padding: .5rem 1rem;

    transition: all .25s;
}

.portfolio-top a {
    color: black;
}

.portfolio-top a:hover {
    text-decoration: none;
    color: red;
}

.portfolio-top li:hover {
    border: 1px solid red;
    padding: .5rem 1.25rem;
}

.portfolio-bg {
    opacity: 1;
    transition: all .25s;
}

.portfolio-bg:hover {
    opacity: .8;
}

.portfolio-block-lg {
    height: 150px;
}

.portfolio-block-md {
    height: 125px;
}

.portfolio-block-sm {
    height: 100px;
}

.portoflio-bg-img {
    background-size:cover;
    background-position: center center;
    
    min-width: 100%;
    min-height: 100%;
    
    opacity: 1;
    transition: all .25s;
}

.portoflio-bg-img:hover {
    opacity: .8;
    background-size: 110%;
}
</style>