import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default class List extends React.Component {
  state = {
    open: false,
    query: ""
  }

  updateQuery = (newQuery) => {
    this.setState({ query: newQuery });
    this.props.filterLocations(newQuery);
  }

  render = () => {
    return (
      <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
        <section className="side-panel">
          <h2>Search</h2>
          <input
            type="text"
            name="filter"
            placeholder="Filter locations"
            aria-label="Filter locations"
            onChange={ e => this.updateQuery(e.target.value) }
            value={this.state.query}
            className="input-field" />
            <h2>or Select One</h2>
          <ul>
            {this.props.pins && this.props.pins.map((location, index) => {
              return (
                <li key={index} aria-label={location.name}>
                  <button key={index} onClick={e => this.props.clickButton(index)}>{location.name}</button>
                </li>
              )
            })}
          </ul>
        </section>
      </Drawer>
    )
  }
}
