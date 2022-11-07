---
layout: post
title:  reflections after making 2 games
date:   2022-11-06 10:00
type: devblog
---

Ha, it's that time again, the time where I feel a lot of things happened, a lot of things are going on and I just sit and write down some reflections on game engine development. Buckle Up. I'm going Full Goblin Mode.

The whole purpose of creating a game engine is to create games, duh. And after a long time of figuring out the ins and outs of making a game engine, I decided to go ahead, turn the "engine" into an API that I liked (inspired by the great Java's libGDX) and just put some games out there made on my own game engine.

That actually went quite well? Behold, the *two* games made with gueepo2D so far.

### goblin heck 2
<iframe frameborder="0" src="https://itch.io/embed/1682474" width="552" height="167"><a href="https://gueepo.itch.io/goblin-heck">goblin heck by gueepo</a></iframe>

<br />
### escape from ganymede
<iframe frameborder="0" src="https://itch.io/embed/1756388" width="552" height="167"><a href="https://gueepo.itch.io/escape-from-ganymede">escape from ganymede by gueepo</a></iframe>

<br />
Heck, I hate the name "gueepo2D" so much - Every now and then I decide to stop working on this engine *until* I figure out a new name, and I also want to stop calling it a game engine, and call it a game library. I like that terminology more. Because gueepo2D is something that you use to create game engines, it is not the game engine itself. And of course, it can be used to create games skipping the whole game engine step.

I've decided to do that because I want to make a game engine specific to the types of game I want to create, top-down tile-based pixel art turn-based games. And Tactics RPGs. And when you come to think of it there are a lot of things that are specific to these types of games that doesn't really make sense to be on the "library" or "game engine" - Like, why there's a "Monster" class mixed on my folders to create a window, render, play audio and manage memory?

Do I really need a generic entity-component system on the engine? Wouldn't it be better to have a more robust and specific system tailored for turn-based games? (*Spoiler:* Yes, it would.)

Somewhere around the curves of my brain there's a 5,000 word rant about making games, game engines, game libraries, and commercial engines. I can feel it right somewhere on my Temporal Lobe. And it *kind of sucks* that I have a lot of trouble putting that rant into words, because I really *want* to.

For example, on my game library I can have direct control over what I'm drawing, so to draw something (or not draw something) I *just do it.* It's not that simple on Unity, where you have to have a GameObject on the Scene, a SpriteRenderer Component, a Transform Component, you have to make sure that the Object is Active and that the SpriteRenderer Component is enabled. Heck, every one that ever made a game in Unity already went through the problem where some object's visibilty was controlled by some other piece of code, and then some other piece of code needed to influence that as well, and now you have a *nightmare* of objects fighting to make your little cube visible or invisible.

*All that is to say that big commercial game engines are good enough at making games but at the same time they kind of suck to make the games you want to make, actually.*

Big Commercial Game Engines removed from most people the ability to think in terms of making tools specific for your games to improve your workflow. Big Commercial Engines tricked us into thinking they were good at solving the problems we needed solved, whereas they *kind of* solve them, I guess.

Heck, when was the last time you asked yourself: "Do I really *need* this entity component system?", or "Is there a better solution for my game than this entity component system?"

"But what about those that aren't programmers?" - Someone always say that, and in that case, sure, whatever, use a Big Commercial Game Engine, but I'm literally *a programmer*. I'm talking about me, this is *my* blog.

But even on that scenario, isn't making games all about touching multiple disciplines? Reaching out of your "expertise" and picking up new skills is sort of how the game industry rolls. The effort to learn Lua and use Love2D, or pico-8 is totally manageable. Heck, even Godot's own GDScript, and GameMaker GML are totally manageable. People just need to get their heads out of "Unity" and "Unreal".

Now, if sometime in the future I *ever* release an *actual* game on my game library, when it is inevitably full of platform-specific crashes you can come back here and laugh at me. Can you imagine making a game for a console on your own code base?! There's no "Change Platform" -> "Export" pipeline. 

**You** *have to code* the platform specific code, Jerry.

But at the same time, the simplicity provided by a simple graphics and platform API on a custom (and simple!) game engine is manageable, to a point that I don't think it would be hard to add a new platform into it. More about this in the future! When I inevitably add DirectX 11 on my game library.

---

<br />

Anyway, I've made two games on my own game library, *now what*? What happens now?

Look at this beauty.

<script src="https://gist.github.com/guilhermepo2/a41935b28262bc992240279523fec17a.js"></script>

It's an entire game in one file. And an entire game engine behind it, of course. 504 lines of madness.

What happens now is that I have to face the fact that I have a long list of chores related to this game engine.

1. First and foremost, *FIGURE OUT A NEW NAME!!* I really liked the idea of making it "g lib", but when coding and going through the repository that would be just "glib", which sounds weird, and there's probably something out there called "glib" already - so I might go back to my bread and butter and look into pop albums for name inspiration.
2. have some way of tracking memory and memory leaks (very important!)
3. integrate emscripten to have HTML5 builds
4. integrate FMOD
5. integrate LUA scripting
6. read .aseprite files
7. UI module (very important!)
8. have a proper "release" version, with no console, no logs, no asserts, have optimization, etc...
9. have some minimal form of automated testing and building
10. have some minimal form of multithreading, at least a "engine" and a "renderer" thread.

And what happens next is that I have a list of games I want to make in this game engine to take it further.

1. a very simple roguelike with procedural music - I should be able to build upon "escape from ganymede" - it's literally the same thing, but with a bit more complexity on the combat, a new dungeon generation algorithm, new sprites, and the whole procedural music thing. Ok, it's very different.
2. port "escape from ganymede" to HTML5 - that's a huge goal because I really don't like the idea of making people download things.
3. make a tactics game, this can simply be "escape from ganymede", but tactics, just to make a simple prototype as to what would be needed for a tactics game.
4. make a turn-based game inspired by the SNES Dragon Quest and Final Fantasy

Wow! That's a lot of things! The future is bright for gueepo2D (or whichever name it takes in the future) and I am very excited to make some games here and there that will feat my own engine, my own pixel art, and my own music!!

---
<br />

The reflection on working on my own game engine and making games on it (after more than a year of working on it!!) is a *hardcore* deglamourization (is that a word?) of videogames. Making videogames is just... making a very cool folder in your computer ([Thanks, Greg.](https://medium.com/@banovg/an-indie-developers-guide-to-publishers-eb896a05353))

And it's just code, it doesn't matter if you want to look at it in awe and get into a fight arguing that video game is art or something like that, at the end of the day, it's just code. And we figured out ages ago how to make code performant, how to make code run on all different platforms, coding games doesn't *really* present any new challenges unless you are working on cutting edge 3D graphics.

And that realization really is freeing, if it's all *just* code, then what is a game? what makes a *game good?* - What makes a game good is the mumbo jumbo of storytelling and graphics that go into the code and get spitted in a way that results in an experience for the person who was brave enough to click on your ".exe" file. Some people call the act of creating that experience *game design*, but I would argue that *game* design is *not* a thing, but that's a story for another day!!

<br/>
[twitter](http://twitter.com/guilhermepo2)<br/>
[youtube](https://www.youtube.com/channel/UCOIlr-LtVmaIRdI0oe2lthg)
<br/>

THANKS FOR READING!

<iframe width="560" height="315" src="https://www.youtube.com/embed/c4Sa3Fx9Ss8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>