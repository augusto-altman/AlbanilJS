#!/usr/bin/env node

'use strict';

process.title = 'albanil';

var path = require('path'),
    albanilBuilder = require('./builder'),
    albanilConfig = require(path.resolve(process.cwd(), 'albanil.config.js'));

albanilConfig(albanilBuilder, process.argv);