import React from 'react';
import MapStyle from './map-style';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.getWundergroundOverlay = this.getWundergroundOverlay.bind(this);
    this.defaultProps = {
      lat: 41.8721635,
      lng: -87.6448229,
    };
  }

  getWundergroundOverlay() {
    // TODO: break this out into a url builder class
    const baseUrl = "http://api.wunderground.com/api/057df3909da113cd/radar/image.png";
    const centerLat = `?centerlat=${this.defaultProps.lat}`;
    const centerLng = `&centerlon=${this.defaultProps.lng}`;
    const size = "&radius=15&width=2000&height=2000&newmaps=1&rainsnow=1&smooth=1"
    const url = `${baseUrl}${centerLat}${centerLng}${size}`;

    $(() => {
      $('#wunderground-map').css('background-image', `url(${url})`);
    });
  }

  componentDidMount() {
    this.getWundergroundOverlay();
  }

  render() {
    return (
      <div id="wunderground-map" className="wunderground-map"></div>
    );
  }
};

export default Map;
