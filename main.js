(function($) {
	var url = 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec';
	
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