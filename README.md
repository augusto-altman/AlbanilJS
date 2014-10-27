AlbanilJS
=========

AlbanilJS is more than a smart concatenator, it's a javascript builder. With AlbanilJS you can modularize your javscript projects using the [RequireJS's syntax](http://requirejs.org/) and use these modules to build a standalone vendor-free javascript file (RequireJS independant!). It works as a concatenator, taking the code of several javascripts files and creating a single file, but it also deals with the modules' dependencies for you. So, for example, if you want to include an specific module in a build, you don't have to worry any more to also include all the other modules of which the first module depends on. This is all resolved automagically!


Amazing advantges
-------------

1. AlbanilJS allows you to modularize your code just as you would do with RequireJS. The thing is that, using AlbanilJS, you can build a standalone javascript file from these RequireJS modules, obtaining a single file wich **doesn't depends on RequireJS to work**.

2. With AlbanilJS you can make custom builds. For each build you can select the modules you want to include. AlbanilJS will create a final standalone javascript file with only the specified modules and its dependecies.

3. You don't have to worry to include manually all the modules' dependecies and the order in which you have to load them.

4. You can still use the RequireJS modules as RequireJS modules :P, by loading them directly using AMD. But don't forget, with AlbanilJS, you also have the choise to build an standalone javascript file which doesn't use RequireJS from those modules.

5. You can easily test each module separately by loading it using AMD.

How to install it?
-------------

It is avaible in [npm](https://www.npmjs.org/package/albaniljs)

```shell
$ npm install -g albaniljs
```

Usage from the command line
-------------

It is very easy to use. A typical setup will involve adding only one file to your project: _albanil.config.js_. As you can see it's valid javascript file so it's completely programable, but this js has another important responsibility which is to configure your AlbanilJS builds. 

To build a javascript file you have to run the _albanil_ command from the directory in which is located your _albanil.config.js_ file. Is that easy!

For example, supose that you have created the _albanil.config.js_ in the /a/b/c directory. Then you just should to do the following from a command line:

```shell
$ cd /a/b/c
$ albanil
```

And a typical albanil.config.js looks like:

```JavaScript
//Do whatever you want here
module.exports = function(albanil, args) { //receives the albanil builder and the command line arguments passed to the albanil command
	//Do whatever you want here
    albanil.build({
		//Configuration object.
    });
    //Do whatever you want here
}
//Do whatever you want here
```

Usage from node
-------------

You can also require the albanil builder as a node module, and in the same manner as with the command line, you just need to pass the configuration to the builder, and that's all.

```JavaScript
var albanilBuilder = require('albanil');

albanilBuilder.build({
    //Configuration object. It's the same as the specified in the albanil.config.js files!
})
```

Configuration object
-------------
```JavaScript
{
	srcFolder: 'someFolder', //The path to the folder where your modules are located.
	outFile: './out.js', //The path to the output file.
	object: { //If you want to wrap your build in an object then use this option (optional).
		name: 'ObjectName',
		expositorModule: 'ModuleWhichExposesFunctionality'
	},
	include: [ //The modules that you want to include in this build.
		'A/src/restCommunication/callXAPi',
		'A/src/restCommunication/callYAPi'
	]
}
```

License
-------------
Copyright (c) 2014 - 2014 Augusto Altman Quaranta <augusto.altman@gmail.com> and Matias Carraza <matiascarranza@gmail.com> et al Licensed under the MIT license.

Contact us
-------------

**e-mail**: augusto.altman@gmail.com, matiascarranza@gmail.com