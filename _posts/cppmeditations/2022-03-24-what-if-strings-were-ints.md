---
layout: post
title:  What if strings were ints?
date:   2022-03-24 15:00
image:  '/images/cppmeditations/cppmeditations.png'
tags:   [cpp-meditations]
---

There comes a time in everyone's life where they ask themselves: "What if strings, but integers?"

Strings are a complicated bit, eh. At first, they might seem fairly straightforward, what is out there that a `std::string` can't handle?! It happens that the answer is a lot, actually.

A big concern on strings is *internationalization* ( i.e. translating things :) ), but that's not the point of this post, I just wanted to put that in your mind. The point of this post is to talk a little bit about performance!

Strings are expensive to work with at runtime, for you, a human, it is fairly straightforward to use your capabilities to know if, let's say, "jalapeno poppers" and "potatoes" are different chains of text. But for a computer? not so much. Give a computer the task to compare the words "microphone" and "microphone" and it will go like "yep, sure that's the same letter on the first position, yep, sure that's the same letter on the second position (...)". The point is that comparing and copying strings is expensive.

According to [Jason Gregory](https://www.gameenginebook.com/):
> "During one project I worked on, we profiled our game's performance only to discover that strcmp() and strcpy() were the top two most expensive functions!

What if there was a way to make it better? Well, what if we could hash our strings?

Although for you, a human, comparing 238403294 and 238043294 might be a difficult task, a computer can look at it and be like "yep, sure they are not the same!"

I know you thought they were the same :)

If we have the ability to hash a string, then checking if a string is the same as another is fairly straightforward, and even better, you can stablish a "less than" and "bigger than" relationship between strings. Whoah, sorting strings!

And maybe we could have a hashmap that establishes a relationship between the hashes and the strings, so if you use the same string in another part of the code, it won't need to create that string, which is a double win since you don't have the memory overhead of allocating that string and you don't have the performance overhead of creating it.

So **how do you hash a string?**

Hashing algorithms are not the most straightforward things out there.

```cpp
unsigned hash(unsigned K)
{
   K ^= K >> (w-m); 
   return (a*K) >> (w-m);
}
```

I mean... Sure... [source](https://en.wikipedia.org/wiki/Hash_function#Multiplicative_hashing)

And unless you really want to get into it, most of it is finding a function that will work and give the same result for the same string, better trust the smart people coming up with the **MATH** this time.

But in essence, any hashing algorithm will do. A famous one is CRC32. Let's take a look. [Source](https://stackoverflow.com/questions/34153765/generate-checksum-for-string)

```cpp
unsigned reverse(unsigned x) {
   x = ((x & 0x55555555) <<  1) | ((x >>  1) & 0x55555555);
   x = ((x & 0x33333333) <<  2) | ((x >>  2) & 0x33333333);
   x = ((x & 0x0F0F0F0F) <<  4) | ((x >>  4) & 0x0F0F0F0F);
   x = (x << 24) | ((x & 0xFF00) << 8) |
       ((x >> 8) & 0xFF00) | (x >> 24);
   return x;
}

/* This is the basic CRC algorithm with no optimizations. It follows the
logic circuit as closely as possible. */
unsigned int crc32a(const char* message) {
   int i, j;
   unsigned int byte, crc;

   i = 0;
   crc = 0xFFFFFFFF;
   while (message[i] != 0) {
      byte = message[i];            // Get next byte.
      byte = reverse(byte);         // 32-bit reversal.
      for (j = 0; j <= 7; j++) {    // Do eight times.
         if ((int)(crc ^ byte) < 0)
              crc = (crc << 1) ^ 0x04C11DB7;
         else crc = crc << 1;
         byte = byte << 1;          // Ready next msg bit.
      }
      i = i + 1;
   }
   return reverse(~crc);
}
```

I mean... Sure dude. What matters here is that if you call `crc32a("Jalapeno Poppers")` you will get `3660972395`. 

And that's pretty much it? 

Let's take a look at another way to hash a string, this one comes from the book Game Coding Complete, Fourth Edition. [Source](https://github.com/MikeMcShaffry/gamecode4/blob/master/Source/GCC4/Utilities/String.cpp)

```cpp
void* HashName(char const* pIdentString) {
	unsigned long BASE = 65521L;
	unsigned long NMAX = 5552;

#define DO1(buf, i) { s1 += tolower(buf[i]); s2 += s1;}
#define DO2(buf, i) DO1(buf, i); DO1(buf, i+1);
#define DO4(buf, i) DO2(buf, i); DO2(buf, i+2);
#define DO8(buf, i) DO4(buf, i); DO4(buf, i+4);
#define DO16(buf) DO8(buf, 0); DO8(buf, 8);

	if (pIdentString == nullptr) {
		return nullptr;
	}

	unsigned long s1 = 0;
	unsigned long s2 = 0;

	for (size_t len = strlen(pIdentString); len > 0; /* x */) {
		unsigned long k = len < NMAX ? len : NMAX;
		len -= k;

		while (k >= 16) {
			DO16(pIdentString);
			pIdentString += 16;
			k -= 16;
		}

		if (k != 0) {
			do {
				s1 += tolower(*pIdentString++);
				s2 += s1;
			} while (--k);
		}

		s1 %= BASE;
		s2 %= BASE;
	}

	return reinterpret_cast<void*>((s2 << 16) | s1);

#undef DO1
#undef DO2
#undef DO4
#undef DO8
#undef DO16
}
```

If this one seems even more cryptic, check the source for some comments and clarifications from the authors. This one returns a `void*` because it looks fancier on the editor when debugging, but we can get an unsigned long like so:

```cpp
unsigned long poppers2 = reinterpret_cast<unsigned long>(HashName("Jalapeno Poppers"));
```

And the result of that will be `906888819`.

Of course, we are talking about hash functions, so it's possible that a collision happens, which means it's possible that different strings will lead to the same number. But if you use something like CRC-32, your strings can be mapped into 4 billion different values, and your game won't contain nearly as much that amount of strings, so the likelihood of a collision is very low. But if it happens, a real solution that I've seen is just adding a space at the end of one of the strings. If you are not happy with that, listen to Jason Gregory:

> That being said, Naughty Dog has moved to a 64-bit hashing function for The Last of Us Part II and all of our future game titles; this should essentially eliminate the possibility of hash collisions.

Just add more bits to the hashing function!

It's still a bit of a jump from having a hashing function to having a full string class able to store a string hashmap and have comparisons, but hey, the most confusing part is over. And if you want more on that, you can look at the Game Coding Complete code: [String.h](https://github.com/MikeMcShaffry/gamecode4/blob/master/Source/GCC4/Utilities/String.h) [String.cpp](https://github.com/MikeMcShaffry/gamecode4/blob/master/Source/GCC4/Utilities/String.cpp)

[twitter](https://twitter.com/guilhermepo2)

[youtube](https://www.youtube.com/channel/UCOIlr-LtVmaIRdI0oe2lthg)