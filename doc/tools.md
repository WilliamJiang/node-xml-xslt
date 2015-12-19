### jshint
syntax checker

### Jasmine
async BDD framework (Behaviour Driven Development)

I've started using Jasmine for my JavaScript testing specifically because it's small and runs in both the browser and node. It's also got a really solid reporting and matcher API so it's easy to integrate with other tools in the future. Having a buildin mocking framework is also useful since it's often one of the first things I would add when I was using qunit for TDD in the browser.


### The Essential Toolkit
With that out of the way, lets introduce the essential Node testing kit. As you may remember, The Node Way values smaller, swappable, single-purpose tools over large do-everything-under-the-sun testing frameworks. In that spirit, the essential toolkit is a collection of smaller tools that each do one thing exceptionally well. They are:

A Testing Framework (Mocha, Vows, Intern)
An Assertion Library (Chai, Assert)
Stubs (Sinon)
Module Control (Mockery, Rewire)

### Testing Framework
Usually, when it comes to choosing a type of framework, there are a few options. Mocha is one of the more robust and widely used. However, the following alternatives to Mocha are worth considering:

* NodeUnit (http://pivotal.github.com/jasmine)
* Jasmine (http://pivotal.github.com/jasmine)
* Vows (http://vowsjs.org)