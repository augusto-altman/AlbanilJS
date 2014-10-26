module.exports = (function() {
	//------------ Internals --------------
	var path = require('path'),
		fs = require('fs');

	//------------ Externals --------------
	var defaulter = (function() {
		var logger = {
			loggerMachine: null,
			setNative: function(log) {
				this.loggerMachine = log;
				this.error = this.loggerMachine.logError.bind(log);
				this.warning = this.loggerMachine.logWarning.bind(log);
				this.success = this.loggerMachine.logSuccess.bind(log);
			},
			unSet: function() {
				this.loggerMachine = null;
				delete this.error;
				delete this.warning;
				delete this.success;
			},
			isSet: function() {
				return this.loggerMachine !== null;
			}
		};

		var getValueOrdefault = {
			callEach: function(config) {
				var confWithDefaults = getValueOrdefault.forConfig(config);

				forEach(this, function(func, index) {
					confWithDefaults[index] = func(config[index]);
				}, ['forConfig', 'callEach']);

				return confWithDefaults;
			},
			forConfig: function(config) {
				if (!isObject(config)) {
					log('warning', 'The configuration must be specified in an object. The default config will be set.');
					return {};
				} else {
					return config;
				}
			},
			srcFolder: function(srcFolderProp) {
				if (isString(srcFolderProp)) {
					if (fs.existsSync(path.resolve(process.cwd(), path.normalize(srcFolderProp)))) {
						log('success', 'The srcFolder property is correct.');
						return srcFolderProp;
					} else {
						log('error', 'The srcFolder property has specified a folder that does not exist: ' + srcFolderProp);
						return '.';
					}
				} else {
					log('warning', 'The srcFolder property must be set and must be a string. By default it is set to "/." .');
					return '.';
				}
			},
			include: function(includeProp) {
				if (!isArray(includeProp)) {
					log('warning', 'The include property must be specified in an array. By default it is set to [].');
					return [];
				} else {
					log('success', 'The include property is correct.');
					return includeProp;
				}
			},
			object: function(objectProp) {
				var valid = true;
				if (isObject(objectProp)) {
					if (!isString(objectProp.name)) {
						log('warning', 'The object.name property must be set and must be a string. This will generate a non-encapsulated build.');
						valid = false;
					}
					if (!isString(objectProp.expositorModule)) {
						log('warning', 'The object.expositorModule property must be set and must be a string. This will generate a non-encapsulated build.');
						valid = false;
					}
					if (valid) {
						log('success', 'The object property is correct.');
						return objectProp;
					}
				} else {
					log('warning', 'The object property is not properly set. This will generate a non-encapsulated build.');
					return null;
				}
			},
			outFile: function(outFileProp) {
				if (isString(outFileProp)) {
					log('success', 'The outFile property is correct.');
					return outFileProp;
				} else {
					log('error', 'The outFile property must be set and must be a string.');
					return 'albanilOut.js';
				}
			}
		};

		function log(type, msg) {
			if (logger.isSet()) {
				logger[type](msg);
			}
		}

		return function(config, log) {
			logger.setNative(log);
			var procesedConfig = getValueOrdefault.callEach(config);
			logger.unSet();
			return procesedConfig;
		}
	})();

	function isObject(obj) {
		return !!obj && typeof obj === 'object';
	}

	function isString(obj) {
		var toString = Object.prototype.toString;
		return !!obj && (toString.call(obj) == '[object String]');
	}

	function forEach(obj, callback, ignore) {
		for (var prop in obj) {
			// important check that this is objects own property 
			// not from prototype prop inherited
			if (obj.hasOwnProperty(prop) && !isValueInArray(ignore, prop)) {
				callback(obj[prop], prop);
			}
		}
	}

	function isValueInArray(array, value) {
		return !!array && !!value && (array.indexOf(value) >= 0)
	}

	function isArray(array) {
		return !!array && Object.prototype.toString.call(array) === '[object Array]'
	}

	return {
		configurationHandler: defaulter,
		isObject: isObject,
		isString: isString,
		forEach: forEach,
		isArray: isArray,
		arrayHasValue: isValueInArray
	}
})();