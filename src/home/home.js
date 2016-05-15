import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadFromServer() {
    console.log('loaded things from server');
  }

  componentDidMount() {
    this.loadFromServer();
    console.log('loaded');
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log('change');
  }

  handleSubmit() {
    console.log('submit');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Lets Start!</h1>
        <input type="text"
               value={this.state.value}
               placeholder="Your zipcode"
               onChange={this.handleChange} />
        <button type="submit" className="btn btn-default">Submit</button>
      </div>
    );
  }
};

export default Home;
