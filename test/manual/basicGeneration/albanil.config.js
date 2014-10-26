module.exports = function(albanil, args) {
	albanil.build({
		srcFolder: '.',
		outFile: './out.js',
		object: {
			name: 'cuak',
			expositorModule: 'a'
		},
		include: [
			'A/src/restCommunication/callXAPi',
			'A/src/restCommunication/callYAPi'
		]
	});
}