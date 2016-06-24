/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
var server = app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var io = require('socket.io')(server);
io.on('connection', function(socket){
//  console.log("socket connected");
  socket.on('cpu', function(res) { 
    console.log(res);
    //broadcast message
    socket.broadcast.emit('cpu', res);
  });
  socket.on('memory', function(res) { 
    console.log(res);
    //broadcast message
    socket.broadcast.emit('memory', res);
  });
  socket.on('express', function(res) {
    console.log(res);
    //broadcast message
    socket.broadcast.emit('express', res);
  })
  socket.on('disconnect', function(){});
}); 

