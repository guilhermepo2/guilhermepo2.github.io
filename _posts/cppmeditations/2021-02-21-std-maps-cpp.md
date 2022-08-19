---
layout: post
title:  In which I talk about std::map
date:   2021-02-21 13:20
image:  '/images/cppmeditations/cppmeditations.png'
tags:   [cpp-meditations]
type: cppmeditations
---

I've dabbled with std::map(s) in C++ already, yes. But for some reason it just never sticks, so here I am writing a tad bit about it in hopes I will remember it better this time ?!

Here's the problem: When making a 2D game, often times you want to be able to have multiple types of animation on a component, and play a specific animation under specific gameplay conditions. But I didn't have that!

Since I already mentioned `std::map`, the solution presents itself as `std::map<std::string, AnimationClip*> m_AnimationList`.

Now the question is: How to add and retrieve content from the map?

Luckily, adding something to a `std::map` is as simple as a function call.

```cpp
void AddAnimationClip(std::string AnimationName, AnimationClip* Clip) { m_AnimationList.emplace(AnimationName, Clip); }
```

And here's how I retrieve a specific Animation Clip:

```cpp
AnimationClip* GetAnimationClip(std::string ClipID) {
	if (m_AnimationList.count(ClipID) != 0) {
		return m_AnimationList[ClipID];
	}
}
```

And finally, to play an animation I just have a pointer to the current animation being played, and that's where all the logic and sprites come from: `m_CurrentAnimation = m_AnimationList[AnimationName]`.

![run animation]({{site.baseurl}}/images/cppmeditations/r2d_runanimation2.gif)

Now, it's beyond this short post to talk about unordered maps, whether you should be using strings as a key or not, so maybe in the future I can briefly bring that up?!




