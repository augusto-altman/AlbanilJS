module.exports = (function() {
	//------------ Internals --------------
	var path = require('path'),
		fs = require('fs'),
		helpers = require('./helpers'),
		strings = require('./strings'),
		logger = {
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

			helpers.forEach(this, function(func, index) {
				confWithDefaults[index] = func(config[index]);
			}, ['forConfig', 'callEach']);

			return confWithDefaults;
		},
		forConfig: function(config) {
			if (!helpers.isObject(config)) {
				log('warning', strings.messages.logger.warnings.defaultConfigActivated);
				return {};
			} else {
				return config;
			}
		},
		srcFolder: function(srcFolderProp) {
			if (helpers.isString(srcFolderProp)) {
				if (fs.existsSync(path.resolve(process.cwd(), path.normalize(srcFolderProp)))) {
					log('success', strings.messages.logger.successes.srcFolderOk);
					return srcFolderProp;
				} else {
					log('error', strings.messages.logger.errors.inexistantSrcFolder + srcFolderProp);
					return '.';
				}
			} else {
				log('warning', strings.messages.logger.warnings.defaultSrcFolderActivated);
				return '.';
			}
		},
		include: function(includeProp) {
			if (!helpers.isArray(includeProp)) {
				log('warning', strings.messages.logger.warnings.defaultIncludeActivated);
				return [];
			} else {
				log('success', strings.messages.logger.successes.includeOk);
				return includeProp;
			}
		},
		object: function(objectProp) {
			var valid = true;
			if (helpers.isObject(objectProp)) {
				if (!helpers.isString(objectProp.name)) {
					log('warning', strings.messages.logger.warnings.badObjectName);
					valid = false;
				}
				if (!helpers.isString(objectProp.expositorModule)) {
					log('warning', strings.messages.logger.warnings.badExpositorModule);
					valid = false;
				}
				if (valid) {
					log('success', strings.messages.logger.successes.objectPropertyOk);
					return objectProp;
				}
			} else {
				log('warning', strings.messages.logger.warnings.noObjectProperty);
				return null;
			}
		},
		outFile: function(outFileProp) {
			if (helpers.isString(outFileProp)) {
				log('success', strings.messages.logger.successes.outFileOk);
				return outFileProp;
			} else {
				log('error', strings.messages.logger.errors.badOutFile);
				return 'albanilOut.js';
			}
		}
	};

	function log(type, msg) {
		if (logger.isSet()) {
			logger[type](msg);
		}
	}

	//------------ Externals --------------
	return function(config, log) {
		logger.setNative(log);
		var procesedConfig = getValueOrdefault.callEach(config);
		logger.unSet();
		return procesedConfig;
	};
})();