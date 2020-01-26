window.yun = (function() {
	'use strict';
	var yunVersion = '2.1';
	
	//#region [green] is/type/　　　　　　　　　　　　								#
	// bool isExist(any _something)
	function isExist(_something) {
		return _something !== undefined && _something !== null;
	}
	
	// bool isArray(any _something)
	function isArray(_something) {
		return Object.prototype.toString.call(_something) === '[object Array]';
	}
	
	// bool isBoolean(any _something)
	function isBoolean(_something) {
		return Object.prototype.toString.call(_something) === '[object Boolean]';
	}
	
	// bool isFunction(any _something)
	function isFunction(_something) {
		return Object.prototype.toString.call(_something) === '[object Function]';
	}
	
	// bool isNumber(any _something)
	function isNumber(_something) {
		return Object.prototype.toString.call(_something) === '[object Number]';
	}
	
	// bool isObject(any _something)
	function isObject(_something) {
		return Object.prototype.toString.call(_something) === '[object Object]';
	}
	
	// bool isString(any _something)
	function isString(_something) {
		return Object.prototype.toString.call(_something) === '[object String]';
	}
	
	// bool isInteger(any _something)
	function isInteger(_something) {
		return _something === +_something && _something === (_something | 0);
	}
	
	// bool isFloat(any _something)
	function isFloat(_something) {
		return _something === +_something && _something !== (_something | 0);
	}
	//#endregion [green]
	
	/* class timer(optional _config = {
			optional function tick,
			optional int interval
		})
		.tick function(optional function _tick) //get set tick
		.interval int(optional int _interval) //get set interval
		.start void(optional int _interval)
		.stop void()
		.toggle void(optional int _interval)
	*/
	function timer(_config) {
		//#region constructor
		_config = isExist(_config) ? _config : { interval: 1, tick: null };
		_config.interval = parseInt(_config.interval);
		_config.interval = _config.interval >= 1 ? _config.interval : 1;
		_config.tick = isFunction(_config.tick) ? _config.tick : null;
		
		_config.me = this;
		_config.enable = false;
		_config.counter = function() {
			if (_config.enable) {
				if (_config.tick) {
					_config.tick.call(_config.me);
				}
				setTimeout(_config.counter, _config.interval);
			}
		};
		//#endregion
		
		this.tick = function(_tick) {
			if (isExist(_tick)) {
				//set tick
				_config.tick = isFunction(_tick) ? _tick : null;
			} else {
				//get tick
				return _config.tick;
			}
		};
		
		this.interval = function(_interval) {
			if (isExist(_interval)) {
				//set interval
				_interval = parseInt(_interval);
				_config.interval = _interval >= 1 ? _interval : _config.interval;
			} else {
				//get interval
				return _config.interval;
			}
		};
		
		this.start = function(_interval) {
			if (_config.enable === false) {
				if (isExist(_interval)) {
					_interval = parseInt(_interval);
					_config.interval = _interval >= 1 ? _interval : 1;
				}
				_config.enable = true;
				setTimeout(_config.counter, _config.interval);
			}
		};
		
		this.stop = function() {
			_config.enable = false;
		};
		
		this.toggle = function(_interval) {
			if (_config.enable) {
				this.stop();
			} else {
				this.start(_interval);
			}
		};
	}
	
	/* void ajax(_config = {
		string url,
		optional string arg,
		optional string method,
		optional function success,
		optional timeout = {
			int time, //unit: second
			function response
		}
		optional function failure
		optional bool async
	}) */
	function ajax(_config) {
		_config = isExist(_config) ? _config : {};
		var __default = {
			method: 'get',
			url: '',
			arg: '',
			success: null,
			timeout: null,
			failure: null,
			async: true
		};
		for (var key in __default) {
			if (!isExist(_config[key])) {
				_config[key] = __default[key];
			}
		}
		_config.method = _config.method.toLowerCase();
		_config.arg = encodeURI(_config.arg);
		_config.timesup = false;
		_config.startTime = -1;
		if (_config.timeout !== null) {
			_config.timer = new timer({
				interval: 1000,
				tick: function() {
					var d = new Date();
					var t = d.getTime();
					if (t - _config.startTime >= _config.timeout.time) {
						this.stop();
						_config.timesup = true;
						if (isFunction(_config.timeout.response)) {
							_config.timeout.response.call(null);
						}
					}
				}
			});
		}
		
		//#region XMLHttpRequest
		var httpRequest;
		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType) {
				httpRequest.overrideMimeType('text/xml');
			}
		} else if (window.ActiveXObject) {
			try {
				httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {}
			}
		}
		//#endregion
		
		httpRequest.onreadystatechange = function() {
			if (!_config.timesup) {
				if (httpRequest.readyState == 4) {
					if (_config.timeout !== null) {
						_config.timer.stop();
					}
					if (httpRequest.status == 200) {
						if (isFunction(_config.success)) {
							_config.success.call(httpRequest, httpRequest.responseText);
						}
					} else {
						if (isFunction(_config.failure)) {
							_config.failure.call(httpRequest, httpRequest.status);
						}
					}
				}
			}
		};
		
		if (_config.timeout) {
			_config.timer.start();
		}
		
		if (_config.method === 'get') {
			httpRequest.open('get', _config.url + '?' + _config.arg, _config.async);
			httpRequest.send();
		} else if (_config.method === 'post') {
			httpRequest.open('post', _config.url, _config.async);
			httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			httpRequest.send(_config.arg);
		}
	}
	
	function jsonp(_url) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = _url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	/* int rand(int _min, int _max) */
	function rand(_min, _max) {
		return Math.random() * (_max - _min) + _min;
	}
	
	return {
		version: yunVersion,
		isExist: isExist,
		isArray: isArray,
		isBoolean: isBoolean,
		isFunction: isFunction,
		isNumber: isNumber,
		isObject: isObject,
		isString: isString,
		isInteger: isInteger,
		isFloat: isFloat,
		timer: timer,
		ajax: ajax,
		jsonp: jsonp,
		rand: rand
	};
})();