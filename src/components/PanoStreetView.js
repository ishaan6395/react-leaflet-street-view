import React from "react";
import ReactDOM from "react-dom";
import { MapControl, withLeaflet } from "react-leaflet";
import { Control, DomUtil, DomEvent } from "leaflet";

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
      backgroundColor: "white"
    };
    createLeafletElement(props) {
      return new DumbControl(Object.assign({}, props));
    }

    componentDidMount() {
      super.componentDidMount();
      let { streetView } = this.props;
      this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
      if (!this.state.streetViewEnabled) return;
      const { streetView } = nextProps;
      const { latlng } = streetView;
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
        backgroundColor: streetViewEnabled ? "white" : "#F5F5F5"
      });
    };
    render() {
      if (!this.leafletElement || !this.leafletElement.getContainer()) {
        return null;
      }
      return ReactDOM.createPortal(
        (
          <div onClick={this.buttonClicked}>{this.props.children}</div> //If child is available render child
        ) || (
          <div //Else render default button
            style={{
              boxShadow: "1px 1px grey",
              padding: "3px",
              backgroundColor: this.state.backgroundColor,
              cursor: "pointer"
            }}
            onClick={this.buttonClicked}
          >
            Street View
          </div>
        ),
        this.leafletElement.getContainer()
      );
    }
  }
);
