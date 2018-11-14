import React from 'react';

export default class NoMap extends React.Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show ? (<h1>Oops! We're having trouble loading the map</h1>) : (<h1>Loading map...</h1>)}
      </div>
    )
  }
}
