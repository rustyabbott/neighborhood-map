import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import Pins from './data/pins';
import List from './components/List';
import Button from '@material-ui/core/Button';

// Thank you to Doug Brown for an excellent walk-through https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
class App extends React.Component {
  state = {
    lat: 27.1983121,
    lon: -80.256597,
    zoom: 16.5,
    pins: Pins,
    open: false,
    filtered: null,
    selectedIndex: null,
    mapScriptAvailable: true
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
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.pins, query)
    });
  }

  filterLocations = (pins, query) => {
    return pins.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickButton = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open });
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
          clickButton={this.clickButton}
        />
        <List
          pins={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}
          clickButton={this.clickButton}
        />
      </div>
    );
  }
}

export default App;
