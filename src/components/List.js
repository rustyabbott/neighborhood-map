import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default class List extends React.Component {
  state = {
    query: ""
  }

  updateQuery = (newQuery) => {
    this.setState({ query: newQuery });
    this.props.filterLocations(newQuery);
  }

  render = () => {
    return (
      <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
        <div>
          <input
            type="text"
            name="filter"
            placeholder="Filter locations"
            onChange={ e => this.updateQuery(e.target.value) }
            value={this.state.query} />
          <ul>
            {this.props.pins && this.props.pins.map((location, index) => {
              return (
                <li key={index}>
                  <button key={index}>{location.name}</button>
                </li>
              )
            })}
          </ul>
        </div>
      </Drawer>
    )
  }
}
