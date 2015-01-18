---
layout: post
title: "My iOS Integration and Deployement setup"
date: 2014-08-17 00:10
feature-img: "img/macmini.jpg"
---

I planned to write this article for a while now.

I've start using continuous integration on my iOS projects back in 2010 when it was pretty unusual to do continuous integration on an mobile project but I really learned how to use it when I was a software consultant in a services company. 

Today there is many article about how to setup you CI environment for iOS development and this post is just a quick review of my setup.

## The setup

First of all: the CI/deployement/build server. Like for a development station you need a Mac able to run the latest version of Xcode (usualy the current or previous version of Mac OS X -> as we speak Xcode 6 runs on Maverick and Yosemite).

You don't need a fully charged setup with SSD and a big processor, this Mac will run on its side, build everything automatically, and send you an alert in case something went wrong. My CI build take usually around 3 to 5 minutes. Depending on your project you may want to get some feedback quickely.

This Mac will run 24/7 unless you take care of shut it down at the end of the day and restart everything in the morning. So your old Macbook may not be the best choice... those one are not really made to run 24/7.


Speaking of software: with Xcode 5 and Mac OS X Server (starting with Maverick), Apple introduce a new tool for continuous integration and source control: Xcode server.
If you are new to continuous integration and you are using the a basic Xcode project you should definitly go for this solution.


As far as I'm concerned I use Jenkins (and before that I was using Hudson), which come from the Java community and is the reference in continuous integration for many languages. It has a great community and a lot of plugins. 
With Jenkins you can setup a realy specific configuration, you can use scripted step and more outside your Xcode project.
Jenkins has a plugin for Xcode, Clang, Testflight... but you can still use a command line step if you want to run xcodebuild with your own options...


## How to build

**Continuous integration: Building and Testing**

One of the first good thing about having a CI setup on you project is to make sure the project is building, and the tests are passing on a neutral environment.


Even if you don't do unit testing on your project (and abviously you should, even if you don't want to go for a 100% of coverage), this build will pull the source code after every commit, and make sure it build well. Basicaly, if a developer commit something without adding the file he's just created, or if he made some changes without bulding his code source, the project won't build on the CI server and the developer will be warned soon enough!


You can also add some specific tests on this job like clang analysis or norm checking... it's up to you to see how far you want to take this build, or if you want to do everything in seperate jobs (mind the number of concurent jobs...)


**Continuous delivery: Make the latest feature availables**


If you do iOS development, you probably know there is no way to push your code in production (on the App Store) several time a day like you can do in web development.

But, it doesn't mean you can't distribute an early release of your app to a targeted population. Use tool such as Testflight or Hockey App to make the enrollment and the distribution easier and teach your testers how to fallback to the App Store version if the beta is too unstable.


Than you can use many approach, depending on your app, on your project management, your release cycle... You don't want to confuse or spam your testers with too many versions


On my projects, I deploy on 2 way :

- The team build, which is a continuous build. Every time someone push some code the server build a new version of the app distributed to the technical team. Everyone can test the result of your lasts line of code from the morning during the launch break.
	
- The beta build, dedicated to the beta testers and the "extended team". Depending on the project, this build is deployed on a daily or weekly basis depending on the project. All features distributed in this build are supose to be complete. The beta is nothing without a good feedback process with your testers.


**Always releasable**


With the App Store moderation delay you are probably familiar with the question: How often should I release my app?

There is no wrong answer, everything depends on your project.

The most common anwser is probably something around 2 or 3 weeks (considering a week for the App Store process).


Fact is, it's really complicted in a real project to keep this cadence and see which feature should be in which release.


There is no real answer for that, except maybe some rigour, but the first step might be to make a distinction between the development (technicaly speaking) and the submission process of the product.

And I've got a Jenkins job for that: a simple archive build signed with an App Store configuration, and store in a Dropbox, a file sharing...


You may need to match this with a rigourous branching process: for exemple, you can assume that everything on the master branch is suppose to be finished and tested, and so this build based on the master branch can be released by anyone at almost anytime...


Just keep this build daily or something like that (matching the beta build is probably a good idea) and keep few versions available to make sure it match the project lifecycle.


## Few more tips


Continuous process is a very large topic... You have to find the right setup to match your project habbits (or make some habbits from this deployment process...).

Also you probably need to have a good branching process first to make it work.


Here is my "simple" setup and the feedback from my experience, don't take my word for it ;-)