module.exports = (function() {
	//------------ Internals --------------
	var logs = {
			warnings: {
				msgs: [],
				header: '------------- Warnings \n'
			},
			errors: {
				msgs: [],
				header: '------------- Errors \n'
			},
			success: {
				msgs: [],
				header: '------------- Success \n'
			}
		},
		codes = {
			failure: 0,
			successWithWarnings: 1,
			success: 2
		},
		textGenerators = [

			function() {
				return logTextBuilder({
					header: logs.errors.header,
					msgs: logs.errors.msgs
				});
			},
			function() {
				return logTextBuilder({
					header: logs.warnings.header,
					msgs: logs.warnings.msgs
				});
			},
			function() {
				return logTextBuilder({
					header: logs.success.header,
					msgs: logs.success.msgs
				});
			}
		];

	function logTextBuilder(conf) {
		var toRet = conf.header;
		if (conf.msgs.length > 0) {
			toRet = conf.msgs.reduce(function(accumulator, value) {
				return accumulator + value + '\n';
			}, toRet);
		} else {
			toRet += 'none\n';
		}

		return toRet;
	}

	//------------ Externals --------------
	function loggerWarning(msg) {
		logs.warnings.msgs.push(msg);
	}

	function loggerError(msg) {
		logs.errors.msgs.push(msg);
	}

	function loggerSuccess(msg) {
		logs.success.msgs.push(msg);
	}

	function getStatus() {
		if (logs.errors.msgs.length > 0) {
			return codes.failure;
		} else if (logs.warnings.msgs.length > 0) {
			return codes.successWithWarnings;
		} else {
			return codes.success;
		}
	}

	function getLogText() {
		return textGenerators.reduce(function(accumulator, func) {
			return accumulator + func() + '\n';
		}, '');
	}

	function setErrorsHeader(newHeader) {
		logs.errors.header = newHeader;
	}

	function setWarningsHeader(newHeader) {
		logs.warnings.header = newHeader;
	}

	function setSuccessHeader(newHeader) {
		logs.success.header = newHeader;
	}

	return {
		logWarning: loggerWarning,
		logError: loggerError,
		logSuccess: loggerSuccess,
		getStatus: getStatus,
		getLogText: getLogText,
		setErrorsHeader: setErrorsHeader,
		setWarningsHeader: setWarningsHeader,
		setSuccessHeader: setSuccessHeader,
	}
})();