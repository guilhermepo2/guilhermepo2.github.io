<template>
    <header class="about-me-header">

        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3">
                <a href="#"><img class="selfie" alt="It's me!" src="../assets/portrait2.jpg" /></a>
            </div>

            <div class="col-sm-8 col-md-8 col-lg-8">
                <div class="about-me-text">
                    <p>My name is Guilherme de Oliveira and I am a Gameplay Programmer. I have a background in Game Design (Master's) and Computer Science (Undergraduate). I've been coding for more than 5 years now and I'm versatily with Unity/C#, Unreal 4 with C++ and Blueprints, as well as C++ with SDL2!</p>

                    <p>I have released 2 games solo, and 3 games with CelleC Games, being 1 for Steam. I also joined 7 gamejam games up to this day, I am passionate about making things feel good, look good and creating systems and tools so the team can iterate faster and create a better game!</p>
                </div>
            </div>  
        </div>
        
    </header>
</template>

<style scoped>
.about-me-header {
    padding-top: 2em;
}

.about-me-header .selfie {
    max-width: 100%;
    margin-bottom: 25px;
    border-radius: 100%;
    box-shadow: 0;
    opacity: 1;
    transition: all .2s;
}

.about-me-header .selfie:hover {
    box-shadow: 0 0px 4px 0 rgba(0,0,0,0.18),0 0px 12px 0 rgba(0,0,0,0.15);
    opacity: .8;
}

.about-me-text {
    width: 100%;
    height: 100%;
    
    /* aligning on the center */
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.about-me-text p {
    text-align: justify;
}
</style>