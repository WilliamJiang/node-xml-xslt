## Quick start

```sh
// (1) get the repository
$ cd node-runtime/
$ npm install
$ bower install


// (2) Then:
$ grunt
//or:
$ npm start
//or:
$ node bin/www
```
Then go to browser:
* <code>http://localhost:3000/webmd</code>
or:
* <code>http://localhost:3000</code>
to start!


## Requirements

* This is the XML for home page [www.webmd.com](www.webmd.com):

http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80eff7b3

* Editorial Module : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5
XSL for editorial module:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony%20Carousel%20Spotlight_091e9c5e80f2fc2d.xsl

* Editorial Module 2: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb
Xsl for editorial module:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/conversations-blog_091e9c5e80f4ce8c.xsl

* Linklist Module: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908
XSL for link list:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/LinkList/Health%20Conditions_091e9c5e80f1ddd9.xsl


## Highlights

* xml to json without xslt, naturally and faster.
* Dynamically locating ‘ContentPane’ partials into html-page, easily extending and reusable..
* Multi-paritial rendering at same time.
* Use js class inheritance, façade pattern
* Interface for objects injection and integration.
* Easy to upgrade: MVC-style. Inte
* Clear structure: controllers folder for parsing and objects assembly, routes folder for rendering, views folder for ejs templates, and modules/ folder for xml-resources
* The codes follow webmd-xsd-schemas.
* Controllers can be reusable, e.g.: editorial1.xml and editorial2.xml share same controller.
* Test scripts include in test foler (jasmine for unit test)
* Server-side rendering html-page with ejs template, better performance


### Useful URL:
* localhost:3000/
* localhost:3000/webmd
* localhost:3000/webmd/linklist
* localhost:3000/webmd/editorial1
* localhost:3000/webmd/editorial2
* localhost:3000/webmd/editorial
* localhost:3000/webmd/xsl
* localhost:3000/webmd/all3
* localhost:3000/webmd/(:editorial1 | :editorial2 | :linklist)
* localhost:3000/api/newsletter/(:perf | :staging | :product)
* localhost:3000/comments
* localhost:3000/api/react/comments


### Resouces
* framework: https://github.com/petecoop/generator-express
