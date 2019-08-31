"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLeaflet = require("react-leaflet");

var _leaflet = require("leaflet");

var _streetview = require("./streetview.png");

var _streetview2 = _interopRequireDefault(_streetview);

var _streetviewclicked = require("./streetviewclicked.png");

var _streetviewclicked2 = _interopRequireDefault(_streetviewclicked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DumbControl = _leaflet.Control.extend({
  options: {
    className: "",
    onOff: "",
    handleOff: function noop() {}
  },

  onAdd: function onAdd() {
    var _controlDiv = _leaflet.DomUtil.create("div", this.options.className);
    _leaflet.DomEvent.disableClickPropagation(_controlDiv);
    return _controlDiv;
  },
  onRemove: function onRemove(map) {
    if (this.options.onOff) {
      map.off(this.options.onOff, this.options.handleOff, this);
    }

    return this;
  }
});

exports.default = (0, _reactLeaflet.withLeaflet)(function (_MapControl) {
  (0, _inherits3.default)(LeafletControl, _MapControl);

  function LeafletControl() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LeafletControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LeafletControl.__proto__ || (0, _getPrototypeOf2.default)(LeafletControl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      streetViewEnabled: false,
      src: _streetview2.default
    }, _this.buttonClicked = function (e) {
      var streetViewEnabled = _this.state.streetViewEnabled;

      _this.setState({
        streetViewEnabled: !streetViewEnabled,
        src: streetViewEnabled ? _streetview2.default : _streetviewclicked2.default
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LeafletControl, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      return new DumbControl((0, _assign2.default)({}, props));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get3.default)(LeafletControl.prototype.__proto__ || (0, _getPrototypeOf2.default)(LeafletControl.prototype), "componentDidMount", this).call(this);
      var mapref = this.props.mapref;

      this.forceUpdate();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.streetViewEnabled) return;
      var mapref = nextProps.mapref;
      var latlng = mapref.latlng;
      var lat = latlng.lat,
          lng = latlng.lng;

      var url = "http://maps.google.com/?cbll=" + lat + "," + lng + "&cbp=12,20.09,,0,5&layer=c";
      if (this.props.sameWindow) {
        window.open(url, "sameWindow");
      } else {
        window.open(url);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.leafletElement || !this.leafletElement.getContainer()) {
        return null;
      }
      return _reactDom2.default.createPortal(_react2.default.createElement("img", {
        onClick: this.buttonClicked,
        src: this.state.src,
        style: { color: "red" },
        height: "30px",
        width: true
      }), this.leafletElement.getContainer());
    }
  }]);
  return LeafletControl;
}(_reactLeaflet.MapControl));
