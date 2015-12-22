### 1. Quick start

```sh
// get the repository
$ cd nodeApp/
$ npm install
$ bower install

$ npm start
//or:
$ node bin/www
```
Then go to browser: <code>http://localhost:3000/</code> to start!


## Highlights:

(1) use nodejs stuff as server-side app environment:
Nodejs – compared to ASP.net framework.
Npm modules, such as async http-access, file-system access etc.
Express.js as web-server
Pure c-library to parse XML using XSL-transform.
Based on my understanding, this

##
There are 2 options:
1. use xsl to do the transformation: transform xml to div, which is default
1. use npm-module to parse xml to json data.

### xsl

The following are in package.json:

* libxmljs
* libxslt
* xslt4node


### xml2json

* xml2json


## 2. Requirements
### 2.1 Sources:

1. This is the XML for home page [www.webmd.com](www.webmd.com):

http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80eff7b3

1. Editorial Module : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5
XSL for editorial module:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony%20Carousel%20Spotlight_091e9c5e80f2fc2d.xsl

1. Editorial Module 2: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb
Xsl for editorial module:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/conversations-blog_091e9c5e80f4ce8c.xsl

1. Linklist Module: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908
XSL for link list:
http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/LinkList/Health%20Conditions_091e9c5e80f1ddd9.xsl


### Requirements:

1. XML as data-resources, XSL as custom translator
1. server-side rendering
1. xsl to translate xml to json objects
1. render the EJS templates with translated JSON objects


## 3. Implmentation

### 3.1 setup environment:

1. Node + Express
1. EJS HTML templates

```sh
$ npm install libxslt
$ npm install express-xml-bodyparser --save
$ npm install --save libxmljs
$ npm install request --save
$ npm install --save xml2json
```

failed to install node_xslt
```sh
$ brew install libxml2
$ brew install libxslt
$ npm install node_xslt (failed)
```
#### xslt

ftp://xmlsoft.org/libxslt

```sh
tar xf libxslt-1.1.28.tar.gz
cd libxslt-1.1.28
./configure --prefix=/usr
make
make install
```

need JDK
java version "1.8.0_65"
Java(TM) SE Runtime Environment (build 1.8.0_65-b17)
Java HotSpot(TM) 64-Bit Server VM (build 25.65-b01, mixed mode)


### Issues:

1. package.json:
can't access:
```
  "devDependencies": {
    "grunt-webmd-ingest": "git://github.iad1.webmd.com/webmd/grunt-webmd-ingest.git#0.3.1",
    "grunt-webmd-xslt-expand": "git://github.iad1.webmd.com/webmd/grunt-webmd-xslt-expand.git#0.0.2",
    "grunt-webmd-zip": "git://github.iad1.webmd.com/webmd/grunt-webmd-zip.git#0.0.3"
  }
```

### Reference

[Converting XML to HTML in NodeJS using LibXSLT](http://stackoverflow.com/questions/27494825/converting-xml-to-html-in-nodejs-using-libxsltthrows-has-no-method-apply-erro)
```javascript
var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');

var docSource = fs.readFileSync('Hello.xml', 'utf8');
var stylesheetSource = fs.readFileSync('Hello.xsl', 'utf8');

var stylesheetObj = libxmljs.parseXml(stylesheetSource);
var doc = libxmljs.parseXml(docSource);

var stylesheet = libxslt.parse(stylesheetObj);
var result = stylesheet.apply(doc);
res.end(result);
```


### XSLTJSON: Transforming XML to JSON using XSLT


/**
 * This is the XML for home page www.webmd.com : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80eff7b3

 Editorial Module : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5
 XSL for editorial module: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony%20Carousel%20Spotlight_091e9c5e80f2fc2d.xsl

 Editorial Module 2: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb
 Xsl for editorial module: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging//webmd/PageBuilder_Assets/XSL/EditorialModule/conversations-blog_091e9c5e80f4ce8c.xsl


 Linklist Module: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908
 XSL for link list: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/LinkList/Health%20Conditions_091e9c5e80f1ddd9.xsl

 */



### Used Modules

* "libxmljs": "^0.16.1",
* "libxslt": "^0.6.0",
* "xslt4node": "^0.2.1"
* "express-xml-bodyparser": "^0.2.2",



### JSX

http://img.webmd.com/dtmcms/live/
<wbmd_pb_asset_css path="/webmd/PageBuilder_Assets/CSS/EditorialModule/Harmony Carousel Spotlight/Default_091e9c5e80f2fc2e.css" object_type="wbmd_pb_css" chronic_id="091e9c5e80f2fc2e" />
<wbmd_pb_module_xsl path="/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony Carousel Spotlight_091e9c5e80f2fc2d.xsl" object_type="wbmd_pb_xsl" chronic_id="091e9c5e80f2fc2d" />
<wbmd_pb_moduledataschema path="/webmd_uk/PageBuilder_Assets/schemas/module_schemas/EditorialModule.xsd" object_type="wbmd_pb_schemas" chronic_id="091e9c5e80005117" />
<wbmd_pb_moduledataschema path="/webmd/PageBuilder_Assets/schemas/module_schemas/EditorialModule.xsd" object_type="wbmd_pb_schemas" chronic_id="091e9c5e80005117" />
<wbmd_pb_owner_page_id path="/webmd/PageBuilder_Assets/scopemaps/WebMD Consumer/Pages/Homepage 2014_091e9c5e80eff7b3/page_Homepage 2014_091e9c5e80eff7b3.xml" object_type="wbmd_pb_page" chronic_id="091e9c5e80eff7b3" />


### Performance and testing

* Benchmark.js
* loadtest - npm