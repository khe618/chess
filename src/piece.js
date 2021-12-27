class Piece extends React.Component {

	constructor(props) {
	    super(props);
	}
	componentDidMount(){
		$(ReactDOM.findDOMNode(this)).draggable({
			containment: "parent",
			stop: function(event){
				let offset = $(this).offset()
				let top = Math.round(offset.top /100) * 100
				let left = Math.round(offset.left /100) * 100
				$(this).css({top: top, left: left})
				socket.emit("release", {id: event.target.id, x: left/100, y: top/100})
			}
		});
	}
	render() {
		return (
			<img className="piece" id={this.props.id} src={`${this.props.type}_${this.props.color}.png`} alt="piece" 
			height="100px" style={{position: "absolute", top: this.props.y * 100, left: this.props.x * 100}}></img>
	    )
	}
}