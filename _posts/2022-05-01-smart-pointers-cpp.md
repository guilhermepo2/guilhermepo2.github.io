---
layout: post
title:  smart pointers in C++
date:   2022-05-01 15:00
image:  '/images/cppmeditations/cppmeditations.png'
tags:   [cpp-meditations]
---

It was on my list for a long time, and now I'll finally take a look at smart pointers, how they work, and how to better use them. And, as always, I will write about them.

There's a lot of reasons to use C/C++ and using pointers is probably among the most common reasons why people use it. Figure this, you have the power to decide when you get memory from the computer, and it's only fair that you also have the responsibility of giving it back. 

Sounds fair, sounds powerful, you take it, you give it back, it's all under your control! There's no garbage-collection here, leave this to *slow* languages like C# and Java.

And then C++11 comes in with... limited *garbage-collection* and **smart pointers**! Now you don't need to worry *(too much)* about giving the memory back. Hmm.

I guess garbage collection isn't that bad then?

C++11 introduced the `<memory>` header responsible for *"defining general utilities to manage dynamic memory"* [thanks cpp dot com](https://www.cplusplus.com/reference/memory/)

There are three types of smart pointers:
- shared pointer
- a *weak* shared pointer
- a *unique* pointer

A [std::unique_ptr](https://www.cplusplus.com/reference/memory/unique_ptr/) owns their pointer *uniquely*, meaning no one else can point to that data.

For the purpose of an example, suppose you have this complex class right here:

```cpp
class vec2 {
    public:
    float x, y;
    
    vec2() { std::cout << "vec2 created\n"; }
    ~vec2() { std::cout << "vec2 destroyed\n"; }
};
```

The following program

```cpp
int main() {
    vec2 v;
    return 0;
}
```

Would result in the lines "vec2 created", followed by "vec2 destroyed". But what happens if you have a pointer and you forget deallocate it?

```cpp 
vec2* v = new vec2();
```

Running this program would output just "vec2 created" - You allocated memory and never gave it back, your code has a memory leak, congrats!

That's where we go back to smart pointers, if they are as smart as they say they are, we shouldn't have a memory leak, right?

```cpp
std::unique_ptr<vec2> v(new vec2());
```

As expected, with this we see both the creation and destruction messages printed. If you are on C++14 you can make something like this.

```cpp
std::unique_ptr<vec2> v = std::make_unique<vec2>();
```

And now if a program like this, you will see the creation and destruction messages three times, once for each pointer.

```cpp
int main() {
    std::unique_ptr<vec2> v = std::make_unique<vec2>();
    std::shared_ptr<vec2> v2 = std::make_shared<vec2>();
    std::weak_ptr<vec2> v3 = std::make_shared<vec2>();
    
    return 0;
}
```

Going back to our raw pointer example, how could we fix it? The below is perflectly possible!

```cpp
vec2* v = new vec2();
std::shared_ptr<vec2> sharedV(v);
```

We create the raw pointer ourselves and then give it to a smart pointer, that will get rid of it for us, that's doable.

---

Cool, we learned that when smart pointers go out of scope they destroy the object automatically, making our lifes easier when managing memory, but what about their particularities?

A [std::unique_ptr](https://www.cplusplus.com/reference/memory/unique_ptr/), as the name implies, is unique. Once a unique pointer owns that pointer, no one else can. For example, this is illegal C++.

```cpp
std::unique_ptr<vec2> v = std::make_unique<vec2>();
std::unique_ptr<vec2> thisIsIllegal = v;
```

And as the name [std::shared_ptr](https://www.cplusplus.com/reference/memory/shared_ptr/) implies, this is a shared pointer. The following is perfectly legal in C++.

```cpp
std::shared_ptr<vec2> v = std::make_shared<vec2>();
std::shared_ptr<vec2> notIllegal = v;
```

But here's a trick question: How smart are these unique pointers, do they have any control over raw pointers? What will happen here?

```cpp
vec2* position = new vec2();
std::unique_ptr<vec2> v(position);
std::unique_ptr<vec2> legalOrIllegal(position);
```

We don't get a compilation error. But we do get a crash. That's not surprising since you are destroying the same thing twice. The compiler won't magically know that a raw pointer is referenced by a smart pointer. 

The thing here is that even if you are using smart pointers you have to be a little careful. And if you are on C++14 then, by all means, use `std::make_unique<T>` or `std::make_shared<T>`

---

The difference between a shared and an unique pointer is pretty clear, but what about weak shared pointers? [std::weak_ptr](https://www.cplusplus.com/reference/memory/weak_ptr/)

From **cppreference**: *"`std::weak_ptr` is a smart pointer that holds a non-owning ("weak") reference to an object that is managed by [std::shared_ptr](https://en.cppreference.com/w/cpp/memory/shared_ptr "cpp/memory/shared ptr")"*

So a weak pointer has a reference but doesn't own the thing. What does that mean? It basically means that you can reference it, but you didn't allocate and, therefore, you can't really destroy it.

In more technical terms, all of this works by, behind the curtains, keeping track of how many references a pointer has. So a weak reference has no effect on the reference counting.

I think the right word here is *observer*, a weak pointer can observe what a shared pointer holds.

---

Fancy this example.

In a game engine, it is common to have an entity-component system, and it's common that the entity will have a reference to a component, and the component will have a reference to its owner entity.

```cpp
class entity;
class component;

class component {
public:
    std::shared_ptr<entity> ownerEntity;
    
    component() { std::cout << "component created\n"; }
    ~component() { std::cout << "component destroyed\n"; }
};

class entity {
public:
    std::shared_ptr<component> childrenComponent;
    
    entity() { std::cout << "entity created\n"; }
    ~entity() { std::cout << "entity destroyed\n"; }
};
```

Makes, sense, right?

```cpp
int main() {
    std::shared_ptr<entity> e(new entity());
    return 0;
}
```
This will gives us the messages "entity created" followed by "entity destroyed"
```cpp
int main() {
    std::shared_ptr<component> c(new component());
    return 0;
}
```
This will gives us the messages "component created" followed by "component destroyed"

Makes sense, right?

So if we do this
```cpp
int main() {
    std::shared_ptr<entity> e(new entity());
    std::shared_ptr<component> c(new component());
    
    e->childrenComponent = c;
    c->ownerEntity = e;
    return 0;
}
```

We get... "entity created" and "component created", and that's all. Nothing is being destroyed. But "Hey!", you might say, "I thought these *smart* pointers were **smart!**"

*Nothing is smart enough to contain the stupidity of us, the programmers :)*

What is happening here is that the entity is referenced by the component and the component is referenced by the entity. Whoah, **circular dependencies!** (Thanks to this [blog post here](https://iamsorush.com/posts/weak-pointer-cpp/) that helped me make a bit more sense of all this)

So when the scope of the main function is over, and we try to destroy the component, the entity is still referencing them, so we can't delete it. The same happens if we try to destroy the entity first.



The solution here is simple, one of these two pointers **has** to be a weak pointer, so we get rid of this circular dependency. And I think it makes more sense to make the pointer on the component a weak pointer.

Here's the new component class

```cpp
class component {
public:
    std::weak_ptr<entity> ownerEntity;
    
    component() { std::cout << "component created\n"; }
    ~component() { std::cout << "component destroyed\n"; }
};
```

And then, if you run the same program again, it works correctly! both entity and component are created and destroyed. Because the weak pointer doesn't *own* a reference to the entity, it is not taken in consideration when counting references.

So when the entity pointer of the main function goes out of scope, it can be destroyed, because we don't care about the reference from the weak pointer!

**Wow!** that was a big meditation.

[twitter](https://twitter.com/guilhermepo2)

[youtube](https://www.youtube.com/channel/UCOIlr-LtVmaIRdI0oe2lthg)