---
layout: post
title:  AI Analysis of Pokemon Puzzle Challenge
date:   2018-07-23 19:31:20 -0300
type: techblog
---

After 3 hours trying to download OpenEmu for Mac OS (Thanks Brazilian Internet) I was finally able to play Pokemon Puzzle Challenge and try to analyze it! (Don't worry, I have a copy on my 3DS so it's totally legal!)

I wanted to play and analyze it so I can come with an idea on how to write my own AI for a game I'm working on. Game which has a very similar system to Pokemon Puzzle Challenge.

**First Thing:** There are plenty of game modes. I will be basing myself on Challenge Mode and on Normal Difficulty, hopefully the other difficulties are just a matter of adjusting parameters.

Also, the game I'm working on is inspired on Roguelike's progression, so choosing a level of difficulty at the beggining is not going to hapen. I should just come with something that feels good, challenging and can be tuned to progressively provide more challenge to skilled players.

I will perform three simple experiments:

1. Don't play at all and see what happens.
2. Play very bad, just to survive long enough.
3. Play as I normally would.

I actually recorded my doing this and you can see the video below.

<a href="http://www.youtube.com/watch?feature=player_embedded&v=_wtOYX6rAIw" target="_blank"><img src="http://img.youtube.com/vi/_wtOYX6rAIw/0.jpg" 
alt="POKEMON PUZZLE CHALLENGE AI" width="240" height="180" border="10" /></a>

So here's some basic annotations:

**While not playing**
1. Enemy Threw a 4 at around 15 seconds.
2. Enemy Threw a 4 at around 40 seconds.

**While trying to play just to stay alive**
1. Enemy Threw a 4 at around 15 seconds.
2. Enemy Threw a 6 at around 20 seconds.
3. Enemy Threw a 5 at around 50 seconds.
4. Enemy Threw a 5 at around 1 minute and 14 seconds.
5. Enemy Threw a 5 a around 1 minute and 40 seconds.
6. Enemy Threw a 4 at around 2 minutes and 4 seconds.
7. Enemy Threw a 6 at around 2 minutes and 8 seconds (just after I've sent a 6)
8. Enemy Threw a 6 at around 2 minutes and 38 seconds.

**Playing Normally**
1. Enemy Threw a 4 at around 15 seconds.
2. Enemy Threw a 6 at around 20 seconds.
3. Enemy Threw a 4 at around 48 seconds.
4. Enemy Threw a 6 at around 52 seconds.

It's interesting to note that the AI always sent a 4 combo in 15 seconds. Coincidence? I guess not.

From these observations what I would try to guess is that the AI is not really playing the game. This should be pretty obvious since you don't actually *see* it playing, but on other games of the franchise, such as *Tetris Attack* you could actually see the AI playing.

The *"AI"* seems to be just a system that drops blocks to the player, it probably has some pre determined rules (Drop 4 Combos on Second 15) and some rules that were written to adapt to how the player is playing. Observe the difference between the first and the last experiment, the length of the battle was the *same*, but the reaction of the enemy was totally different.

So, basically, if I had to guess it would be a Rule Based System with rules based on *how much damage* the player dealt, in other words, how well the player is playing and rules based on time, *how long since last block was sent to the player*.

Pretty simple, right?

But these kind of systems allows to easily adapt to the player skills and provide bigger challenges just as you start the game. It is also pretty forgiving to new players.

If the variables can be tuned in real time (during gameplay) this system could be really interesting.

Oh, I think I got an idea.

Anyway, that's it for this blog post, in the near future (I hope) I should be making another post on *how* I coded the AI system in my game!

Have a good day and you can always follow me on [twitter](http://twitter.com/guilhermepo2)!
