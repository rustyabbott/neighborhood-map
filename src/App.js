import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import Pins from './data/pins';
import List from './components/List';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  state = {
    lat: 27.1983121,
    lon: -80.256597,
    zoom: 16.5,
    pins: Pins,
    open: false,
    filtered: null,
    query: ""
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.pins, "")
    });
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }

  updateQuery = (query) => {
    this.setSate({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterlocations(this.state.pins, query)
    });
  }

  filterLocations = (pins, query) => {
    return pins.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  render() {
    return (
      <div className="App">
        <div>
          <Button variant="contained" color="primary" onClick={this.toggleDrawer}>
            Menu
          </Button>
          <h1>Stuart, FL</h1>
        </div>
        <MapContainer
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          pins={this.state.filtered}
        />
        <List
          pins={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    );
  }
}

export default App;
