var events = require('events');
var sys = require('sys');
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var Kroupa = function() {
  var _self = this;
  var counter = 0;
  messages = [];
  
  var routes = {
    '/' : function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      var string = "this is a webservice. no direct access!";
      response.write(string);
      response.end();
    },

    '/listen' : function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/javascript'});
      updateLoop.call(this, request, response);
	  
  		sys.puts('listening...');
    },

    '/post' : function(request, response) {
		
		 if (request.method == 'POST') {
			var body = '';
			request.on('data', function (data) {
				body += data;
			});
			request.on('end', function () {
				var POST = qs.parse(body);
  		sys.puts('request'+JSON.stringify(POST));
      response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.write("1");
	  messages.push(JSON.stringify(POST));
      response.end();
			});
		}

    }
  }

  var updateLoop = function(request, response) {
    if(messages.length > 0) {
		var popit = messages.pop();
      response.write(popit);
  	  sys.puts('pop:'+popit);
      response.end();
      return false;
    }
    
    setTimeout(function() {
      updateLoop.call(this, request, response);
    }, 300);
  };

  var _requestHandler = function(request, response) {
	  
    if(routes[request.url] === undefined) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('not found\n');
      response.end();
    } else {
      routes[request.url].call(this, request, response);
    }
  };
  
  var _updateHandler = function(request, socket, head) {
  };

  var _closeHandler = function() {
  };
  
  var _server = http.createServer().
          addListener('request', _requestHandler)
          .addListener('close', _closeHandler)
          .addListener('update', _updateHandler)
          .listen(8000);
  sys.puts('Listening to port 8000');
};

new Kroupa();
