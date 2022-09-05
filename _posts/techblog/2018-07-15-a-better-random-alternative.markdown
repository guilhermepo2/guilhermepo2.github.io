---
layout: post
title:  A Better Random Alternative to Straight Random Range
date:   2018-07-15 21:37:20 -0300
type: techblog
---

First thing, I saw about this method first on this [blog post](https://newarteest.wordpress.com/2017/11/25/some-useful-scripts/) - But it talks about more things than just the randomness, so I decided to write this blog post as I was having troubles with random generated stuff.

**Context:** I am currently doing a tetris implementation. And I'm having trouble with the way the pieces are generated on screen.

### What do I currently Have?

My current code looks like this:

```
int i = Random.Range(0, mAllShapes.Length);
```

Where mAllShapes is my array with all seven Tetris shapes. 

The results of this method is pretty bad. I can't really point you the reason why but it just *feels* bad. It is not rare to get the same shape three times in a row and it is not rare simply not getting a specific shape for a really long time.

And when talking about Game Development, if something feels bad, it is our duty to change it.

### What approach should I use?

The idea is pretty simple, instead of getting a random shape out of nowhere, we build a *bag* (which is actually a vector or an array) with the shapes repeated *n* times. And *then* we shuffle the bag using randomness!

**First Step:** Having a vector of Shapes - Tetris has seven shapes and I will use 15 of each, resulting in 105 Shapes.

```
mShapesBag = new Shape[(mShapeAmmount * mAllShapes.Length)];
```

Look! I created a variable mShapeAmmount (which is 15) so if I decide to change it in the future I can! I am such a good programmer!

**Second Step:** Populating the vector.

```c#
void InitShapeBag() {
    int tIndex = 0;
	foreach(Shape shape in mAllShapes) {
		for(int i = 0; i < mShapeAmmount; i++) {
			mShapesBag[tIndex] = shape;
			tIndex++;
		}
	}
}
```

(I'm pretty sure there is a better and more optimizable way to do this, but it will do for now)

**Third Step:** Shuffle it! With the **Knuth shuffle** algorithm.

```c#
void ShuffleBag() {
    for(int i = 0; i < mShapesBag.Length; i++) {
        Shape tShape = mShapesBag[i];
		int tRandomIndex = Random.Range(i, mShapesBag.Length);
		mShapesBag[i] = mShapesBag[tRandomIndex];
		mShapesBag[tRandomIndex] = tShape;
	}
}
```

I've chosen to do it in-place.

**Fourth Step:** When getting a new shape, let's get it from our vector!

```c#
Shape GetRandomShape() {
    if(mCurrentIndex >= mShapesBag.Length) {
		mCurrentIndex = 0;
		InitShapeBag();
		ShuffleBag();
	}

	return mShapesBag[mCurrentIndex++];
}
```

Keep in mind that doing this InitShapeBag and ShuffleBag stuff **while** playing can result in a big latency and bother the player's experience at this moment.

**Always** playtest.

Fortunately, Tetris is a simple problem and the vector is not tha big, so reinitializing the vector and shuffling goes unnoticed.

Hmm... That's pretty much it for this blog post.

Just a quick awareness post so people avoid going straight to `Random.Range()` way of doing random things, there is always better approaches that will result on better player experience overall.

This Bag/Knuth Shuffle method makes the result more evenly distribuited, which is usually what we expect from randomness.

Any doubt, questions or anything feel free to contact me on [twitter](http://twitter.com/guilhermepo2)!