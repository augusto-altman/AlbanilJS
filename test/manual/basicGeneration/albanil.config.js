module.exports = function(albanil, args) {
	albanil.build({
		srcFolder: './src',
		outFile: './out.js',
		object: {
			name: 'cuak',
			expositorModule: 'a'
		},
		include: [
			'restCommunication/callXAPi',
			'restCommunication/callYAPi'
		]
	});
}