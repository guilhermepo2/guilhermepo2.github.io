---
layout: post
title:  In which I talk about std::unordered_map
date:   2021-02-27 19:20
image:  '/images/cppmeditations/cppmeditations.png'
tags:   [cpp-meditations]
---


In my last post I talked about doing multiple animations in an Animated Sprite Component, and for that I've used `std::map`.

Like this:

```cpp
std::map<std::string, AnimationClip*> m_AnimationList;
```

And since the last post I've been thinking: *"I didn't give much thought to `std::unordered_map`, maybe I should?"* - And then here I am looking at the differences between a map and an unordered map. 

**Hint:** Since I'm using a string as the key, I don't care about order, and not doing something is more time-efficient than doing something, so I'm going into this expecting that an unordered map is what I want.

Time to read some documentation!

```
Unordered map is an associative container that contains key-value pairs with unique keys. Search, insertion, and removal of elements have average constant-time complexity.
```

Average constant-time complexity? I like that! 

Digging deeper, what exactly is the cost of accessing an element? (i.e. `std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::operator[]`) and what we find is: `Average case: constant, worst case: linear in size.`

Interesting. So the next question is, *What* is the worst-case? It seems that the worst case happens when you try to access a key that is not on the map, which results in an insertion. The documentation is kind enough to recommend us to look at the function `at()`, which throws an exception when the key is not found. Yikes.

Now here is the engine design question of the day: If we use `operator[]` and the game tries to play an animation that doesn't exist, what happens? A new "Animation" will be created (and that's not what we want) and we won't know that animation didn't exist! (and that's not what we want!) - But I guess this is a problem for future me, unordered maps sounds good for me now.

Looking at the `std::map` documentation we find a more straight-forward answer for the time-complexity on `std::map<Key,T,Compare,Allocator>::operator[]` which happens to be `Logarithmic in the size of the container.`

And we know that 1 (one) is smaller than log(n)!

So how do we change from a map to an unordered map? Well, they were both designed to do the same things and solve the same problems, but in different ways, so luckily their function signatures and everything is the same, so the only change needed was changing from `std::map<std::string, AnimationClip*> m_AnimationList;` to `std::unordered_map<std::string, AnimationClip*> m_AnimationList;` and we have our lovely pirate running again!

![run animation]({{site.baseurl}}/images/cppmeditations/r2d_runanimation2.gif)

Follow me on [twitter](https://twitter.com/guilhermepo2)!!

