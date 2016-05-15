import React from 'react';
import { Navigation } from 'react-router';
import Map from '../map/map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wind: 0,
      rain: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({wind: event.target.value});
    console.log('change');
  }

  handleSubmit() {
    console.log('submit');
    // Do some processing here
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <Map />
        <div className="col-sm-4 form-overlay">
          <h4>How does this work?</h4>
          <p>Set your limits below. We will tell you if you should unconventionally commute to work today.</p>
          <h4>Commute Preferences:</h4>
          <div className="form-group">
            <label className="sr-only" for="maximumWindSpeed">Pick Your Max Wind Speed</label>
            <div className="input-group">
              <div className="input-group-addon">Max Wind Speed:</div>
              <input type="text"
                     id="maximumWindSpeed"
                     className="form-control"
                     value={this.state.wind}
                     placeholder="20mph"
                     onChange={this.handleChange} />
              <div className="input-group-addon">mph</div>
            </div>
          </div>
          <button type="submit" className="btn btn-default form-overlay-submit-button">Should I bike to work?</button>
        </div>
      </form>
    );
  }
};

export default Home;
