(function($) {
	var access = document.createElement('iframe');
	access.id = 'access';
	access.src = 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec?mode=access';
	$('.wrapper')[0].appendChild(access);
})(yun);