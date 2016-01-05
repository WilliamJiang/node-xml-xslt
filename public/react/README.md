### Quick Start
```sh
  $ babel --presets react test.js -o build/test.js
  $ babel --presets react comments.js -o build/comments.js
  $ cd public/react
  $ babel --presets react webmd.js -o build/webmd.js
```

### Pre-requirements
```
$ npm install babel-cli
// or:
$ sudo npm install babel-cli -g

//and:
$ bower install

$ npm start
```
then:
<code>http://localhost:3000/comments/</code>

### Notice
* use views/react/comments.ejs to replace public/react/index.html to load from server-side.
* REST APIs: /api/react/comments for get and post.


### High Level Benefits
* Visual DOM, not real DOM, faster. (try React Bootstrap)
* Reusable UI Components, Composable Components
* Automatically reduces constant DOM
  updating by keeping a virtual DOM and only updating those parts that have changed or those that you explicitly say to update
* Produces highly reusable <code>components</code>
* Provides a "pure" javascript templating option
* Cross-platform compatible

### Not React
React is not an all inclusive MVC framework like Angular

## When To Use
* Pre-existing code base and not looking to rewrite entire front end.
* Green field dev with a focus on smaller footprint (prototyping)

### Components
* React Classes are capitalized to make the XML compatible and so it is not mistaken for an HTML tag
* React Class render method returns a SINGLE element
* Single element can contain many nested elements including other components
* Components have 3 main parts of their lifecycle: Mounting(being inserted into the DOM), Updating(being re-rendered) and Unmounting(being removed from the DOM).
  React provides hooks into these lifecycle part. <code>will</code> methods are called right before something happens, and <code>did</code> methods which are called right after something happens.

### State and Props


### Add Ons
A separate build of React with some additional 'experimental' utility features.
* Animation
* Performance Tools
* Tesging
* react addons


### Examples
* Using React, Mongo DB and Socket.IO
* React + jQuery (Backbone)
* Angular vs. React - the tie breaker

### Annoyances
* Lists must contain keys
* Requiring render to return a single element tends to lead to extra DOM elements
* I tend to forget JSX isn't HTML and thus forget to use attributes such as className.


## Reactjs + Nodejs
isomorphic javascript Benefits:
* Search engine indexability
* Easier code maintenance
* Free progressive enhancements
* Accessibility
* Better overall user experience
* Faster perceieved load times / better global UX.

### Server Side Implementation
```javascript
  require('griddle-react');
  React.createFactory(Griddle);
  React.render('index.ejs', {});
```
- react-router-mega-demo

### Client Side Implementation




### Flux
Flux is the application architecture that Facebook uses for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow. It's more of a pattern rather than a formal framework.

Flux applications have three major parts: the dispatcher, the stores, and the views (React components). These should not be confused with Model-View-Controller. Controllers do exist in a Flux application, but they are controller-views — views often found at the top of the hierarchy that retrieve data from the stores and pass this data down to their children. Additionally, action creators — dispatcher helper methods — are used to support a semantic API that describes all changes that are possible in the application.

* Open source Dispatcher
* Flux boilerplate and CLI tools
* Action -> Dispatcher -> Store -> View
*


```javascript
  var React = require('react');
  var App = require('./components/app.js');
```

### Browerify + Gulp + CommonJS


## Q & A
- Using any tool which mutates the DOM will slow down ReactJS code for sure. But most of Semantic UI is just CSS-based styling and interactivity.
- <code>Semantic UI</code> is excellent, and works very well with ReactJS.


## Reference:
* [Why is React's concept of Virtual DOM said to be more performant than dirty model checking?](http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode/21117404#21117404)
