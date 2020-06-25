import React from 'react';
import Form from './Form'
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country : '',
      weather : {
        temperature: '',
        weather_icons: '',
        wind_speed: '',
        precip: ''
      },
      countryData : {
        capital: '',
        population: 0,
        latlng: [],
        flag: ''
      }
    };
  }

  async getCapital() {
    fetch('https://restcountries.eu/rest/v2/name/' + this.state.country)
    .then((resp) => resp.json())
    .then(data => {
      let countryData = data[0];
      const newData = {
        capital: countryData.capital,
        population: countryData.population,
        latlng: countryData.latlng,
        flag: countryData.flag
      };
      this.setState({countryData : newData});
    })
    .catch(function(error){
      alert('Ooooooops!');
    });
  }

  handleChange(event) {
    this.setState({ country: event });
  }

  async showWeather() {
    fetch('http://api.weatherstack.com/current?access_key=bc91ad1e8fda79015aa21736d6691b34&query=' + this.state.countryData.capital)
    .then((resp) => resp.json())
    .then(data => {
      let countryData = data.current;
      const newData = {
        temperature : countryData.temperature,
        weather_icons : countryData.weather_icons,
        wind_speed : countryData.wind_speed,
        precip : countryData.precip
      };
      this.setState({weather : newData});
    })
    .catch(function(error){
      alert('Ooooooops!');
    });
  }

  render() {
    return (
      <div className="App">
          { !this.state.countryData.capital &&
          (<Form
            country={this.state.country}
            handleChange={(event) => this.handleChange(event)}
            getCapital={() => this.getCapital()}
          />)}
          {
            this.state.countryData.capital &&
            (
              <div>
                <div>capital : {this.state.countryData.capital}</div>
                <div>population : {this.state.countryData.population}</div>
                <div>latlng : {this.state.countryData.latlng}</div>
                <div>flag : <img height="90px" width="90px"
                                  src={this.state.countryData.flag} />
                </div>
                <input type="submit"
                       value="Capital Weather"
                       onClick={() => this.showWeather()}/>
              </div>
            )
          }
          {
            this.state.weather.temperature &&
            (
              <div>
                <div>temperature : {this.state.weather.temperature}</div>
                <div>weather_icons : <img height="90px" width="90px"
                                  src={this.state.weather.weather_icons[0]} />
                </div>
                <div>wind_speed : {this.state.weather.wind_speed}</div>
                <div>precip : {this.state.weather.precip}</div>
                <input type="submit"
                       value="Capital Weather"
                       onClick={() => this.showWeather()}/>
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
