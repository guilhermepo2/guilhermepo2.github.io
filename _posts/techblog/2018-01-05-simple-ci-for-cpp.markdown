---
layout: post
title:  Setting Up Circle CI on GitHub for C++ and CMake
date:   2018-01-10 10:37:20 -0200
image:  '/images/techblog/mistake.jpg'
tags:   [c++, cmake, ci]
type: techblog
---

It’s been 3 months or more since I started my internship on automated testing. I studied and learned about docker, testing libraries, automated testing (of course), continuous development and, finally, continuous integration. Knowing about all of this made me a programmer twice as better than I was. This is a lot of improvement for 3 months and some days. So I started picking interest in testing related tasks also on personal projects and on my most recent one I decided to set up a CI environment on GitHub.

I had a bit of trouble configuring it at first and I couldn't find a lot of help from the internet, I had to pick some things here and there but there wasn't an unique resource about what I wanted to do. Well, now there is since I decided to write about it.

## What is Continuous Integration ? (CI)

Keeping it simple, it is building a pipeline that will be executed in every commit at your most updated branch on git, this pipeline builds (usually using a container) the whole environment needed for the tests and execute all the tests you've coded. If all tests pass, you are happy and the changes were successful. In a real life scenario, you can ship your software after this step. If any test fail, you can fix it as soon as possible, this is better than finding out about bugs when you wrote 1000 lines of extra code relying on that buggy function.

There is also a Management side to it. Software Engineering used to be all about interviewing your client and then developing the software apart from your client, doesn't take much to know that everything went wrong on this model. Nowadays we use Agile methodologies (i.e. Scrum) and try to deliver to the client as fast as we can.

As deliveries are fast, so is development, commits and everything else basically. So you **need** a way to verify that every new feature won't break what is already there. Imagine your client is happy with two pieces of your product, you give to them the third piece but it breaks the other two, not good.

If you have good and automated software testing covering an important part of your product, you are less likely to deploy something broken to your client, which is nice.

![No More Rubber Duck Debugging!]({{site.baseurl}}/images/techblog/debugging-finn.jpg)

*No More Rubber Duck Debugging! Or... Plastic Finn Debugging, anyway... You got it.*

## What are we going to do?

Basically setting up a really simple project with C++ and CMake, write tests for it and then use Circle CI to test it at every update.

1. **The C++ Code:** I will use a simple class I'm using in a current project, the *Point* class, it has two attributes, x and y, and some methods to manipulate them, that's all.
2. CMake File.
3. Writing Tests for the Point Function (using Catch).
4. Building and Running Locally the Tests.
5. Setting Up Circle CI.


## Doing it.

This is by no means a C++, CMake, Unit Testing or Catch sort of tutorial, I'm assuming that you know them or have at least some familiarity to understand the code below. Anyway, the code should be pretty straightforward for anyone with some programming background.  The code is publicly available [here](https://github.com/guilhermepo2/cpp-cmake-circle-ci).

### The C++ Code
#### point.hpp
```c++
#ifndef __POINT__
#define __POINT__

class Point {
private:
    int x;
    int y;
public:
    Point() { this->x = 0; this->y=0; }
    const inline int getX() { return this->x; }
    const inline int getY() { return this->y; }
    inline void setX(int x) { this->x = x; }
    inline void setY(int y) { this->y = y; }
};

#endif
```


### CMake File


```c++
cmake_minimum_required(VERSION 2.8)
set(CMAKE_CXX_STANDARD 11)
project(cpp-cmake-circle-ci)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)
add_executable(point_test ${PROJECT_SOURCE_DIR}/src/pointTest.cpp)
```

### Writing Tests for the Point Function

For testing in C++, I like the [Catch2](https://github.com/catchorg/Catch2) library.

#### pointTest.cpp

```c++
#define CATCH_CONFIG_MAIN
#include "libs/catch.hpp"
#include "point.hpp"

TEST_CASE("Creating a Point", "[point]") {
    Point p;

    REQUIRE(p.getX() == 0);
    REQUIRE(p.getY() == 0);
}

TEST_CASE("Creating and Setting Values to a Point", "[point]") {
    Point p;
    p.setX(2);
    p.setY(3);

    REQUIRE(p.getX() == 2);
    REQUIRE(p.getY() == 3);
}
```

### Building using CMake and executing the tests.

![It works!!]({{site.baseurl}}/images/techblog/point-test.png)

Yay! Now we have a point class and we have succesfully tested it, we can now peacefully create points whenever we want and we will trust the code works because the test said it does, now let's set up the CI environment!.

### Setting UP the CI Environment

The Continuous Integration environment I'm going to use is [Circle CI](https://circleci.com). I encourage you to visit their website and skim through what it does and on the documentation.

When you are ready, Sign Up. It is easier to use your GitHub account, but do what you like the most. Go to your [GitHub](https://github.com) page and visit the [Marketplace](https://github.com/marketplace), you will find *Circle CI* under the Continuous Integration category or you can just search for it. If you want the direct link [here it is](https://github.com/marketplace/circleci). "Buy" it (it's not buying since it's free, although it has paid options).

Now on CircleCI, Log In if you haven't already, you should be seeing your Dashboard. Link it with GitHub, if you haven't already, to have access to your repositories. Add a *New Project* on the *Projects* session and choose your desired Repository, click on Setup Project. Image Below for better understanding.

![Project on Circle CI]({{site.baseurl}}/images/techblog/project-on-circle-ci.png)

You will read the following:

> CircleCI helps you ship better code, faster. To kick things off, you'll need to add a config.yml file to your project, and start building. After that, we'll start a new build for you each time someone pushes a new commit.

It comes pretty much all set for you, we usually want to use Linux Operating System and the version 2.0. 

Now we have to do as Circle CI says:

> Create a folder named .circleci and add a file config.yml (so that the filepath be in .circleci/config.yml).

Unfortunately, there isn't a sample `config.yml` file for our project settings, so I will guide you through it. If you aren't very familiar with .yml files, I suggest that you [read more](http://yaml.org) about it. Also, if you aren't very familiar with docker or containers, I suggest you [to be](https://www.docker.com). *Please, consider learning more about Docker. As you can read on docker's main page: Build, Ship, and Run Any App, Anywhere - Pretty powerful, eh?*

#### The config.yml file

For testing in the Circle CI, a docker container is used, we are going to use the image *debian:stretch*, which is a simple Linux Image with few functionalities, so we are going to need to install what we are effectively going to use: **sudo**, **gcc and g++** and, finally, **cmake**.

Every .yml file begins with the current version, which for this case is `version 2`.

We need to define our **jobs**, a job is a task executed on the continuous integration environment. We will call our job *build* and, for this simple  scenario, we are going to do everything in this job. The build job needs to have a defined docker image and its steps are:

1. Installing SUDO
2. Installing GCC and G++
3. Installing CMAKE
4. Creating the Build Files
5. Building the Project
6. Executing the point test

**obs:** it is common to execute unit tests on the build routine, it is common to not do it. Your project, your resources, your decision.

**obs2:** *.yml* files are determined by 2-space indentation, so be careful when writing your own.

The first thing to do on a *.yml* file is to declare we have a *job*, in this case we are going to have only one job. A job requires its, well, job. Which in this case is the *build* job.

```
version: 2

jobs:
  build:
```
*Be careful on the identation!!!*

The build job requires two things: (i) a *docker* image, and (ii) its *steps*, where the magic effectively will happen.

A good docker image on this is the image *"debian:stretch"* and down here is an example with the step to install SUDO.

```
version: 2

jobs:
  build:
    docker:
      - image: "debian:stretch"
    steps:
      - checkout
      - run:
          name: Installing SUDO
          command: 'apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*'
```

I could waste your time and my time here writing about each step, but I'm just going to show you the final config.yml file to build everything needed for running a C++ Project with CMAKE and run its Unit Tests.

There's not much secret to it, it's all about writin the right *.yml* config.

#### The final config.yml file:
```
version: 2

jobs:
  build:
    docker:
      - image: "debian:stretch"
    steps:
      - checkout
      - run:
          name: Installing SUDO
          command: 'apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*'
      - run:
          name: Installing GCC
          command: 'apt-get update && apt-get install -y gcc g++'
      - run:
          name: Install CMAKE
          command: 'apt-get update && sudo apt-get install -y cmake'
      - run:
          name: Creating Build Files
          command: 'cmake -H. -Bbuild'
      - run:
          name: Creating Binary Files
          command: 'cmake --build build'
      - run:
          name: Point Unit Testing
          command: './bin/point_test'
```

Everything is finally set up. Commit and Push the *config.yml* file and let's do some minor changes on our project to see if it really works.

It's obvious that I got a bit lost while writing the final of this article as explaining how to config with a .yml is something a bit... I don't know. So any thing you would to ask about it just reach me on twitter or email or anywhere else.

