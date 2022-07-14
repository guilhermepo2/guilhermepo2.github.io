---
layout: post
title:  state of gueepo2D
date:   2022-07-14 10:00
image:  '/images/gueepo2D.png'
tags:   [gueepo2D]
---

In case you are here by accident or some other reason, I am currently developing a simple 2D game engine in C++, you can find it on [github](https://github.com/guilhermepo2/gueepo2D) - even it's been enough time, maybe you can even make a game with it now!

---

Last month I embarked in a journey of rendering fonts on my 2D game engine, it was fun, it was a lot of work, but eventually I've made it. And then I didn't do any work on the engine for way more than a month.

In my defense, I moved to the other side of the United States, I have been working some overtime lately, and I've traveled to Brazil, the last 8 weeks or so were hectic.

![last gueepo2D commit](https://gueepo.me/images/gueepo2D_2.png)

And every time I stay away too much from a project I start having a lot of second thoughts about it. Is this game engine any good? Does it have a future? What am I trying to do? Where am I trying to go?

And I promised myself I wouldn't start a new game engine, and honestly, starting another game engine right now wouldn't solve anything, but after thinking a lot about it, I am fairly convinced that gueepo2D needs a redesign and some restructuring.

The first question to answer when approaching this redesign is: "What are my goals with gueepo2D?", "What do I want gueepo2D to be?"

I've looked around at some other game-making libraries, and the ones that I like the most are libGDX and MonoGame. These are basically simple frameworks that contains a renderer, input handling, a math library, audio, and an application framework providing a window and your typical game engine-like messaging systems, like Begin, Update, Render, etc...

And I think a realistic goal is to have gueepo2D be something on those lines, but in C++. One of my goals was always for it to be beginner friendly, a place where you can actually make and ship games, but a place where you can also learn game development and/or C++.

Right off the bat, the current state of gueepo2D is that it was trying to be way more than that, after reviewing some of the modules there are two that immediately stand out that could be totally removed:

1. The entity-component system;
2. The event system.

The event system is a way to abstract application events, like when a window close, when it is resized, input events, things like that. I can imagine a world where this is needed in case I decide to run the engine both on SDL2 and to have a native Windows... Window... But worst case scenario, I can just add it back if it's needed.

The entity-component system is more of an interesting problem. It is a fairly important feature when making a game, but, honestly, the current ECS on gueepo2D is average at best, it abuses the usage of C++ templates, which I highly dislike, and even then, it's quite hard to customize and navigate around. I'm leaning more towards not having ECS as part of the engine, and leave it up to the user. What I will probably end up doing is having a "gueepo2D-ecs" that will work sort of as an "add-on" to the engine.

This also means that some features might to be cut, like LUA Scripting, making tools for the engine, and some utility features that I had previously planned. Obviously, all that can come later as "add-ons", LUA Scripting is something that I'm very adamant about having in this game engine.

All of that might also mean that I have to postpone, or even forget about, the idea of having Vulkan and DirectX as rendering backends for the engine. A 2D game engine doesn't really need anything more than OpenGL, heck, using OpenGL ES would be just fine, that's also a possibility that I'm studying. The only issue here is that OpenGL is bound to be deprecated, and someday it might just be gone.

---

Another piece of the equation is that gueepo2D was trying to be too generic, and I want to make it tailored more towards the types of games I want to make, so I have to ask myself: "What types of games do I want to make?"

And, honestly, I don't really know. All I can think of is that I want to do story-driven games, but that can be a platformer, that can a turn-based RPG, that can be anything. So, currently, the only restriction I'm putting on it is that these games are going to be 2D, pixel-art, and tile-based.

I have a lot of design and mechanics somewhere on Notion, and none of them motivates me too much, but I have 2 or 3 projects on the "shelf" where it started with a story, and they motivate me way more. It is harder to find a mechanic and a game loop that might work with it, but I feel like the end result is more gratifying.

Another big thing that has to change is that I have to remove the sandbox project from the engine itself. Currently, every time you create a new project with the game engine the sandbox project will be right there, not doing anything. Ideally, I should move the sandbox into its own repository, and that's helpful because it can act as a sample project as well!

---

Basically, here are some actionable steps.

1. Remove the “sandbox” project from the engine itself, move it into its own repository.
2. Remove the ECS from the engine. Work on a “gueepo2D-ecs” addon in the future, but ideally this should be left for the user to impement.
3. Maybe remove the event system? I’m not sure about its usage and necessity currently, and I usually lean more towards removing something if I don’t see a use for it, if the necessity comes, I can just look at old commits and add it back.
4. Think of the engine more as the interaction between these 5 modules: application, renderer, input, audio and math. Of course, there are going to be a lot of “common” code to support all of these, like string and vector containers, debug code (profiling and checking for memory leaks), the resource manager, the filesystem, ImGui, etc…

But all in all, that's about it. I've written this mostly to get these ideas out of my head, I might do a YouTube video talking about all these after I started making some of these changes.

<br/>
[twitter](http://twitter.com/guilhermepo2)<br/>
[youtube](https://www.youtube.com/channel/UCOIlr-LtVmaIRdI0oe2lthg)