module.exports.build = function(config) {
	var requirejs = require('requirejs'),
		helpers = require('./helpers'),
		logger = require('./logger'),
		requireConfig = null,
		albanilConfig = null;

	logger.setErrorsHeader('------- Configuration errors: \n');
	logger.setWarningsHeader('------- Configuration warnings: \n');
	logger.setSuccessHeader('------- Configuration successes: \n');

	console.log('\n\n>>>>>>>>>>>>>>>>>>> Reading configuration... \n');
	albanilConfig = helpers.configurationHandler(config, logger);
	console.log(logger.getLogText());

	requireConfig = module.exports.getRequireConfig(albanilConfig);

	if (logger.getStatus() > 0) {
		console.log('>>>>>>>>>>>>>>>>>>> Building...');
		requirejs.optimize(requireConfig, function(result) {
			console.log(result);
		});
	}
};

module.exports.getRequireConfig = function(config) {
	var fs = require('fs'),
		path = require('path'),
		beautify = require('js-beautify').js_beautify,
		rjsConfig = {
			baseUrl: config.srcFolder,
			include: config.include,
			optimize: 'none',
			skipSemiColonInsertion: true,
			onBuildWrite: function(id, path, contents) {
				contents = contents.replace(/define\((.|\s)*?\{/, '');
				contents = contents.replace(/\}\s*\)\s*;*\s*?.*$/, '');
				contents = contents.replace(/return(.|\s)*[^return]*$/, '');

				return contents;
			},
			out: function(text) {
				text = '\n/*-------------------------------------------------------\n' +
					'File builded with AlbanilJS\n' +
					'github: https://github.com/augusto-altman/AlbanilJS\n' +
					'npm: - \n' +
					'-------------------------------------------------------*/\n\n' + text;

				fs.writeFileSync(
					path.normalize(config.outFile),
					beautify(text, {
						indent_size: 4
					}));
			}
		};

	if (!!config.object) {
		rjsConfig.wrap = {
			start: 'var ' + config.object.name + ' = (function() {',
			end: 'return ' + config.object.expositorModule + ';\n}());'
		};
	}

	return rjsConfig;
};