module.exports = function(albanil, args) {
	albanil.build({
		srcFolder: '.',
		outFile: './cuak2.js',
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