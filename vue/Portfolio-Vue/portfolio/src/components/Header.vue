<template>
    <header class="about-me-header">

        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3">
                <a href="#"><img class="selfie" alt="It's me!" src="../assets/portrait2.jpg" /></a>
            </div>

            <div class="col-sm-8 col-md-8 col-lg-8">
                <p>My name is Guilherme de Oliveira and I am a Gameplay Programmer currently taking a Master's in Game Design, with a Bachelor in Computer Science. I currently have over 5 years of experience with programming and I'm versatile in Unity/C# and Unreal 4 using C++ and Blueprints.</p>
                <p>I am motivated by all things related to how the player interacts with the game, such as character movement and actions, how the player perceives the game, such as AI and Game Feel, as well as technical challenges, like optimization and coming up systems that are both efficient and friendly to designers!</p>    
            </div>  
        </div>
        
    </header>
</template>

<style scoped>
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
</style>