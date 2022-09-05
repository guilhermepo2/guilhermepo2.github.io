---
layout: post
title:  where have you been mate
date:   2022-09-04 10:00
type: devblog
---

### fonts

so it has been quite a while, my last video is 2 months old at this point, probably 3 months when these ramblings ever make it into any type of online consumable media. Not only that, my game engine didn't see much activity for almost 2 months either, before that, I've worked on adding font rendering to it, that was an adventure.

So let's talk about fonts, and how to draw them.

My notes on it are roughly 3,000 words, and I had high and ambitious plans of writing a thorough blog post and making a video about the process and how-tos of rendering fonts in OpenGL. A blog post with 3,000 words notes would turn into a more than 5,000 words monster, for sure. That's a short story about implementing font rendering in a game engine!

The video would be very dense as well, and I truly believed that I had something good in my hands, there's not much about this whole process online, and I always wondered why, and I wanted to be *That Dude* that had it online and with enough SEO I could be the online reference to rendering fonts in OpenGL.

Maybe I have learned the worst way why there isn't much about it online?

When I sat down to write about it and stared at the complexity of the process, I just... didn't want to do it? I just didn't care, actually. I didn't want to talk about fonts, it's a boring and complicated process and what does it achieve? Being able to read things?

In that process I have written a video script that is about not wanting to talk about fonts, and the things I did while avoiding to talk about it, but I end up talking about it as I detail every single step I took to achieve that prefacing with how much I didn't want to talk about it. Maybe that video will se the light of the day, someday.

It's an interesting concept because it's not really a tech video, it's not a tutorial and the goal is not really to teach you about doing fonts, it's just a video. When you start doing this whole YouTube thing you start having a lot of realizations and questions, and the first realization is that talking about programming is boring and annoying, but I still want to touch on these subjects, but more through the lens of what my experience was like going through that process.

### what's next

A lot has happened between the day I'm writing this (last week), the day I'm proofreading this (right now) and the day I merged "feature/fonts" into "dev" on my game engine. I've moved to the Bay Area and I have flirted with the idea of acquiring a MacBook Air so I would be able to, at the same time, touch grass, code, and write. In other words, so I could achieve peak programmer performance.

But to do that, I first needed to compile gueepo2D on a macbook air. My whole reasoning behind doing it in OpenGL first and using SDL2 was so I could have an easy time setting it up on Mac OS and Linux, because who knows who is going to use it, who knows what type of computer I will have in the next 3 months or so.

Needless to say that nothing is ever as simple when dealing with Apple Inc. Besides having to downgrade the OpenGL version from 4.5 to 4.1 on the whole engine (*and now considering just going straight down to 3.3*, because, heck, why not?) and changing some weird things like `sizeof Color` to `sizeof(Color)` because for some reason Apple Clang requires it to be that way?! - I finally reached a brick wall. I can't for the love of me get textures to render. Something about textures being unloadable, I learned that the M1 processor shader compiler actually has a bug that doesn't allow you to cast a float to an int on a fragment shader, so that's fun. And it breaks my whole batch rendering setup. But even when trying to recreate this in an isolated environment and with a single non-batched texture, I get the same issue.

**post-draft update:** Hi, it's me from the future. I managed to figure out what was wrong with this, here's what was wrong.

I was doing this after creating a texture.

```cpp
glTexParameteri(m_textureID, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
glTexParameteri(m_textureID, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
```

To the untrained eye this seems fine, and I was looking at this *a lot* thoughout the days, turns out that's **ILLEGAL** OpenGL code. The first parameter should be what we are setting the parameter of (as in, it's a Texture), and not the ID of the thing. Here's how the correct version looks like.

```cpp
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
```

So, the bottom line is that, actually, the problem here is that NVIDIA was letting me get away with **ILLEGAL** OpenGL code, I don't know if I should be angry at Apple or Nvidia.

---

But this whole tech adventure put some thoughts in my head, my game engine is, somewhat, architected with the intention of adding new graphic APIs in the future, so I could just *not* use OpenGL.

And there a couple things that I can do here.

1. The most obvious one is implementing the Metal graphics API, that's what Apple wants me to do, ultimately. Learning something new is never a bad thing, but the return I would get from this is minimal, I have no intention whatsoever of being a graphics programmer, so learning new graphics APIs is not on the top of my priorities.
2. The second most obvious is implementing the Vulkan graphics API. That's the OpenGL substitute, that's the future of multiplataform graphics rendering, so it is probably the best choice here. The biggest issue is that as OpenGL is barebones on Apple Personal Computers nowadays, Vulkan is kind of that as well, the go-to way is using MoltenVK, a third-party reimplementation of Vulkan that uses Metal behind the curtains.
	1. Vulkan is a nightmare for developers, but I heard it's a breeze for everyone else, and hey, I'm fine with that actually. My game engine don't do much more than rendering squares with textures batched in a single draw call, so I don't think it would be a big stretch to have Vulkan up and running. The Cherno did it in a week for a 3D game engine, so I guess I could do it on the same time frame for a 2D game engine.
3. There are also other options I can entertain, one that I like a lot is having a SDL2 Renderer backend, SDL2 is already a requirement for gueepo2D, so having an implementation for its renderer safely give me something that will have minimal functionality on all platforms without much headache. There are some downsides to using it, and the biggest reason I went way from it is so I could have my own Shaders.

Needless to say that none of these options would be *easy*, we are talking about changes that probably are going to fundamentally change how the renderer of gueepo2D is architected, but oh well, that's just another day of being a game programer and making your own game engine.

Now, I have no intention to dream big, and this is not me dreaming big but just a big *what if* scenario - Adding more graphics API to my game engine will further improve the platform/rendering abstractions, to a point where if I have three graphics API there, I might actually be confident that the abstraction is *good.* Now, if gueepo2D is ever used to put a game on the Nintendo Switch or Playstation 4, that abstraction will absolutely need to be at its best, because we wouldn't want to waste time refactoring the engine when we should be implementing platform-specific code.

After all that rendering rambling, there are some other updates on gueepo2D. And the update is that I removed a bunch of code, including the entity-component system. Upon researching similar engines/frameworks and seeing what was needed for a game engine, I arrived at the conclusion that gueepo2D should be even *more* minimal than what I wanted it to be. We are talking about a framework with an application layer, input handling, a renderer, a sound API and an event handler. That's about it.

Although on the surface it seems simple, nothing is ever simple, all this would require backend-facing libraries to deal with data serialization, saving/loading files, internal data structures, loading and storing assets, and a good old interface/API to use Lua in the engine, that's a big design goal I have.

Lastly, inspired by The Cherno, I really am thinking about trying to be more "professional" about this game engine, by that I mean actually having releases, stable/development versions and things like that. It's getting to a point where even I am annoyed, I am running 3 or 4 small projects at the same time in gueepo2D to test many different design ideas and have an idea of what are the requirements for different types of games, and every time I make a change I have to go through a bunch of projects updating the engine and fixing anything that might have been broken.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tHjJHmDxhug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>


### what else

That's it for gueepo2D, but there's more. I currently have my eyes on three different pieces of technology that I want to investigate more and have an idea of how they work. The big goal here is to learn how these smaller frameworks that were actually used to ship games work. They are very different from what my game engine was, and a lot of the recent changes and reworks are a way to get closer to these, and I have to say that I'm having so much more fun using it now.

When doing this you come up with really interesting questions, like: "Do I really need a entity-component system?" - It's really easy to jump into the decision of just cranking in an entity-component system into a game engine, because, well, the system is battle-tested and so versatile that every game could use and benefit from it. But is it really the best solution for every type of game out there? Well, probably not.

I have this weird little turn-based randomly generated environments game that I make to test new frameworks, new engines, new anything, and a huge monster class is all I need. I don't need to create multiple entities with a transform component, a movement component, a health component or whatnot.

Making less assumptions on my game engine is good, I like it. Makes me ask more questions about whatever I'm designing and make it so I come up with better systems and tools to achieve what I want more efficiently.

Anyway, these are the thigns I am looking at.

**libGDX**
It's a framework that uses OpenGL ES and games like Slay the Spire, Delver, and Pathway used it! I have started doing my broughlike bullshit with it and I had a lot of fun, it was really easy to setup on my macbook, which is the reason why I started experiment with this instead of MonoGame, really.

**MonoGame and FNA**
First, there was XNA, and from its ashes we got MonoGame and FNA. Although different, they have their similarities, as in being successors to XNA. FNA is a reimplementation, MonoGame is an actual successor.

None of them worked on my MacBook Air though, goddamnit these M1 processors. And I'm not really feeling like banging my head against the wall for a few days to get it sorted out. Maybe another day.

As for the question of whether to use MonoGame and FNA... I don't know? They are both open source and community maintained, with the difference that FNA is heavily maintained by one single individual, and, for some reason, that makes me trust it more.

When I get to it, I will probably do some very basic usage on both of them, and pick one based on that to finish my demo C# broughlike.

**raylib**
I had some contact with it before and I had a very bad first impression, but I'm willing to give it another chance, but I'm less interested on it mainly because it's C/C++.

An extra reason why I'm curious about MonoGame and libGDX is because deep in my mind I frequently ask myself: "Do I really need to be using my own engine and C++ to make my 2D tile-based pixel art games?" - Well, the answer is *no*, but at the moment, I want to have my own thing, but if I ever get to a point where I'm aiming to be productive and just crank out games without worrying too much about the underlyings, C# and Java are my obvious go-tos, most likely C#, but you never know.

No, I'm not interested on using a full-blown single-editor commercial game engine like Unity and Unreal. I *am* open to making concessions to Godot, though, but that's pretty much the only one.

---
### so...

So this was just a very convoluted way to just type what's on my mind, what I'm working on, what I want to work on next and what I might actually work on next.

Here's a list to clarify it for myself.

1. video about font rendering on gueepo2D, but I don't actually want to talk about font rendering, it's a video about me talking about not wanting to talk about font rendering but in the process I describe on a high level what needed to be done.
2. making a simple broughlike with libGDX (code project + youtube video)
3. I want to write a script and talk about the whole "gueepo2D" cleanup on a youtube video, I think there are some interesting considerations and questions to ask about all this, the challenge here is making me just talking to the camera be an entertaining video
4. probably implementing Vulkan on my game engine (code project + youtube video)
5. making a simple broughlike with MonoGame and/or FNA (code project + youtube video)
6. make the same simple broughlike with gueepo2D while engaging in some minor reestructuring of the game engine incorporating good bits I take from libGDX and MonoGame/FNA (code project + youtube)
7. That's enough things to do, but after that, who knows?! might actually make and release a game with gueepo2D.

---
### random things about life and creative consumption

One of my reflections at the end of 2021 was how I actually just really worked all day, have a 9-to-5 job, work on writing videos, coding my own game engine and little code experiments, and if I wasn't doing any of that I was trying to engage in "productive" activities.

I love all of that but when thinking about it I felt a bit alienated from the outside world, I wasn't getting any creative input from other authors, and yet I dreamed about writing my stories, making my own games and making my own music.

To be fair, I was always big into music and never stopped, so there's a lot of input *there*. But there wasn't really much *input* when the topic was movies, tv shows, and books, and that was something I wanted to change. I always wanted to change that but never managed to, until I reframed it from "I want to read more, and watch more movies/shows" to "I will read 30 minutes everyday and watch something for 30 minutes to 1 hour everyday".

In hindsight this sounds obvious and like something you could read on a bullshit self-help book worth 20 bucks or something, but hey, my life experiences and thoughts are free for you here at gueepo dot me forward-slash devblog.

## boooooks
Recently I have finished Snow Crash (it's really good) and The Handmaid's Tale (scaringly good), with that I've reached my goal of reading 12 books in a year, and it's August! So that's nice. Currently I'm reading Terminal Boredom by Izumi Suzuki (proofreading update: I finished Terminal Boredom by Izumi Suzuki, it's really good) and On Writing by Stephen King.

All of them are bangers and I recommend it.

### watching stuff
I have rewatched Spirited Way for what it's probably the 4th time now, and I always have a good time watching it, there's this TikTok video about Miyazaki and how his stories don't really portray a "good vs. evil" duality, and that seeing the world through the lens of "good vs. evil" would, actually, put you on the "evil" side of things by default, and I can see that.

Deleting TikTok out of my life was a huge net plus but damn I miss the random occasional philosophy short videos.

I have also watched Cowboy Bebop (a classic) and why no one told me anime could be this good (gone emotional). Better Call Saul reached its end, that was sad, but it owns. Better Call Saul might be my favorite anime of all time.

### play

I've played some Live a Live (and will play more) - I always had this design idea of something somewhere in between a Crypt of the Necrodancer (no music) and Final Fantasy Tactics, and to my surprise, that's exactly what Live a Live does!

It is a hard design task to mix in the turn-based single tile movement system with a combat system that can reach a good distance, but it's really well done on Live a Live, even though it leans more on the easy side of things (at least what I have played).

---

If you made it all the way here I just tricked you into reading 3,000 words of personal ramblings, what are you doing with your life?

<br/>
[twitter](http://twitter.com/guilhermepo2)<br/>
[youtube](https://www.youtube.com/channel/UCOIlr-LtVmaIRdI0oe2lthg)