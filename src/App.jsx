import { useEffect, useState } from 'react'
// import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const ipapi = 'https://ipapi.co/json/'
const weatherapi = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [ipData, setIpData] = useState()
  const [weatherData, setWeatherData] = useState()

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
      let url = `${weatherapi}?lat=${ipData.latitude}&lon=${ipData.longitude}&appid=${API_KEY}`
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
  function convertKelvin(temp) {
    if (temp) {
      const f = (temp - 273.15) * (9 / 5) + 32
      return f.toFixed(0)
    }
  }

  return (
    <div>
      <h1>Just Weather ☀️</h1>

      <div>
        <div>
          {ipData ? ipData.city : 'no data yet'}

          <p>Latitude: {ipData?.latitude ?? 'No Latitude'}</p>
          <p>Longitude: {ipData?.longitude ?? 'No Longitude'}</p>
        </div>

        <div>
          <p>Humidity: {weatherData?.main.humidity ?? 'No Humidity'}</p>
          <p>
            Temperature:{' '}
            {weatherData?.main?.temp
              ? `${convertKelvin(weatherData?.main?.temp)}°F`
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
