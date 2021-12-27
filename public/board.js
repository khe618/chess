var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = io();

var Board = function (_React$Component) {
	_inherits(Board, _React$Component);

	function Board(props) {
		_classCallCheck(this, Board);

		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this.state = {
			pieces: []
		};
		return _this;
	}

	_createClass(Board, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var self = this;
			socket.on("game state", function (gameState) {
				var pieces = Object.values(gameState.pieces);
				self.setState({ pieces: pieces });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var pieces = this.state.pieces.map(function (piece) {
				return React.createElement(Piece, { color: piece.color, type: piece.piece, id: piece.id, x: piece.x, y: piece.y });
			});
			console.log(pieces);
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ style: { display: "inline-block", position: "relative", top: 0, left: 0 } },
					React.createElement("img", { className: "no-drag", src: "board.png", alt: "board", height: "800px", style: { position: "relative", top: 0, left: 0 } }),
					pieces
				)
			);
		}
	}]);

	return Board;
}(React.Component);

var domContainer = document.getElementById("board");
ReactDOM.render(React.createElement(Board, null), domContainer);