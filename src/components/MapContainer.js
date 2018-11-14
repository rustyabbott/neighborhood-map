import React from 'react';
import NoMap from './NoMap';
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

  componentWillReceiveProps = (props) => {
    if (this.state.markers.length !== props.pins.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.pins);
      this.setState({activeMarker: null});
      return;
    }

    if (!props.selectedIndex || (this.state.activeMarker && (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
      this.closeInfoWindow();
    }

    if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
      return;
    }

    this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

  fetchPlaces = (mapProps, map) => {
    this.setState({map});
    this.updateMarkers(this.props.pins);
  }

  getBusinessInfo = (props, data) => {
    return data
      .response
      .venues
      .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  onMarkerClick = (props, marker, e) => {
    // Foursquare API call
    let url = `https://api.foursquare.com/v2/venues/search?client_id=NYWFLPEYJGUGQD5FHYWVTLC52XHM25UBUHOMLU5H24IYH0J2&client_secret=223VZPKENS5DBED31SV5RBVR5ANUOUBBGHKWYRFQEQBPUMVI&v=20180323&radius=100&ll=${props.position.lat},${props.position.lng}`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    })

    let activeMarkerProps;
    fetch(request)
        .then(response => response.json())
        .then(result => {
          let restaurant = this.getBusinessInfo(props, result);
          activeMarkerProps = {
            ...props,
            foursquare: restaurant[0]
          };

          if (activeMarkerProps.foursquare) {
            let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=NYWFLPEYJGUGQD5FHYWVTLC52XHM25UBUHOMLU5H24IYH0J2&client_secret=223VZPKENS5DBED31SV5RBVR5ANUOUBBGHKWYRFQEQBPUMVI&v=20180323`;
            fetch(url)
              .then(response => response.json())
              .then(result => {
                activeMarkerProps = {
                  ...activeMarkerProps,
                  images: result.response.photos
                };
                if (this.state.activeMarker)
                  this.setState({
                    showingInfoWindow: true,
                    activeMarker: marker,
                    activeMarkerProps
                  });
              })
          } else {
            this.setState({
              showingInfoWindow: true,
              activeMarker: marker,
              activeMarkerProps
            })
          }
        })
        .catch(() => {
          console.log('No response');
        });

    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      activeMarkerProps
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
            <h3>{this.state.activeMarkerProps && this.state.activeMarkerProps.name}</h3>
            {this.state.activeMarkerProps && this.state.activeMarkerProps.images ? (
              <div>
                <img src={this.state.activeMarkerProps.images.items[0].prefix + "100x100" + this.state.activeMarkerProps.images.items[0].suffix} alt={this.state.activeMarkerProps.name} />
                <p>Photo from Foursquare</p>
              </div>
            ) : ""}
            <a href={this.state.activeMarkerProps && this.state.activeMarkerProps.url} target="_blank" rel="noopener noreferrer">Website</a>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_UFVqPw6ebSn8Xnjq0f0UFM5-aGsyHVE", LoadingContainer: NoMap
})(MapContainer)
