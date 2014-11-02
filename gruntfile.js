module.exports = function(grunt) {
	grunt.initConfig({
		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),

		// Task configuration.
		jshint: {
			options: {
				//strict: true,
				noempty: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				undef: true,
				bitwise: true,
				freeze: true,
				latedef: true,
				unused: true,
				trailing: true,
				node: true,
			},
			deliver: ['src/**/*']
		},
		copy: {
			deliver: {
				files: [{
					src: 'src/bin/albanil',
					dest: 'dist/bin/albanil'
				}, {
					src: 'src/lib/builder.js',
					dest: 'dist/lib/builder.js'
				}, {
					src: 'src/lib/helpers.js',
					dest: 'dist/lib/helpers.js'
				}, {
					src: 'src/lib/logger.js',
					dest: 'dist/lib/logger.js'
				}, {
					src: 'src/lib/configurator.js',
					dest: 'dist/lib/configurator.js'
				}, {
					src: 'src/lib/strings.js',
					dest: 'dist/lib/strings.js'
				}]
			}
		},
		nodeunit: {
			deliver: ['test/**/*.test.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['jshint:deliver', /*'nodeunit:deliver',*/ 'copy:deliver']);

};