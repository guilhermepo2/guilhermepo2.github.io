---
layout: post
title:  Coding a simple State Machine
date:   2019-07-03 09:00:00 -0200
image:  '/images/techblog/stateMachineWorkflow.png'
tags:   [game-development]
type: techblog
---

This blog post is my simple take on State Machines and how I usually use them in my projects, specially in games made in Unity. The image on the header is from another article on the same subject that I consider to be more complete and better explained, I highly recommend you to read the article: [State Pattern](https://gameprogrammingpatterns.com/state.html) - If you still want to read my take and how I approach it, keep reading!

Have you ever heard of State Machines? It is one of those weird cryptical words that appears in Computer Science, Computer Programming, Game Programming and a lot places really! When you try to research it you probably will find out about plenty of mathematical concepts, but none of those conjunct notation or math theory and hypothesis stuff will answer your basic question: "How do I create a state machine in my code?"

In the long run, State Machines are really benefical for your code, have you ever stumbled upon a problem where you got yourself creating multiple booleans to keep track of what was happening? And you had to debug all those values and code that shouldn't be executed is executing and the biggest problem is that you can't guarantee stability in your code, you just know that pieces of code shouldn't be running and even though the result might work, you feel deep down that it is something built on a weak foundation.

This is a post mainly about Game Programming, because hey, that's my job. But State Machines are theoretical models, so maybe you can find something useful here if you are a mathematician, computer scientist, a programmer which is not a game programmer or just interested in the topic. If you have a science background, you might get mad of my oversimplification later on though, but that's how we do things. *shrug*

## But what is a State Machine?

### The Mathematical Model

According to Wikipedia, a State Machine, also known as Finite-State Machine (FSM) or Finite Automaton is "a mathematical model of computation, an abstract machine that can be in exactly one of a finite number of states at any given time, it changes from one state to another in response to some external inputs, this is called a state transition".

Yikes!

A Finite-State Machine is mathematically defined as a list of states, an initial state and a set of rules or conditions for EVERY transition (keep this in mind because it will be important).

That's some mathemtical lingo right there, Finite-State Machines are, putting it more straightforward, a mathematical model designed to compute things, a state machine is also known as an automata, and you may have heard of a famous automata called the *Turing Machine*. The Turing Machine is another model of computation that claims to be able to solve any problem that can be described as a recursively enumerable language. That's cool and stuff, in practice a Turing Machine is a Finite-State machine with infinite memory and the ability to go back and forth on the memory. It is also known as "your computer" (not really, but close enough).

### The Simplified Version

Although Finite-State Machines and Automatas are something complex enough for you to have a whole semester dedicated to them, its essence, and what really matters to incorporating one in our code, can be simplified into a couple paragraphs.

A Finite-State Machine is a list of states, an initial state and the rules for transitions between states. That's pretty much it.

Its purpose is to isolate pieces of code from one another, for example, in a simple platformer game, you want to have separate code for when the player is grounded and when the player is on air, these are your states: "Player Grounded" and "Player on Air", the initial state is Grounded and the rules are:
- Grounded -> Jumping: If the player pressed to jump.
- Jumping -> Grounded: If the player touches the ground.

It is easy to see how the state machine helps us in this context too, if you don't have it, you have to check if the player is grounded to jump, otherwise the player could keep jumping on air. Although this is a very simple sitation and you could solve that with creating a simple `isGrounded` variable, you have to recognize that (1) creating this variable **IS** a form of creating a very simple state machine and (2) this is a VERY simple problem, try adding wall slide on your game, wall jump, dialogue breaks, cutscenes and watch your player controller script fall apart with bugs and bad performance if you haven't planned well. Believe me, I've been there way too many times.

State Machines are good for isolating code, but not only that, they can scale, they make it easier to add new features on your script without breaking everything else, which really is what matters on long term projects.

## How to Code One?

Let's recapitulate what we actually need for having a state machine.

1. We have to define a list of states
2. We have to define an initial state
3. We have to define transitions between states.

### Defining the States

I, personally, like to do that using `enums` and I honestly believe this is the best way to go, you can use `enum` for your states and process then with a current state variable and a switch-case structure. For this example I'm going to pretend I am programming a 2D platformer with wall jump and that the jump from the wall is different from the regular jump, so these would be my states:

```c#
public enum EPlayerState {
    Grounded,
    Jumping,
    OnWall,
    JumpingFromWall
}
```

We have our states, but we also need to keep track of our current state, this can be done with a simple variable.

```c#
private EPlayerState m_currentPlayerState;
```

### Defining an Initial State

This one is the easiest, the player will start grounded, so it should start on the grounded state, you can do that when declaring the variable or just setting it on the Start function.

```c#
void Start() {
    m_currentPlayerState = EPlayerState.Grounded;
}
```

### Defining the transtions

This is where it gets tricky, you need to handle every state individually and make sure that each state has a condition that will lead to another state, avoiding termination problems. To handle the states, I usually have a switch-case structure on my `Update()` method that would look like this:

```c#
switch(m_currentPlayerState) {
    case EPlayerState.Grounded:
        GroundedState();
        break;
    case EPlayerState.Jumping:
        JumpingState();
        break;
    case EPlayerState.OnWall:
        OnWallState();
        break;
    case EPlayerState.JumpingFromWall:
        JumpingFromWallState();
        break;
}
```

Every state now has their own specific function, nothing is stopping you from putting everything just there on the switch-case, it is just a matter of organization. All you have to do now is create each function to handle the specifics of each state and transition to other states!

Grounded State:

```c#
private void GroundedState() {
    // grounded specifics
    if(playerJump) {
        // jump...

        m_currentPlayerState = EPlayerState.Jumping;
    }
}
```

Jumping State:

```c#
private void JumpingState() {
    // jumping specifics...

    if(isGrounded) {
        m_currentPlayerState = EPlayerState.Grounded;
    } else if(collidingWithWalls && playerJump) {
        m_currentPlayerState = EPlayerState.JumpingFromWall;
    } else if(collidingWithWalls) {
        m_currentPlayerState = EPlayerState.OnWall;
    }
}
```

On Wall State:

```c#
private void OnWallState() {
    // on wall specifics...

    if(playerJump) {
        m_currentPlayerState = EPlayerState.JumpingFromWall;
    } else if(isGrounded) {
        m_currentPlayerState = EPlayerState.Grounded;
    }
}
```

Jumping From Wall State:

```c#
private void JumpingFromWallState() {
    // jumping from wall specifics... 

    if(isGrounded) {
        m_currentPlayerState = EPlayerState.Grounded;
    }
}
```

## Sample Code 

This is the entirety of a simple state machine code I've written as a base for this post:

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SampleStateMachine : MonoBehaviour {

    // using enum to name our states
    public enum EPlayerState {
        Grounded,
        Jumping,
        OnWall,
        JumpingFromWall,
    }

    private EPlayerState m_currentPlayerState;

    // random variables to keep the code readable lol
    private bool playerJump;
    private bool isGrounded;
    private bool collidingWithWalls;

    void Start() {
        m_currentPlayerState = EPlayerState.Grounded;
    }

    void Update() {

        // common code for all states goes here...

        // handling the current state
        switch(m_currentPlayerState) {
            case EPlayerState.Grounded:
                GroundedState();
                break;
            case EPlayerState.Jumping:
                JumpingState();
                break;
            case EPlayerState.OnWall:
                OnWallState();
                break;
            case EPlayerState.JumpingFromWall:
                JumpingFromWallState();
                break;
        }

        // mess with x velocity
        // do stuff with y velocity
        // player.Move();
    }

    // Functions for each state
    // each state handles its own specific things and transitioning to other states
    private void GroundedState() {
        // grounded specifics...

        if(playerJump) {
            m_currentPlayerState = EPlayerState.Jumping;
        }
    }

    private void JumpingState() {
        // jumping specifics...

        if(isGrounded) {
            m_currentPlayerState = EPlayerState.Grounded;
        } else if(collidingWithWalls && playerJump) {
            m_currentPlayerState = EPlayerState.JumpingFromWall;
        } else if(collidingWithWalls) {
            m_currentPlayerState = EPlayerState.OnWall;
        }
    }

    private void OnWallState() {
        // on wall specifics...

        if(playerJump) {
            m_currentPlayerState = EPlayerState.JumpingFromWall;
        } else if(isGrounded) {
            m_currentPlayerState = EPlayerState.Grounded;
        }
    }

    private void JumpingFromWallState() {
        // jumping from wall specifics... 

        if(isGrounded) {
            m_currentPlayerState = EPlayerState.Grounded;
        }
    }
}
```

So that was me trying to explain Finite State Machines! I've tried to give some mathematical insight, some simplified explanation and go on about how I pesonally use them in my daily stuff as a game programmer

If you are feeling venturous enough, you can reach me on [Twitter](http://twitter.com/guilhermepo2) or check my own game studio, [Fourth Dimension](https://fourthdimension.studio).
