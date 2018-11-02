import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    map: null,
    markers: [],
    markerProps: []
  }

  fetchPlaces = (mapProps, map) => {
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  updateMarkers = (locations) => {
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];

    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);

      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map
      });
      return marker;
    })

    this.setState({markers, markerProps});
  }

  render = () => {
    const style = {
      width: '100%',
      height: '100%'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    }

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.fetchPlaces}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_UFVqPw6ebSn8Xnjq0f0UFM5-aGsyHVE"
})(MapContainer)
