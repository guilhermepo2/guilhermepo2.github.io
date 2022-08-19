---
layout: post
title:  Figuring out spritesheets on Modern OpenGL
date:   2021-05-01 09:00:00 -0200
image:  '/images/techblog/opengl_spritesheets.png'
tags: [game-engine, opengl]
---

Probably one of the classicals problems you will face when doing a 2D game, or a 2D game engine, is: "How to make a sprite sheet?". 

A sprite sheet, or a tile sheet, or a texture atlas, or whatever fancy name kids nowadays use, is basically a texture where you are interested in rendering just some parts of it, you don't want to present the texture in its entirety, just a little piece of it. There are performance motivation behind it, of course, creating and binding textures is expensive, so reusing a texture is a good thing, but there is also a productivity aspect to it, working on a tilesheet that is just one file is easier than working on 30 different files, but that's not today's topic.

Image credits goes to [Kenney](https://www.kenney.nl), whose assets I've been using to test and implement this feature (and all other features).

Now brace yourselves because we will be looking at a lot of **code**.

## Where do we start?

When doing the famous OpenGL boilerplate (which is a lot of work, really), you will end up with something on these lines:

A float array that will represent the vertices positions and texture coordinates on your shader.

```cpp
float vertices[] = {
	// positions  // texture coords
	 0.5f,  0.5f, 1.0f, 1.0f,   // top right
	 0.5f, -0.5f, 1.0f, 0.0f,   // bottom right
	-0.5f, -0.5f, 0.0f, 0.0f,   // bottom left
	-0.5f,  0.5f, 0.0f, 1.0f    // top left 
}
```

And then you will bind the array like...

```cpp
glGenBuffers(1, &m_VertexBufferID);
glBindBuffer(GL_ARRAY_BUFFER, m_VertexBufferID);
glBufferData(GL_ARRAY_BUFFER, _numVerts * (_vertPropertiesCount * sizeof(float)), _verts, GL_STATIC_DRAW);

// position attribute
glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 4 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);
// texture coords
glVertexAttribPointer(1, 2, GL_FLOAT, GL_FALSE, 4 * sizeof(float), (void*)(2 * sizeof(float)));
glEnableVertexAttribArray(1);

glGenBuffers(1, &m_IndexBufferID);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, m_IndexBufferID);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, _numIndices * sizeof(unsigned int), _indices, GL_STATIC_DRAW);
```

## What we have to change to draw parts of a texture?

And this is all fine, but when you want to draw small pieces of a big texture, what you want to change is the texture coordinates, texture coordinates are uv coordinates that ranges from (0, 0) to (1, 1), and you have to find the small piece of the texture you want within that range.

This usually will involve some math like this:

```cpp
float spriteWidth = 48.0f;
float spriteHeight = 48.0f;
float tw = spriteWidth / texture->GetWidth();
float th = spriteHeight / texture->GetHeight();
int xPosition = 0;
int yPosition = 10;

float NewTexCoords[] = {
	(xPosition + 1) * tw, (yPosition + 1) * th,
	(xPosition + 1) * tw, yPosition * th,
	xPosition * tw , yPosition * th,
	xPosition * tw, (yPosition + 1) * th
};
```

And then, boom! You have your new texture coordinates! But as you might see there is still one problem to solve, or one question to ask, if you may wish to frame it like that. **How will I dynamically set the texture coordinates?!** - That's where I got lost for a good time.

And the solution is simple, really, and it is comprised of two steps.

1. We have to separate vertex position and texture coordinates.

```cpp
float vertices[] = {
	 0.5f,  0.5f,
	 0.5f, -0.5f,
	-0.5f, -0.5f,
	-0.5f,  0.5f
};

float texCoords[] = {
	1.0f, 1.0f,
	1.0f, 0.0f,
	0.0f, 0.0f,
	0.0f, 1.0f
};
```

Binding them won't be much different though, you will end up with a new buffer, and one more variable to keep track of.

```cpp
glGenBuffers(1, &m_VertexBufferID);
glBindBuffer(GL_ARRAY_BUFFER, m_VertexBufferID);
glBufferData(GL_ARRAY_BUFFER, _numVerts * (_vertPropertiesCount * sizeof(float)), _verts, GL_STATIC_DRAW);
// position attribute
glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

glGenBuffers(1, &m_TexCoordsBufferID);
glBindBuffer(GL_ARRAY_BUFFER, m_TexCoordsBufferID);
glBufferData(GL_ARRAY_BUFFER, _numVerts * (_vertPropertiesCount * sizeof(float)), _texCoords, GL_STATIC_DRAW);
// texture coords
glVertexAttribPointer(1, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);
glEnableVertexAttribArray(1);

glGenBuffers(1, &m_IndexBufferID);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, m_IndexBufferID);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, _numIndices * sizeof(unsigned int), _indices, GL_STATIC_DRAW);
```

It's worth noting that the vertex shader didn't change at all!

Now, it's time for the grande finale! With these data properly separated, all you have to do is change the data on the texture coordinates buffer!

**Should I use glBufferData again?!** No! Let's take a peek at *documentation*, shall we? [glBufferData](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBufferData.xhtml) tells us the following: 

```
While creating the new storage, any pre-existing data store is deleted. The new data store is created with the specified size in bytes and usage. If data is not NULL, the data store is initialized with data from this pointer.
```

Creating a new storage? deleting pre-existing data store? Sounds like a bit too much when we just want to move some floats around, right?

That's where [glBufferSubData](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBufferSubData.xhtml) kicks in, and its documentation tell us: 

```
When replacing the entire data store, consider using glBufferSubData rather than completely recreating the data store with glBufferData. This avoids the cost of reallocating the data store.
```

Avoiding the cost of reallocating data? That sounds like something we want to do!

So changing the data on our Texture Coordinates buffer is as simple as:

```cpp
glBindBuffer(GL_ARRAY_BUFFER, m_TexCoordsBufferID);
glBufferSubData(GL_ARRAY_BUFFER, 0, 4 * (2 * sizeof(float)), _texCoords);
```

And with that I was finally able to get an individual sprite on a spritesheet, and with some extra magic, I was finally able to render a map imported from Tiled!

![Tilemap Example]({{site.baseurl}}/images/techblog/opengl_spritesheet_1.png)

If you have read so far into this, thank you! I lost a good amount of time wrapping my head around this issue and had trouble figuring out the step of dynamically setting *just* the texture coordinates. If you are feeling venturous enough, you want to give feedback, you can reach me on [Twitter](http://twitter.com/guilhermepo2) or check my [website](http://gueepo.me/)!
