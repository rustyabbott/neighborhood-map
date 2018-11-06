import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import Pins from './data/pins';

class App extends React.Component {
  state = {
    lat: 27.1983121,
    lon: -80.256597,
    zoom: 16.5,
    pins: Pins
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Stuart, FL</h1>
        </div>
        <MapContainer
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          pins={this.state.pins}
        />
      </div>
    );
  }
}

export default App;
