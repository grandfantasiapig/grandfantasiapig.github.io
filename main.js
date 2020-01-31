(function($) {
	var sheetURL = 'https://docs.google.com/spreadsheets/d/';
	
	function tabControl(data) {
		var me = this;
		this.length = data.length;
		var tabcontrol = document.createElement('div');
		tabcontrol.classList.add('tabcontrol');
		
		var panel0 = document.createElement('div');
		panel0.classList.add('panel');
		
		var panel1 = document.createElement('div');
		panel1.classList.add('panel');
		
		for (var i = 0; i < data.length; i++) {
			var tabspace = document.createElement('div');
			tabspace.classList.add('tabspace');
			panel0.appendChild(tabspace);
			
			var tab = document.createElement('div');
			tab.id = 'tab' + i;
			tab.index = i;
			tab.innerHTML = data[i].id;
			tab.classList.add('tab');
			tab.addEventListener('click' , function() {
				me.setPage.call(me, this.index);
			}.bind(tab));
			tab.addEventListener('dblclick' , function() {
				if (this.classList.contains('active')) {
					var index = this.index;
					$('#tabiframe' + index)[0].src = $('#tabiframe' + index)[0].src;
				}
			}.bind(tab));
			panel0.appendChild(tab);
			
			if (i === data.length - 1) {
				var tabfill = document.createElement('div');
				tabfill.classList.add('tabfill');
				panel0.appendChild(tabfill);
			}
			
			var tabpage = document.createElement('div');
			tabpage.id = 'tabpage' + i;
			tabpage.index = i;
			tabpage.classList.add('tabpage');
			panel1.appendChild(tabpage);
			
			var tabiframe = document.createElement('iframe');
			tabiframe.id = 'tabiframe' + i;
			tabiframe.index = i;
			tabiframe.classList.add('tabiframe');
			tabiframe.src = '';
			tabiframe.url = '';
			
			tabpage.appendChild(tabiframe);
		}
		
		tabcontrol.appendChild(panel0);
		tabcontrol.appendChild(panel1);
		
		
		this.element = function() {
			return tabcontrol;
		};
		
		this.setPage = function(_index) {
			for (var i = 0; i < this.length; i++) {
				$('#tab' + i)[0].classList.remove('active');
				$('#tabpage' + i)[0].classList.remove('active');
			}
			
			$('#tab' + _index)[0].classList.add('active');
			$('#tabpage' + _index)[0].classList.add('active');
			
			if ($('#tabiframe' + _index)[0].url === '') {
				$('#tabiframe' + _index)[0].url = sheetURL + data[_index].url;
				$('#tabiframe' + _index)[0].src = sheetURL + data[_index].url;
			}
		};
	}
	
	$.jsonp({
		url: 'https://script.google.com/macros/s/AKfycbwQYIUEoaRFy9Lnm7KcOpQnmwuJpdowKRTPaJ6FWPAqZJChSJgJ/exec',
		arg: 'mode=fetch&callback=jsonpCallback',
		callback: 'jsonpCallback',
		success: function(res) {
			data = JSON.parse(res);
			for (var i = 0; i < data.length; i++) {
				data[i].id = $.base64.decode(data[i].id, true, true);
			}
			
			var tabcontrol = new tabControl(data);
			$('.wrapper')[0].appendChild(tabcontrol.element());
			tabcontrol.setPage(0);
		},
		timeout: {
			time: 3000,
			response: function() {
				if (confirm('程式沒有權限；要到google頁面請求權限嗎?')) {
					location.href = 'request.html';
				}
			}
		}
	});
})(yun);