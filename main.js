(function($) {
	var url = 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec';
	
	// window.jsonpCallback = function(res) {
	// 	alert(res);
	// 	alert($('#s321')[0].test);
	// };
	
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
	$.jsonp({
		url: 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec',
		arg: 'mode=requestPermissions&callback=jsonpCallback',
		callback: 'jsonpCallback',
		success: function(res) {
			alert(res);
		},
		timeout: {
			time: 3000,
			response: function() {
				alert('timeout');	
			}
		}
	});
})(yun);