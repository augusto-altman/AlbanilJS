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
				},
				errors: {
					inexistantSrcFolder: 'The srcFolder property has specified a folder that does not exist: ',
					badOutFile: 'The outFile property must be set and must be a string.'
				},
				warnings: {
					defaultConfigActivated: 'The configuration must be specified in an object. The default config will be set.',
					defaultSrcFolderActivated: 'The srcFolder property must be set and must be a string. By default it is set to "/." .',
					defaultIncludeActivated: 'The include property must be specified in an array. By default it is set to [].',
					badObjectName: 'The object.name property must be set and must be a string. This will generate a non-encapsulated build.',
					badExpositorModule: 'The object.expositorModule property must be set and must be a string. This will generate a non-encapsulated build.',
					noObjectProperty: 'The object property is not properly set. This will generate a non-encapsulated build.'
				},
				successes: {
					srcFolderOk: 'The srcFolder property is correct.',
					includeOk: 'The include property is correct.',
					objectPropertyOk: 'The object property is correct.',
					outFileOk: 'The outFile property is correct.',
					globalsOk: 'The globals property is correct.',
					noBannerOk: 'The noBanner property is correct.'
				}
			},
			stage: {
				configuration: '\n\n>>>>>>>>>>>>>>>>>>> Reading configuration... \n',
				build: '>>>>>>>>>>>>>>>>>>> Building...'
			}
		},
		albanilBanner: '\n/*-------------------------------------------------------\n' +
			'File built with AlbanilJS\n' +
			'github: https://github.com/augusto-altman/AlbanilJS\n' +
			'npm: https://www.npmjs.org/package/albaniljs \n' +
			'-------------------------------------------------------*/\n\n'
	};
})();