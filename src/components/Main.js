import React, { Component, Fragment } from "react";
import { Map, TileLayer } from "react-leaflet";
import PanoStreetView from "./PanoStreetView";

class Main extends Component {
  state = {
    streetView: null
  };
  render() {
    return (
      <Fragment>
        <Map
          onClick={e => this.setState({ streetView: e })}
          style={{ height: "700px", width: "700px", border: "0px" }}
          center={[32, -96]}
          zoom={6}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <PanoStreetView
            streetView={this.state.streetView}
            position="bottomright"
          ></PanoStreetView>
        </Map>
      </Fragment>
    );
  }
}
export default Main;
