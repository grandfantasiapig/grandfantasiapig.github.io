window.yun = (function() {
	'use strict';
	var yunVersion = '2.2',
		$ = function(_selector) {
			return document.querySelectorAll(_selector);
		};
		
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
	
	/* void jsonp({
		string url,
		string arg,
		string callback,
		function success(res),
		timeout = {
			int time, //unit min second
			function reponese	
		}
	}) */
	function jsonp(_config) {
		_config.script = document.createElement('script');
		_config.script.type = 'text/javascript';
		_config.script.src = _config.url + '?' + _config.arg;
		
		_config.timesup = false;
		_config.startTime = -1;
		
		_config.timer = new timer({
			interval: 1,
			tick: function() {
				var d = new Date();
				var t = d.getTime();
				if (t - _config.startTime >= _config.timeout.time) {
					this.stop();
					_config.timesup = true;
					if (isFunction(_config.timeout.response)) {
						_config.timeout.response.call(null);
					}
					
					window[_config.callback] = null;
					$('head')[0].removeChild(_config.script);
				}
			}
		});
		
		window[_config.callback] = function(res) {
			if (!_config.timesup) {
				if (_config.timeout !== null) {
					_config.timer.stop();
				}
				
				_config.success.call(window, res);
				window[_config.callback] = null;
				$('head')[0].removeChild(_config.script);
			}
		};
		
		var d = new Date();
		_config.startTime = d.getTime();
		_config.timer.start();
		$('head')[0].appendChild(_config.script);
	}
	
	/* int rand(int _min, int _max) */
	function rand(_min, _max) {
		return Math.random() * (_max - _min) + _min;
	}
	
	$.version = function() {
		return yunVersion;
	};
	$.isExist = isExist;
	$.isArray = isArray;
	$.isBoolean = isBoolean;
	$.isFunction = isFunction;
	$.isNumber = isNumber;
	$.isObject = isObject;
	$.isString = isString;
	$.isInteger = isInteger;
	$.isFloat = isFloat;
	$.timer = timer;
	$.jsonp = jsonp;
	$.rand = rand;
	return $;
})();