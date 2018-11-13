import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default class List extends React.Component {
  state = {

  }

  render = () => {
    return (
      <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
        <div>
          Testing
        </div>
      </Drawer>
    )
  }
}
