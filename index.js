const app = require('express')();

var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
} 
app.use(allowCrossDomain); 
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/view', function(req, res){
  res.sendFile(__dirname + '/view.html');
});

io.on('connection', function(socket){
	console.log('user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('updatePosition', function(coords){
		console.log('posição atualizada');
		console.log(coords);
		socket.broadcast.emit('positionUpdated', coords)		
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});