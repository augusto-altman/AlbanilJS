module.exports = (function() {
	//At the moment we there is no need to apply the module pattern. Nevertheless we apply it
	//for future versions.
	return {
		messages: {
			logger: {
				headers: {
					errors: 'Errors: \n',
					warnings: 'Warnings: \n',
					successes: 'Successes: \n'
				}
			},
			stage: {
				configuration: '\n\n>>>>>>>>>>>>>>>>>>> Reading configuration... \n',
				build: '>>>>>>>>>>>>>>>>>>> Building...'
			}
		},
		albanilBanner: '\n/*-------------------------------------------------------\n' +
			'File builded with AlbanilJS\n' +
			'github: https://github.com/augusto-altman/AlbanilJS\n' +
			'npm: https://www.npmjs.org/package/albaniljs \n' +
			'-------------------------------------------------------*/\n\n'
	};
})();