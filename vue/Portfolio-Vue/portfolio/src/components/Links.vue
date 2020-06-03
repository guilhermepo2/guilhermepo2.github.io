<template>
    <div class="header-icons">
        <ul class="header-icons-list">
            <a href="http://gueepo.me"><li><i class="fas fa-home"> home</i></li></a>
            <a href="mailto:guilherme.061@gmail.com"><li><i class="fas fa-envelope"> email</i></li></a>
            <!-- <a href="#" target="_BLANK"><li><i class="fas fa-file"> resume</i></li></a> -->
            <a href="https://gueepo.itch.io/" target="_BLANK"><li><i class="fas fa-gamepad"> itch</i></li></a>
            <a href="https://github.com/guilhermepo2" target="_BLANK"><li><i class="fab fa-github-alt"> github</i></li></a>
        </ul>
    </div>
</template>

<style scoped>

.header-icons-list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
}

.header-icons-list a {
    color: indigo;
    text-decoration: none;
}

.header-icons-list li {
    border-radius: 20px;
    border: 1px solid #b0b0b0;
    margin: .5em;
    padding: .5em 1em;
    transition: all .2s;
    font-weight: 600;
}

.header-icons-list li:hover {
    border: 1px solid #c44e45;
    padding: .5em 1.5em;
    color: #c44e45;
}

</style>