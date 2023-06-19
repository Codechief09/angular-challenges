<h1>Mastering Change Detection cycle with a scroll example</h1>

> Author: Thomas Laforge

### Information

In this challenge, you will need to optimize the change detection cycles run by Angular.

Zone.js triggers a change detection cycle each time a scroll event is dispatched. However we only want to show or hide a button at a specific scroll position. Therefore, we only want to refresh our application once.

> You can vizualise how many times CD is triggered by installing the [Angular chrome devTool](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) and starting a new recording on the profiler tab.

The following video will explain what is the goal of this challenge.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

### Statement

Your goal for this challenge is to avoid all unnecessary change detection cycles and trigger a CD only when needed.

#### Constraint:

You cannot opt-out of zone.js. If this code is part of a large project and you opt out of zone.js, you will break many things within your application.

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. **nx serve scroll-cd**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:12** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A12+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="Mastering Change Detection cycle with a scroll example"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A{challenge number}+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="Mastering Change Detection cycle with a scroll example solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="Mastering Change Detection cycle with a scroll example, blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
