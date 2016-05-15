import React from 'react';
import Home from '../../home/home';

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children || <Home />}
      </div>
    );
  }
}

export default DefaultLayout;
