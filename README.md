AlbanilJS
=========

AlbanilJS is more than a smart concatenator, it's a javascript builder. With AlbanilJS you can modularize your javscript projects using the [RequireJS's syntax](http://requirejs.org/) and then use these modules to build a standalone vendor-free javascript file (RequireJS independant!).

It works as a concatenator, taking the code of several javascripts files and creating a new one with all the chunks of code concateneted in some order. The special thing about AlbanilJS is that you have to use RequireJS modules as concatenation sources instead of using regular javascript files. This allows you to explicitly specify dependencies beteween the chunks of code you want to concatenate, which brings you [awesome advatages](#awesome-advantges). At _compilation time_, AlbanilJS will deal with the dependencies for you. So, for example, if you want to include an specific module in a build, you don't have to worry any more to also include before all the other modules of which the first one depends on. This is all resolved automagically! AlbanilJS will use the dependencies that you've specified and will write each module in the concatened file below the modules of which it depends on, so the javascript intepreter will always read the concatened code in the correct order.

At the end you will get a clean single javascript file, and when we say a clean, we really mean clean!. AlbanilJS will not add any vendor dependency to your code, your code will work as is (it won't need RequireJS to work). This happens because **AlbanilJS will only take your code in each module and will ignore all the _RequireJS syntactic ritual_**.


Awesome advantges
-------------

1. AlbanilJS allows you to modularize your code just as you would do with RequireJS. The thing is that, using AlbanilJS, you can build a standalone javascript file from these RequireJS modules, obtaining a single file wich **doesn't need RequireJS to work**.

2. With AlbanilJS you can make custom builds. For each build you can select the modules you want to include. AlbanilJS will create a final standalone javascript file with only the specified modules and its dependecies.

3. You don't have to worry to include manually all the modules' dependecies and the order in which you have to load them. This is all resolved automagically by AlbanilJS.

4. You can still use the RequireJS modules as RequireJS modules :P, by loading them directly using AMD. But don't forget, with AlbanilJS, you also have the choise to build an standalone javascript file which doesn't use RequireJS from those modules.

5. You can easily test each module separately by loading them using AMD.

How to install it?
-------------

It is avaible in [npm](https://www.npmjs.org/package/albaniljs)

```shell
$ npm install -g albaniljs
```

Usage from the command line
-------------

It is very easy to use. A typical setup will involve adding only one file to your project: _albanil.config.js_. As you can see it's valid javascript file so it's completely programable, but this js has another important responsibility which is to configure your AlbanilJS builds. A typical _albanil.config.js_ looks like:

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

You can also require the albanil builder as a node module, and in the same manner as with the command line, you just need to pass the configuration to the builder.

```JavaScript
var albanilBuilder = require('albanil');

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

If you any doubt, you want to contribute or you just want to meet us:

**e-mail**: augusto.altman@gmail.com, matiascarranza@gmail.com