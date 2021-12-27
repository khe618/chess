var socket = io()

class Board extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	pieces: []
	    }
	}
	componentDidMount() {
		let self = this;
		socket.on("game state", function(gameState){
			var pieces = Object.values(gameState.pieces)
			self.setState({pieces: pieces})
		})

  	}
	render() {
		let pieces = this.state.pieces
			.map(piece => <Piece color={piece.color} type={piece.piece} id={piece.id} x={piece.x} y = {piece.y}/>)
		console.log(pieces)
		return (
			<div>
				<div style={{display:"inline-block", position:"relative", top: 0, left: 0}}>
					<img className="no-drag" src="board.png" alt="board" height="800px" style={{position:"relative", top: 0, left: 0}}></img>
					{pieces}
				</div>	
			</div>
	    )
	}
}

let domContainer = document.getElementById("board")
ReactDOM.render(<Board />, domContainer);