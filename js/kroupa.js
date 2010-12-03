/*

	Kroupa.js
	
	@author: timcubb (http://github.com/timcubb)
	@description: client side lib to connect to your kroupa comet server.
	@version: 0.1 (work in progress)
	
	NOTE: This code is in its very early experimental stage. Use at your own risk.
	No warranty or guarantee or any kind expressed or implied.
	
	
	@license: you can do whatever you want with this. Personal or commercial. 
	If you use this code please keep this comment block intact.
	
	Thanks!


*/

function Kroupa(path) {
	
	this.path = path;
	
	this.receive_message = function(callback) {
		$.get(this.path+'/listen', function(data) {
			callback(data);				 
		});
	}
	
	this.disconnect = function() {
		//TODO!
	}
	
	this.send_message = function(data) {
		//alert('send message');
		var url = this.path+'/post';
		$.post(url, data);
	}

}
	