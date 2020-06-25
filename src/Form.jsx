import React from 'react';


class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handle(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <div className="App">
          <input type="text"
                placeholder="Enter country"
                value={this.props.country}
                onChange={(event) => this.handle(event)}/>
          <input type="submit"
                  disabled={!this.props.country.length}
                  onClick={() => this.props.getCapital()}
          />
      </div>
    );
  }
}

export default Form;
