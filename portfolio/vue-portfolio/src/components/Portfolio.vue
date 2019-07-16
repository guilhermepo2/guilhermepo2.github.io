<template>
    <div class="portfolio-info container">
        <div class="portfolio-top">
            <a href="http://gueepo.me">
                <img src="../assets/img/portrait2.jpg" alt="Guilherme, that's me!">
            </a>

            <h3>Guilherme de Oliveira</h3>
            <p>Hello! I'm a Gameplay Programmer and this is my portfolio! Almost all of the projects I've ever worked on are listed below from the most recent to the oldest ones.</p>
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
    background: #161616;
    color: white;
    height: 100%;
}

hr {
    border: 1px solid white;
}

.portfolio-top {
    padding-top: 2rem;
    text-align: center;
}

.portfolio-top img {
    max-width: 175px;
    border-radius: 100%;
    padding: .5rem 0;
    padding-top: 0;
    opacity: 1;
    transition: all .25s;
}

.portfolio-top img:hover {
    box-shadow: 0 0 4px 0 rgba(255, 255, 255, .5), 0 0 12px 0 rgba(255, 255, 255, .5);
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
    border: 1px solid white;
    margin: .5rem;
    padding: .5rem 1rem;

    transition: all .25s;
}

.portfolio-top a {
    color: white;
}

.portfolio-top p {
    padding-left: 2em;
    padding-right: 2em;
    text-align: justify;
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
    opacity: .5;
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
    border: 1px solid black;
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