---
layout: post
title:  Nearest Neighbor filtering in OpenGL textures
date:   2021-02-15 13:53
image:  '/images/cppmeditations/cppmeditations.png'
tags:   [cpp-meditations]
type: cppmeditations
---

For some context, I am developing a lightweight 2D game engine, [realiti2D](https://github.com/guilhermepo2/realiti2D), as a fun experiment - And recently I decided to take the next step and start making a game on it, I feel like by doing a game I can get a better grasp on what needs to be added to the engine and I can have a better sense of workflow to decide which tools I will want to make.

But when loading a gorgeous pixel art pirate character, this is what I saw:

![Linear Filter]({{site.baseurl}}/images/cppmeditations/filter_linear.png)

Oh no, that's **not** what I want.

I've seen this problem too many times in multiple different places and I know that this is a matter of using linear texture filtering when I want to use nearest neighbor filtering instead. So this raises the question: *"Where do I change that?"*

And this is what I found right when a new texture is loaded into the engine:

```cpp
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
```

**Wait!** You might say, "right when a new texture is loaded?" - Why, yes, this is also something that was made clear to me during this process. The function glTexParameter* acts on the currently bound texture, so it makes sense to set these parameters as the texture is loaded.

But anyway, there is a **GL_LINEAR** there! That's what I want to change, right? After some googling on OpenGL documentation, I found that the constant for nearest neighbor is **GL_NEAREST**.

```cpp
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
```

So this is how it looks now:

![Nearest Neighbor Filter]({{site.baseurl}}/images/cppmeditations/filter_nearest.png)

Perfect!

Also, shoutout to Pixel Frog for making the amazing art at the [Treasure Hunters](https://pixelfrog-store.itch.io/treasure-hunters) asset.