import React from "react";
import ReactDOM from "react-dom";
import { MapControl, withLeaflet } from "react-leaflet";
import { Control, DomUtil, DomEvent } from "leaflet";
import img from "./streetview.png";
import imgClicked from "./streetviewclicked.png";
const DumbControl = Control.extend({
  options: {
    className: "",
    onOff: "",
    handleOff: function noop() {}
  },

  onAdd() {
    var _controlDiv = DomUtil.create("div", this.options.className);
    DomEvent.disableClickPropagation(_controlDiv);
    return _controlDiv;
  },

  onRemove(map) {
    if (this.options.onOff) {
      map.off(this.options.onOff, this.options.handleOff, this);
    }

    return this;
  }
});

export default withLeaflet(
  class LeafletControl extends MapControl {
    state = {
      streetViewEnabled: false,
      src: img
    };
    createLeafletElement(props) {
      return new DumbControl(Object.assign({}, props));
    }

    componentDidMount() {
      super.componentDidMount();
      let { mapref } = this.props;
      this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
      if (!this.state.streetViewEnabled) return;
      const { mapref } = nextProps;
      const { latlng } = mapref;
      const { lat, lng } = latlng;
      const url = `http://maps.google.com/?cbll=${lat},${lng}&cbp=12,20.09,,0,5&layer=c`;
      if (this.props.sameWindow) {
        window.open(url, "sameWindow");
      } else {
        window.open(url);
      }
    }

    buttonClicked = e => {
      const { streetViewEnabled } = this.state;
      this.setState({
        streetViewEnabled: !streetViewEnabled,
        src: streetViewEnabled ? img : imgClicked
      });
    };
    render() {
      if (!this.leafletElement || !this.leafletElement.getContainer()) {
        return null;
      }
      return ReactDOM.createPortal(
        <img
          onClick={this.buttonClicked}
          src={this.state.src}
          style={{ color: "red" }}
          height="30px"
          width
        />,
        this.leafletElement.getContainer()
      );
    }
  }
);
