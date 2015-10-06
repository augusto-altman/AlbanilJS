module.exports = (function() {
	//------------ Externals --------------
	function isObject(obj) {
		return !!obj && typeof obj === 'object';
	}

	function isString(obj) {
		var toString = Object.prototype.toString;
		return !!obj && (toString.call(obj) === '[object String]');
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
		return !!array && !!value && (array.indexOf(value) >= 0);
	}

	function isArray(array) {
		return !!array && Object.prototype.toString.call(array) === '[object Array]';
	}

	function isBoolean(value) {
		return typeof value === 'boolean';
	}

	function getRequireJSPathsFromDir(dir, override) {
		var walk = require('walk'),
			path = require('path'),
			files = {},
			// To be truly synchronous in the emitter and maintain a compatible api,
			// the listeners must be listed before the object is created
			options = {
				listeners: {
					file: function(root, stat, next) {
						var fullPath = path.normalize(root + '/' + stat.name);
						// Add this file to the list of files
						if (path.extname(fullPath) === '.js') {
							files[path.basename(fullPath, '.js')] = path.normalize(path.dirname(fullPath) + '/' + path.basename(fullPath, '.js'));
						}
						next();
					},
					errors: function(root, nodeStatsArray, next) {
						next();
					}
				}
			};

		walk.walkSync(path.resolve(process.cwd(), path.normalize(dir)), options);

		if (typeof override === 'object') {
			for (var index in override) {
				if (override.hasOwnProperty(index)) {
					files[index] = override[index];
				}
			}
		}

		return files;
	}

	return {
		isObject: isObject,
		isString: isString,
		forEach: forEach,
		isArray: isArray,
		arrayHasValue: isValueInArray,
		getRequireJSPathsFromDir: getRequireJSPathsFromDir,
		isBoolean: isBoolean
	};
})();