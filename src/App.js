import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import Pins from './data/pins';
import List from './components/List';

class App extends React.Component {
  state = {
    lat: 27.1983121,
    lon: -80.256597,
    zoom: 16.5,
    pins: Pins,
    open: true
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
        <List
          pins={this.state.pins}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default App;
