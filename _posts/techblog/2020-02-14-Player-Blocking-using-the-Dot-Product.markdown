---
layout: post
title:  Player Blocking using the Dot Product
date:   2020-02-14 09:00:00 -0200
image:  '/images/techblog/blueprint_dot_shield.jpg'
tags:   [game-development]
type: techblog
---

## Introduction

Everyone knows that 3D Math is important for game development, specially gameplay programming, A very common concept is the dot product, and when searching for it, there is a big lack of concrete examples on where this can be applied, and when you find one, it's always the same old "How do I know when an enemy is looking at the player?" - On that topic, I wanted to create a series of blog posts, every time I use the dot product, or any 3D Math concept really, I would create a quick and short blog post describing what I wanted to achieve, and how I achieved it.

This is a not blog post about what is the dot product, you can perform a quick google search to find its mathematical definition and interpretation, this is a quick post about using the dot product in a gameplay mechanic.

## The Problem

![Dot Product]({{site.baseurl}}/images/techblog/dot_product_yhis.png)

Suppose that we have enemies that shoot projectiles against our player, but to defend against them, we want our player to have a shield that they can use to defend against projectiles. When the player is blocking, how do you know if the shield is in between the player and the projectile? i.e. How do you know the player is actually blocking?

**Why you don't...** Just check if the projectile hit the shield? - Well, usually we don't really want the shield to have collision, because we don't want it to collide with the environment or other objects. In other scenario, maybe the shield collision is a little bit off, so it can come off as unfair to the player or maybe it will feel like the player wasn't really blocking.

**Solving the problem in theory:** In theory, you just have to check for the projectile velocity against the player forward vector - the projectile velocity will tell you the direction the projectile is going towards, and the player's forward will tell us which direction the player is facing. The ideal situation will give us **-1** as a result, which means the player is looking directly to the projectile, and, when the shield is raised, the player will block it.

## The Implementation

![Implementation]({{site.baseurl}}/images/techblog/blueprint_dot_shield.jpg)

The first thing to check on the implementation, is whether the player is really blocking, this boolean variable is toggled via the Block input, which is activated by the player. Following that, we calculate the dot product of the projectile's normalized velocity and the player forward vector, and check if it's between **-1.0** and **-0.8**, if true, the projectile was blocked, if false, the player still takes damage.

**Why normalize the velocity?** - When calculating the dot product of two normalized vectors (the forward is already normalized), you guarantee the result will be between **-1.0** and **1.0**, so it's easier to understand the resulting value, in case of not normalized vectors, you can obtain higehr numbers as a possible outcome, and we wouldn't really know what that means.

**Why check if the value is between -1.0 and -0.8?** - The player will rarely be looking at the exact opposite direction as the projectile, the enemy can shoot from weird angles and the player can rotate to weird angles, in most cases when the player is looking directly at the enemy, the result will be around **-0.95** - We add some margin to that value, so players can have a little bit of an advantage when blocking.

That's it for this quick adventure on dot product in gameplay mechanics!

If you are feeling venturous enough, you can reach me on [Twitter](http://twitter.com/guilhermepo2) or check my [website](http://gueepo.me/)!
