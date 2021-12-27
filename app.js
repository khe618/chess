
const https = require("https"),
      bodyParser = require("body-parser"),
	  express = require("express");
	  
var app = express()
var http = require("http").Server(app);
var io = require("socket.io")(http);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));


var port = process.env.PORT || 3000;

function initializeGameState(){

	var pieces = {
		"id_0": {color:"black", piece: "rook", id: "0", x: 0, y: 0},
	 	"id_1": {color:"black", piece: "knight", id: "1", x: 1, y: 0},
	 	"id_2": {color:"black", piece: "bishop", id: "2", x: 2, y: 0},
	 	"id_3": {color:"black", piece: "queen", id: "3", x: 3, y: 0},
	 	"id_4": {color:"black", piece: "king", id: "4", x: 4, y: 0},
	 	"id_5": {color:"black", piece: "bishop", id: "5", x: 5, y: 0},
	 	"id_6": {color:"black", piece: "knight", id: "6", x: 6, y: 0},
	 	"id_7": {color:"black", piece: "rook", id: "7", x: 7, y: 0},
	 	"id_8": {color:"white", piece: "rook", id: "8", x: 0, y: 7},
	 	"id_9": {color:"white", piece: "knight", id: "9", x: 1, y: 7},
	 	"id_10": {color:"white", piece: "bishop", id: "10", x: 2, y: 7},
	 	"id_11": {color:"white", piece: "queen", id: "11", x: 3, y: 7},
	 	"id_12": {color:"white", piece: "king", id: "12", x: 4, y: 7},
	 	"id_13": {color:"white", piece: "bishop", id: "13", x: 5, y: 7},
	 	"id_14": {color:"white", piece: "knight", id: "14", x: 6, y: 7},
	 	"id_15": {color:"white", piece: "rook", id: "15", x: 7, y: 7},
	}
	for (var i = 16; i < 24; i++){
		let id = i.toString()
		pieces[id] = {color: "black", piece: "pawn", id: id , x: i - 16, y: 1}
	}
	for (var i = 24; i < 32; i++){
		let id = i.toString()
		pieces[id] = {color: "white", piece: "pawn", id: id, x: i - 24, y: 6}
	}

	var board = new Array(8).fill(null).map(() => new Array(8).fill(null));

	for (var piece of Object.values(pieces)){
		board[piece.y][piece.x] = Object.assign({}, piece)
	}
	return {
		pieces: pieces,
		board: board
	}
}


var gameState = initializeGameState()


io.on('connection', function(socket){
	console.log("connect")
	socket.emit("game state", gameState)
	socket.on("release", function(data){
		console.log(data)
		console.log(gameState.pieces)
		let piece = gameState.pieces[data.id]
		gameState.board[piece.y][piece.x] = null
		piece.x = data.x 
		piece.y = data.y

		if (gameState.board[data.y][data.x]){
			console.log(gameState.pieces[gameState.board[data.y][data.x].id])
			delete gameState.pieces[gameState.board[data.y][data.x].id]
		}

		gameState.board[data.y][data.x] = Object.assign({}, piece)
		io.emit("game state", gameState)
	})
})

http.listen(port, function(){
  console.log('listening on *:' + port);
});



