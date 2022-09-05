---
layout: post
title: Even better Screenshake in Unity!
date: 2019-04-07 09:00:00 -0200
type: techblog
---

Some months ago I wrote about doing Screenshake in Unity, and now I'm writing about an even better way to make Screenshake in Unity! I will just repeat the beggining of the other post here now.

First things first, if you don't know what is the **JUICE**, I feel sorry for you. There is a moment, in every game developer's life, where they get to meet the **JUICE**. It is, for sure, a life changing moment. That being said, if you don't know what is the **JUICE** you probably have already thought: "My game is bad and I don't know why" or "My game has a fun mechanic but is bad, why?" - The answer to all your thoughts and problems probably are: **THE JUICE**!. 

Watch [Juice it or Lose It](https://www.youtube.com/watch?v=Fy0aCDmgnxg) and [The Art of Screenshake](https://www.youtube.com/watch?v=AJdEqssNZ-U) and watch your games improve in 100% just by watching a couple lectures!

A new addition to these lectures is [Math for Game Programmers: Juicing your Camera with Math](https://www.youtube.com/watch?v=tu-Qe66AvtY) - which is a veeery nice talk!

## Cool! What do I need?

After months of iterating to achieve the **optimal screenshake** I reached the following formula: have a GameObject to hold _two cameras_, yes, two cameras. We don't want to shake the same camera we use to follow our player or show game events.

Why not? You might ask! Well, we would need to write extra code to make sure the camera would effectively return to its intended position, and it's not always trivial and very error-prone, so having a second camera to mirror the intended position and add the shake to it is a better approach in my opinion.

**PS1:** I'm joking about it being the _optimal screenshake_ - it probably has lots of room for improvement and feel free to reach me if you have a tip for it!
**PS2:** [You can find the code I use here](https://github.com/fourthdimensionstudio/UnityScripts/blob/master/Utilities/MonoBehaviors/CameraHolder.cs).

## Let's talk code!

**Variables**

```c#
public enum EShakeStyle {
    Horizontal,
    Vertical,
    Angular,
    Directional,
    All
}
```

First thing is that I use this enum so I can have control over what kind of shake I want, the names pretty much say by themselves. Horizontal and Vertical shake only on one axis and Angular messes with the camera rotation. Directional messes with _both_ axis and All messes with **everything!**

```c#
// The Main Camera, the one who won't shake (probably the one following the player, has its own Script)
public Camera mainCamera;

// Shake Camera, the reason this is a different camera is because we don't want to mess with the real camera position, so we won't have to do extra code to make sure the camera return to its original position.
public Camera screenshakeCamera;
```

Following that, I have the reference to the main camera and the screen shake camera, I like having them as public variables so I can just drag and drop on the Editor.

```c#
// For Angular Screenshake
private const float maxAngle = .5f;
// For Directional Screenshake
private const float maxOffset = .5f;

private float m_cameraTrauma;
private EShakeStyle m_shakeStyle;
private Coroutine shakeRoutine;
```

Here is where things get interesting, we have the variables to limit how much our rotational and directional shake can be and some control variables!

**The Entry Point!**

```c#
public void AddTraumaToCamera(float amount, EShakeStyle style) {
    SetShakeStyle(style);
    AddTraumaToCamera(amount);
}
```

The entry point is just adding trauma to the camera, I don't like using a "Begin Screenshake" functionality, I'm a simple man, if trauma bigger than 0, we shake, if not, we not shake.

`SetShakeStyle(EShakeStyle shakeStyle)` is a very simple function that will just attribute whatever shakeStyle was passed to the current shakeStyle.

On the other hand, `AddTraumaToCamera(float amount)` has some interesting things happening.

```c#
public void AddTraumaToCamera(float amount) {
    if(m_cameraTrauma <= 0) {
        screenshakeCamera.transform.position = mainCamera.transform.position;
        screenshakeCamera.enabled = true;
        mainCamera.enabled = false;
        m_cameraTrauma = amount;
    } else {
        m_cameraTrauma += amount;
    }

    if(shakeRoutine == null) {
        shakeRoutine = StartCoroutine(ShakeRoutine());
    }
}
```

We either set the trauma or add to it, according to the camera's previous state. **Attention!** We only initialize the ShakeRoutine if we are not currently executing it! If the screen is already shaking everything will work correctly by just adding to the trauma!

An important part is where I **deactivate** the main camera and **activate** the screenshake camera, this guarantees that the screenshake camera is the one doing the rendering.

And then we finally get to our glorious `ShakeRoutine()`!

```c#
private IEnumerator ShakeRoutine() {
    while(m_cameraTrauma > 0) {
        m_cameraTrauma -= Time.deltaTime;
        screenshakeCamera.transform.position = mainCamera.transform.position;
        
        float angle = maxAngle * (m_cameraTrauma * m_cameraTrauma) * Random.Range(-1f, 1f);
        float offsetX = maxOffset * (m_cameraTrauma * m_cameraTrauma) * Random.Range(-1f, 1f);
        float offsetY = maxOffset * (m_cameraTrauma * m_cameraTrauma) * Random.Range(-1f, 1f);

        ShakeWithStyle(new Vector2(offsetX, offsetY), angle);
        yield return null;
    }

    screenshakeCamera.enabled = false;
    mainCamera.enabled = true;
    shakeRoutine = null;
}
```

**This**, my friends, is where the real magic happens. I got some good insights from the Math for Game Programmers talk about camera, we have the trauma decaying linearly with `Time.deltaTime` and our shake is actually quadratic according to `m_cameraTrauma`.

Another important thing is that before calculating any variable, we set the screenshakeCamera position to the same as mainCamera position. Even with the mainCamera disabled its script is working so the shakeCamera always gets the most updated position of the camera!

What is happening here is that values for the angle and offset to be added to the camera are being calculated, and it is a very simple math: `(m_cameraTrauma * m_cameraTrauma) * Random.Range(-1f, 1f)` - this will gives us any value anywhere in between `[-m_cameraTrauma ^2, m_cameraTrauma ^2]`.

Did you realize how beautiful this is? More trauma, more shake! More trauma, more time shaking!

The `m_cameraTrauma * m_cameraTrauma` part of the equation is important because it creates a more smooth shake, reducing the risks of motion sickness and achieving a better feel overall!

But you might be asking yourself, what about `ShakeWithStyle(Vector2 offset, float angle)`?

This function only executes a switch case on the current shake style and calls `ShakeDirectional(Vector2 offset)` and `ShakeRotational(float angle)` if needed. Here are these two functions:

```c#
private void ShakeDirectional(Vector2 offset) {
    Vector3 t_position = screenshakeCamera.transform.position;
    t_position.x += offset.x;
    t_position.y += offset.y;
    screenshakeCamera.transform.position = t_position;
}

private void ShakeRotational(float offset) {
    Vector3 t_rotation = screenshakeCamera.transform.localEulerAngles;
    t_rotation.z += offset;
    screenshakeCamera.transform.localEulerAngles = t_rotation;
}
```

We just add to our Screenshake Camera, all the magic is performed on the Shake Routine. Always remember you can see the whole code [here!](https://github.com/fourthdimensionstudio/UnityScripts/blob/master/Utilities/MonoBehaviors/CameraHolder.cs)

And this is how I'm currently doing Screenshake in Unity!

I know these kind of posts might not be the most interesting since I'm mainly walking you through a piece of code, but I think it is really important to share these tips with everyone! So I'm trying.

Have a good day and always remember the **JUICE!**

If you are feeling venturous enough, you can follow me on [Twitter](http://twitter.com/guilhermepo2) or check my own game studio, [Fourth Dimension](https://fourthdimension.studio).
