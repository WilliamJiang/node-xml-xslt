### Quick Start
```sh
  $ babel --presets react test.js -o build/test.js
  $ babel --presets react comments.js -o build/comments.js
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
