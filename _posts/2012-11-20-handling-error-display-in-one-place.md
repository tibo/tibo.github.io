---
layout: post
title: Handling error display in one place.
---
I recently had to work on an existing app for the group who own my company.

This project was first made by a service company and since it used one of
these custom home made framework I had to rewrite it from scratch (doesn't
mean I enjoy writing this app but at least I was able to make it my way).

One of the first thing I had to deal with the original app is about error
display.

For instance, the app was registered for push notifications and it had to send
the push token to the server. Problem is, the server was made to work with a
device UDID as unique identifier (pre iOS 5) and since Apple change it's way
to create an unique identifier, the server was not able to handle a same push
token for two devices and so the server reply with a "SQL primary key
violation" error which was display to the user as a "from the server error"…

You can imagine what it mean to your end user to see such kind of error at
every launch: I had to find which part of the code was guilty to display this
error. So I when to the basics… looking for an occurrence of
"UIAlertViewController" in the whole project, to find which one is displaying
error from the server response.

Since I have to rewrite the whole application from scratch, and handle error
from the server in some case (obviously not this one) I try to find the best
way to handle and display error in one and only place in the whole
application. This is how I made it:

First I create a parent view controller which inherit from UIViewController
and from which every view controller of my project will inherit.

This ViewController has a methode named "handleError:" which take an NSError
(or if you prefere a custom class of error) as parameter.

In this method, the ViewController may display the error in the console or
write it in a log file. Than it handle the specific error case like a "network
error" based on error code or type, and display the localized error to the
user. And finally if the error isn't handle in the application, this is the
perfect place to raise and display a generic error which says "something went
wrong".

{% gist 4115246 ParentViewController.m %}

Then the second thing is to inherit each one of you application ViewController
from this generic ViewController.

Than, in each ViewController, everywhere there is an error to handle (delegate
methods, failure blocks, parsing error…) you just have to forward it to [self
handleError:myError].

And finaly you can overwrite this handleError method to manage specifics error
like login error if you are on a login screen…

{% gist 4115246 LoginViewController.m %}

My 2 cents coding style… hope it's help
