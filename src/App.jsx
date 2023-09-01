import { useEffect, useState } from 'react'

/**
 * @typedef {Object} Coordinates
 * @property {number} lon - City geo location, longitude
 * @property {number} lat - City geo location, latitude
 */

/**
 * @typedef {Object} Weather
 * @property {number} id - Weather condition id
 * @property {string} main - Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {string} description - Weather condition within the group
 * @property {string} icon - Weather icon id
 */

/**
 * @typedef {Object} Main
 * @property {number} temp - Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
 * @property {number} feels_like - Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
 * @property {number} temp_min - Minimum temperature at the moment of calculation. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
 * @property {number} temp_max - Maximum temperature at the moment of calculation. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
 * @property {number} pressure - Atmospheric pressure on the sea level, hPa
 * @property {number} humidity - Humidity, %
 */

/**
 * @typedef {Object} Wind
 * @property {number} speed - Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
 * @property {number} deg - Wind direction, degrees (meteorological)
 */

/**
 * @typedef {Object} Clouds
 * @property {number} all - Cloudiness, %
 */

/**
 * @typedef {Object} Sys
 * @property {number} type - Internal parameter
 * @property {number} id - Internal parameter
 * @property {string} country - Country code (GB, JP etc.)
 * @property {number} sunrise - Sunrise time, unix, UTC
 * @property {number} sunset - Sunset time, unix, UTC
 */

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} WeatherResponse
 * @property {Coordinates} coord -
 * @property {Weather[]} weather -
 * @property {string} base - Internal parameter
 * @property {Main} main -
 * @property {number} visibility - Visibility, meter. The maximum value of the visibility is 10 km
 * @property {Wind} wind -
 * @property {Clouds} clouds -
 * @property {number} dt - Time of data calculation, unix, UTC
 * @property {Sys} sys -
 * @property {number} timezone - Shift in seconds from UTC
 * @property {number} id -  City ID
 * @property {string} name - City name
 * @property {number} cod - Internal parameter
 */

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const ipapi = 'https://ipapi.co/json/'
const weatherapi = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [ipData, setIpData] = useState()
  const [weatherData, setWeatherData] = useState(
    /** @type {WeatherResponse} */ (null)
  )

  // This will run once when the page loads
  // Get the user's IP Info and set it to ipData state variable
  useEffect(() => {
    // get the user's IP Information
    /**
     * Fetch client's location information using their IP Address
     * @see https://ipapi.co/api/#introduction
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     */
    const fetchapi = async () => {
      console.log('Fetching ip')

      const res = await fetch(ipapi)
      console.log(res)

      const data = await res.json()
      console.log(data)

      setIpData(data)
    }

    fetchapi()
  }, []) // empty dependency array means run once when page loads

  // This will run anytime the ipData state variable changes
  // If ipData is defined, call the fetchWeatherData function and
  // set the response to weatherData state variable
  useEffect(() => {
    async function fetchWeatherData() {
      console.log('Fetching Weather Data')

      // TODO: use imperial units for the api call
      let url = `${weatherapi}?lat=${ipData.latitude}&lon=${ipData.longitude}&appid=${API_KEY}&units=imperial`
      console.log(url)

      const res = await fetch(url)

      const data = await res.json()
      console.log(data)

      setWeatherData(data)
    }
    if (ipData) {
      fetchWeatherData()
    }
  }, [ipData])

  /**
   * Convert a temperature from Kelvin to Fahrenheit
   * @param {Number} temp - the temperature to convert
   * @returns {Number | undefined} - the converted temperature
   */

  return (
    <div>
      <h1>Just Weather ☀️</h1>

      <div>
        <div>
          {ipData ? ipData.city : 'no data yet'}

          <p>Latitude: {ipData?.latitude ?? 'No Latitude'}</p>
          <p>Longitude: {ipData?.longitude ?? 'No Longitude'}</p>
          <img src={weatherData?.weather[0]?.icon
              ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
              : null}/>
          <p>Description: {weatherData?.weather[0]?.description ?? 'No Data'}</p>
        </div>

        <div>
          <p>Humidity: {weatherData?.main.humidity ?? 'No Humidity'}</p>
          <p>
            Temperature:{' '}
            {weatherData?.main?.temp
              ? `${weatherData?.main?.temp.toFixed(0)}°F`
              : 'No Tempurature'}
          </p>
          {weatherData ? (
            <pre>
              <code>{JSON.stringify(weatherData, null, 2)}</code>
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
