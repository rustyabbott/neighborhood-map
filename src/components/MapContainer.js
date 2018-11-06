import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  }

  fetchPlaces = (mapProps, map) => {
    this.setState({map});
    this.updateMarkers(this.props.pins);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      activeMarkerProps: props
    });
  }

  closeInfoWindow = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    })
  }

  updateMarkers = (pins) => {
    this.state.markers.forEach(marker => marker.setMap(null));
    let markerProps = [];
    let markers = pins.map((location, index) => {
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
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null);
      })
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
        initialCenter={center}
        onClick={this.closeInfoWindow}>

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            Testing InfoWindow
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_UFVqPw6ebSn8Xnjq0f0UFM5-aGsyHVE"
})(MapContainer)
