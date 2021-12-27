var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Piece = function (_React$Component) {
	_inherits(Piece, _React$Component);

	function Piece(props) {
		_classCallCheck(this, Piece);

		return _possibleConstructorReturn(this, (Piece.__proto__ || Object.getPrototypeOf(Piece)).call(this, props));
	}

	_createClass(Piece, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$(ReactDOM.findDOMNode(this)).draggable({
				containment: "parent",
				stop: function stop(event) {
					var offset = $(this).offset();
					var top = Math.round(offset.top / 100) * 100;
					var left = Math.round(offset.left / 100) * 100;
					$(this).css({ top: top, left: left });
					socket.emit("release", { id: event.target.id, x: left / 100, y: top / 100 });
				}
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement("img", { className: "piece", id: this.props.id, src: this.props.type + "_" + this.props.color + ".png", alt: "piece",
				height: "100px", style: { position: "absolute", top: this.props.y * 100, left: this.props.x * 100 } });
		}
	}]);

	return Piece;
}(React.Component);