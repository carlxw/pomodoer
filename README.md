# pomodoro-website
[Link To Website](https://carlxw.github.io/pomodoro-website/)

## What Is It?
This is a personal project that aims to bolster productivity. The idea is to create a space where the user does not feel the need to switch applications while studying (i.e., switching between timer app to start pomodoroing, opening music app to change playlists, and opening their todo lists). When one tabs out, the likelihood of one becoming distracted and slacking off increases significantly, hence the creation of this website.

## Features Of This Project
* ReactJS frontend linked with NodeJs express backend
* Functional timer with noise notification on timer complete
* Spotify music player controller capable of play/pausing, track control, and volume control
* `config.json` for easy maintenance 
* Random wallpapers when a user is logged into Spotify (I do not own these wallpapers used)

## Things I Learned While Making This Project
* Connecting a frontend and a backend is harder than it seems 
* How to use request, fetch(), and axios to achieve POST and GET requests
* Proxying during development and deployment
* Using `normalize.css` is a great way to start the styling process
* `dotenv` is a great way for storing tokens and sensitive data
* Reading APIs is a skill and is harder than it looks
* `display: flex` is great for responsive design
* Don't use outdated or deprecated packages

## Future Ideas
* Further enhance webpage responsiveness with media queries so that user can modify viewport sizes, aka do better with CSSing
* Use an alternative of `localStorage` to save a user's tasks so that they can come back to it next time
* Allow user to configure the webpage (i.e., timer durations, custom backgrounds, etc.)
* Implement subtasks into the list
* Design a focus mode; i.e., close all tabs to prevent a user from being distracted