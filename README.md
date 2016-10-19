[![Travis](https://img.shields.io/travis/augusto-altman/AlbanilJS.svg?style=flat-square)](https://travis-ci.org/augusto-altman/AlbanilJS)
[![npm](https://img.shields.io/npm/v/albaniljs.svg?style=flat-square)](https://www.npmjs.com/package/albaniljs)
[![npm](https://img.shields.io/npm/dt/albaniljs.svg?maxAge=2592000)](https://www.npmjs.com/package/albaniljs)
[![npm](https://img.shields.io/npm/l/albaniljs.svg?style=flat-square)](https://www.npmjs.com/package/albaniljs)
[![David](https://img.shields.io/david/augusto-altman/AlbanilJS.svg?style=flat-square)](https://www.npmjs.com/package/albaniljs)

AlbanilJS
=========

![alt tag](https://raw.githubusercontent.com/augusto-altman/AlbanilJS/master/albanilJS-01.png)

AlbanilJS takes the idea of file concatenation to another level, providing developers with a great tool for generating their js bundles. We say that it's more than a smart concatenator, it's a javascript builder. With AlbanilJS you can modularize your javscript projects using the [RequireJS's syntax](http://requirejs.org/) and then use those modules to build a standalone vendor-free javascript file (RequireJS independant!).

From a high level point of view it works as a concatenator. It takes the code of several javascripts files and creates a js bundle with all the chunks concateneted in some order. What is special about AlbanilJS is that you have to use RequireJS modules as concatenation sources instead of using regular plain javascript files. This allows you to explicitly specify dependencies beteween the code chunks you want to concatenate. And there is where the power of AlbanilJs relies, providing [awesome advatages](#awesome-advantges) for you ;). The RequireJS syntax enables AlbanilJS to deal with your code chunks' dependencies at building time. So, for example, if you want to include an specific module on a build, you don't have to worry to include also the other modules of which the first one depends on. This is all resolved automagically! AlbanilJS will use the dependencies that you've delcared (thanks to the RequireJS modules' syntax) and will write each code chunk below the code chunks of which it depends on. So, the javascript intepreter will always read the concatened code in the correct order.

At the end you will get a clean javascript bundle, and when we say a clean, we really mean clean!. AlbanilJS will not add any vendor dependency to your code, your code will work as is (it won't need RequireJS to work). This happens because **AlbanilJS will only take your code on each module and will ignore all the _RequireJS syntactic ritual_**.

As it´s commonly said, a picture is worth a thousand words. Below there is a small banner that summarize the AlbanilJS awesomness:

![alt tag](https://raw.githubusercontent.com/augusto-altman/AlbanilJS/master/doc/banner.png)

After using AlbanilJS there is no reason to use a plain file concatenator again!

Awesome advantges
-------------

1. AlbanilJS allows you to modularize your code just as you would do with RequireJS. The special thing is that you can build a standalone javascript bundle from those RequireJS modules. Therefore, you will obtain a single js file which **doesn't need RequireJS to work**.

2. With AlbanilJS you can make custom builds. For each build you can select the modules you want to include. AlbanilJS will create a final bundle with only the specified code chunks and its dependecies.

3. You don't have to worry anymore to manually include all the code chunks' dependecies and the order in which you have to place them. That is all resolved automagically by AlbanilJS.

4. You can still use the RequireJS modules as RequireJS modules :P, by loading them directly using AMD. But don't forget, with AlbanilJS you have also the choise to build a standalone plain bundle which doesn't needs RequireJS to work.

5. You can easily test each chunk fo code separately by loading them using AMD.

How to install it?
-------------

It is avaible in [npm](https://www.npmjs.org/package/albaniljs)

```shell
$ npm install -g albaniljs
```

Usage from the command line
-------------

It is very easy to use. A typical setup will involve adding only one file to your project: _albanil.config.js_. As you can see it's valid javascript file so it's completely programable, but it has another important responsibility which is to configure your AlbanilJS builds. A typical _albanil.config.js_ looks like:

```JavaScript
//receives the albanil builder and the command line arguments passed to the albanil command
module.exports = function(albanil, args) { 
	//Do whatever you want here
    albanil.build({
		//Configuration object.
    });
    //Do whatever you want here
}
```

To build a javascript file you have to run the _albanil_ command from the directory in which is located your _albanil.config.js_ file. Is that easy!

For example, supose that you have created the _albanil.config.js_ in the /a/b/c directory. Then you just should do:

```shell
$ cd /a/b/c
$ albanil
```

And that's all!

Usage from node
-------------

You can also require the albanil builder as a node module. Then, just as with the command line, you just need to pass the configuration to the builder.

```JavaScript
var albanilBuilder = require('albaniljs');

albanilBuilder.build({
    //Configuration object. It's the same as the specified in the albanil.config.js files!
})
```

Configuration object
-------------

The configuration object is a typical javascript object that looks like:

```JavaScript
{
	srcFolder: 'someFolder', //The path to the folder where your modules are located.
	outFile: './out.js', //The path to the output file.
	object: { //If you want to wrap your build in an object then use this option (optional).
		name: 'ObjectName',
		expositorModule: 'ModuleWhichExposesFunctionality'
	},
    noBanner: false, //If true the AlbanilJS banner is no included (optional, false by default). Available from version 0.0.7
    globals: [], //An array of your code's external vendor paths (strings) to be injerted in the bundle (optional). Available from version 0.0.7
	include: [ //The modules that you want to include in this build. It could be just the name or the entire path.
		'A/src/restCommunication/callXAPi',
		'A/src/restCommunication/callYAPi'
	]
}
```

Obscure features
-------------
There is a beta feature for adding external vendor libraries that supports AMD (in other words that provides the posibility to expose itself to the RequireJS word using the define function). This will enable you to use it from your modules without touching the global namespace (window). For this to work you have to include the library as a regular project's module adding de sufix '.vendor' to the module's file name (before the js extension). Then you could use the vendor library from any other module by adding it as a module's depenency. Keep in mind that you should use it with its real name (without the '.vendor' sufix) from inside the modules. Below is an example of this (using the [Q](https://github.com/kriskowal/q) library for promises that supports AMD):

First rename and relocate the q.js code to _src/libs/q.vendor.js_. Then use it from any regular module:
```JavaScript
//FILE: src/helpers/ajax.js

define(['q.vendor'], function(q){
    console.log(q());
    /*
    ajax code
    */
})

```

More info
-------------
For more info and examples about the mechanism please check out this [post](http://augustoaltman.tumblr.com/post/103432024045/from-requirejs-modules-to-standalone-javascript).

License
-------------

Copyright (c) 2014 - 2014 Augusto Altman Quaranta <augusto.altman@gmail.com> and Matias Carraza <matiascarranza@gmail.com> et al Licensed under the MIT license.

Contact us
-------------

If you have any doubt, you want to contribute or you just want to meet us:

**e-mail**: augusto.altman@gmail.com, matiascarranza@gmail.com
