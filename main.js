(function($) {
	var url = 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec';
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
	$.ajax({
		method: 'get',
		url: 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec',
		arg	: 'data=133131',
		success: function(res) {
			alert(res);
		}
	});
})(yun);