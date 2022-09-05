---
layout: post
title: What if everyone handles their own persistence?
date: 2018-12-01 09:00:00 -0200
type: techblog
---

Persistence is one of those things that I never want to do and always procrastinate. Persistence is basically having data available at all times on software, to not lose your data when you turn it off, to have it back to you when you turn it on and it is really important for games.

Hell. I bet you would die if you lost your save state on any game. Those hundreds of hours on your favorite RPG game on Playstation (You have thought of a specific one, haven't you?).

## The Context

I was (actually, still am) developing a game called Pizza Clicker. It is an idle incremental game where your goal is to have as much pizza as you can, but the trick is, in order to obtain more pizza, you have to invest pizza. This leads to an endless vicious cycle of spending pizza to earn more pizza.

There are basically **two ways** of leveling up your pizza production efficiency: *incrementers* and *upgrades* - Incrementers gives you more pizza per second or more pizza per click, whereas upgrades make a specific incrementer more efficient.

As it is a game that consist of accumulating resources, needless to say that persistence is a must on this kind of game. But what needs to be persisted? Basically, *how much* of each incrementers a player have and *what* upgrades they have. I started persisting incrementers in a way and halfway through the project I changed how I did it for the upgrades. So basically I'm using different two different logics to persist! Yay! 

And that's what I'm going to talk about today.

## The Centralized Way

My first approach was having everything centralized on some kind of SaveManager. This led me to having two C# files: `SaveState.cs`, which is simply an object with every single aspect I would ever want to persist. It looks like this:

```c#
public class SaveState {
	public string playerName;
	public string lastSavedDate;
	public double currentPizzas;
	public double pizzasOnLifeTime;

	public int cursoreLevel;
	public int gennaroLevel;
	public int gasOvenLevel;
	public int eletricOvenLevel;
	public int woodOvenLevel;
	public int plasmaOvenLevel;
	public int futureOvenLevel;	
}
```

And on another file, called `SaveManager.cs`, for every variable I have another variable with a string, a persist string, and it is something like this:

```c#
...
// Pizzeria
private const string playerName = "v1_PLAYER_NAME";
private const string lastDate = "v1_LAST_DATE";

// Pizzas
private const string currentPizzas = "v1_CURRENT_PIZZAS";
private const string lifetimePizzas = "v1_LIFETIMEPIZZAS";
...
````

And finally, for me to save I can do something like this:

```c#
...
// Incrementers
PlayerPrefs.SetInt(cursoreLevel, toPersist.cursoreLevel);
PlayerPrefs.SetInt(gennaroLevel, toPersist.gennaroLevel);
PlayerPrefs.SetInt(gasOvenLevel, toPersist.gasOvenLevel);
PlayerPrefs.SetInt(eletricOvenLevel, toPersist.eletricOvenLevel);
PlayerPrefs.SetInt(woodOvenLevel, toPersist.woodOvenLevel);
PlayerPrefs.SetInt(plasmaOvenLevel, toPersist.plasmaOvenLevel);
PlayerPrefs.SetInt(futureOvenLevel, toPersist.futureOvenLevel);
...
```

So if I want to restore, I can do it like this:

```c#
...
saveState.cursoreLevel = PlayerPrefs.GetInt(cursoreLevel);
saveState.gennaroLevel = PlayerPrefs.GetInt(gennaroLevel);
saveState.gasOvenLevel = PlayerPrefs.GetInt(gasOvenLevel);
saveState.eletricOvenLevel = PlayerPrefs.GetInt(eletricOvenLevel);
saveState.woodOvenLevel = PlayerPrefs.GetInt(woodOvenLevel);
saveState.plasmaOvenLevel = PlayerPrefs.GetInt(plasmaOvenLevel);
saveState.futureOvenLevel = PlayerPrefs.GetInt(futureOvenLevel);
...
```

### What if I want to add an Incrementer?

If I ever want to add an incrementer (which **probably** will be the case in a few weeks or months), I just have to follow the following list of tasks:
1. Plan the incrementer, how much *ppc* or *pps* it will give;
2. Add it to the User Interface with the `Incrementer.cs` script, all configured;
3. Go to the `SaveState.cs` and add the new incrementer there;
4. Go to the `SaveManager.cs` and create the string variable for the new incrementer, after that I have to add the new incrementer on the `InitFirstTime()` function, and then I have to also add it on the `GetSaveState()` and on `PersistState(SaveState state)`;

Needles to say steps 3 and 4 are **very** prone to error. If I mistaken something along the way the new incrementer can break, players will be upset and it will be bad. Also, if I want to add an incrementer when the game is already on production, I have to write code to migrate the save state from one way to another (i.e. recognize there is no "NewIncrementer" saved and that is because of the new version, so I have to initialize it on the save file with a 0).

In other words, to keep working this way, I would also have to work with a `MigrateSave()` function, which at the moment looks like this:

```c#
void MigrateSave() {
	// check what version is saved and what is the current version and migrate it.
	// TO DO
	return; 
}
```

I want to keep it like this.

## What If Everyone Handle their own Stuff?

I needed to add another feature on Pizza Clicker, the *Upgrades*, which are similar to how the Incrementers work, but instead of adding to how much pizza you produce, they just improve an Incrementer's efficiency.

When I started, I was like: "Do I have to do all of that again? Create a variable for every upgrade and persist every one of them and migrate and..." - At some point I thought of doing the persistence on each individual Upgrade.

When I buy an upgrade, it immediately saves its value as 1. When Initializing the game it checks its own persistenceString and check whether or not it was bought. Looks better, right?

To save, I have to create just one more variable on `Upgrade.cs`, a string which will be used to persist.

```c#
[Header("Persistance Settings")]
public string persistString;
```

And then when initializing the game I can just check like this:

```c#
if(persistString != null && persistString != "") {
	if(PlayerPrefs.GetInt(persistString) == 1) {
		Apply();
	}
}
```

What is `Apply()`? You may ask.

```c#
public void Apply() {
	if(!m_wasBought) {
		incrementerToImprove.pizzaPerClick *= (1 + pizzaPerClickImprovement);
		incrementerToImprove.pizzaPerSecond *= (1 + pizzaPerSecondImprovement);
		PlayerPrefs.SetInt(persistString, 1);
		m_wasBought = true;
		Pizzeria.instance.RecalculatePPCPPS();
	}
}
```

To summarize it quickly, the `Apply()` function is called when the incrementer is bought or when the game is initialized and the persistString exists on the save file.

### What if I want to add an Upgrade?

I **will** want to add more upgrades as time goes by. To do that I can simply follow this list of tasks:

1. Plan the upgrade, which incrementer will it affect and how much;
2. Add it to the User Interface with the `Upgrade.cs` script, all configured;
3. Set the `persistString` attribute to something unique.

There is just one point where I can make a mistake here and it is on **Step 3**, I can simply forget to set the string, which is easily caught on testing. Having only one possible error is way better than 3 or 4.

Aaand this is the story of the persistence of [Pizza Clicker (download it here!)](http://fourthdimension.studio/pizzaclicker/) - I know it's nothing innovative or whatever, but it was something that happened to me and I wanted to write my thoughts on it.

Hope it helps someone somewhere!

You can get in contact with me whenever you want if you have any questions, all my social media and email are on my [personal website](http://gueepo.me)