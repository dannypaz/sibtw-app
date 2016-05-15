import React from 'react';
import MapStyle from './map-style';
import GoogleMap from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.getWundergroundOverlay = this.getWundergroundOverlay.bind(this);
    this.getLiveOverlay = this.getLiveOverlay.bind(this);
    this.defaultProps = {
      center: {lat: 41.8721635, lng: -87.6448229},
      zoom: 12,
      apiKey: {
        key: 'AIzaSyAjRa7IuDiJofPtllAUnq6G5oWiyB80h7M',
      },
      options: {
        styles: MapStyle,
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
      }
    };

  }

  getWundergroundOverlay() {
    // TODO: break this out into a url builder class
    const baseUrl = "http://api.wunderground.com/api/057df3909da113cd/radar/image.png";
    const centerLat = `?centerlat=${this.defaultProps.center.lat}`;
    const centerLng = `&centerlon=${this.defaultProps.center.lng}`;
    const size = "&radius=15&width=2000&height=2000&newmaps=0&rainsnow=1&smooth=1"
    const url = `${baseUrl}${centerLat}${centerLng}${size}`;

    $(() => {
      $('#wunderground-map').css('background-image', `url(${url})`);
    });
  }

  getLiveOverlay() {
  }

  componentDidMount() {
    this.getWundergroundOverlay();
  }

  render() {
    return (
      <div id="map-wrapper" className="map-wrapper">
        <div id="map" className="map">
          <GoogleMap
            bootstrapURLKeys={this.defaultProps.apiKey}
            defaultCenter={this.defaultProps.center}
            defaultZoom={this.defaultProps.zoom}
            options={this.defaultProps.options}>
          </GoogleMap>
        </div>
        <div id="wunderground-map" className="wunderground-map"></div>
      </div>
    );
  }
};

export default Map;
