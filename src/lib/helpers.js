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

	return {
		isObject: isObject,
		isString: isString,
		forEach: forEach,
		isArray: isArray,
		arrayHasValue: isValueInArray
	};
})();