import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';

class App extends React.Component {
  state = {
    lat: 27.1972222,
    lon: -80.2530556,
    zoom: 14
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
          zoom={this.state.zoom} />
      </div>
    );
  }
}

export default App;
