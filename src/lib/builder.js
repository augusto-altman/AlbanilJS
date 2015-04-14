module.exports = (function() {
	var strings = require('./strings'),
		helpers = require('./helpers');

	return {
		build: function(config, callback) {
			var requirejs = require('requirejs'),
				configurator = require('./configurator'),
				logger = require('./logger'),
				chalk = require('chalk'),
				requireConfig = null,
				albanilConfig = null;

			logger.setErrorsHeader(strings.messages.logger.headers.errors);
			logger.setWarningsHeader(strings.messages.logger.headers.warnings);
			logger.setSuccessHeader(strings.messages.logger.headers.successes);

			console.log(chalk.cyan(strings.messages.stage.configuration));
			albanilConfig = configurator(config, logger);
			console.log(logger.getLogText());

			requireConfig = this.getRequireConfig(albanilConfig);

			if (logger.getStatus() > 0) {
				console.log(chalk.cyan(strings.messages.stage.build));
				requirejs.optimize(requireConfig, function(result) {
					console.log(result);
					if (typeof callback === 'function') {
						callback();
					}
				});
			}
		},
		getRequireConfig: function(config) {
			var fs = require('fs'),
				path = require('path'),
				beautify = require('js-beautify').js_beautify,
				rjsConfig = {
					baseUrl: config.srcFolder,
					paths: helpers.getRequireJSPathsFromDir(config.srcFolder),
					include: config.include,
					optimize: 'none',
					skipSemiColonInsertion: true,
					onBuildWrite: function(id, path, contents) {
						contents = contents.replace(/define\((.|\s)*?\{/, '');
						contents = contents.replace(/\}\s*\)\s*;*\s*?.*$/, '');
						contents = contents.replace(/return.*[^return]*$/, '');

						return contents;
					},
					out: function(text) {
						var codeParts, splitter = 'var ' + config.object.name + ' = (function() {';

						if(!config.noBanner) {
							text = strings.albanilBanner + text;
						}

						text = beautify(text, {
							indent_size: 4
						});

						if (!!config.globals && !!config.object) {
							codeParts = text.split(splitter);
							text = codeParts[0] + splitter + '\n\r';
							config.globals.forEach(function(globalPath) {
								text =  text + fs.readFileSync(globalPath) + '\n\r';
							});
							text = text + codeParts[1];
						} else {
							config.globals.forEach(function(globalPath) {
								text =  fs.readFileSync(globalPath) + '\n\r' + text;
							});
						}

						fs.writeFileSync(
							path.normalize(config.outFile),
							text);
					}
				};

			if (!!config.object) {
				rjsConfig.wrap = {
					start: 'var ' + config.object.name + ' = (function() {',
					end: 'return ' + config.object.expositorModule + ';\n}());'
				};
			}

			return rjsConfig;
		}
	};
})();