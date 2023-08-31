import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [count, setCount] = useState(0);

  const [ipData, setIpData] = useState();

  const [weatherData, setWeatherData] = useState();

  const ipapi = 'https://ipapi.co/json/'
  const weatherapi = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchapi = async () => {
    console.log('Fetching ip')

    const res = await fetch(ipapi)
    console.log(res)

    const data = await res.json()
    console.log(data)

    setIpData(data)

  }

  async function featchWeatherData() {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API%20key}

    console.log('Fetching Weather Data')

    let url = `${weatherapi}?lat=${ipData.latitude}&lon=${ipData.longitude}&appid=${API_KEY}`
    console.log(url)

    const res = await fetch(url)
    console.log()

    const data = await res.json()
    console.log(data)


    setWeatherData(data)
  }

  return (
    <div>

      <h1>Just Weather ☀️</h1>

      <div>
        <div>
          <button onClick={fetchapi}>Fetch IP</button>
          <button disabled={ipData === undefined? true : false } onClick={featchWeatherData}>Fetch Weather</button>
        </div>
        <div>
          {
            ipData ? ipData.city : "no data yet"
          }
          <p>Latitude: {ipData?.latitude ?? "No Latitude"}</p>
          <p>Longitude: {ipData?.longitude ?? "No Longitude"}</p>
        </div>
        <div>
          <p>
            The humidity is: {weatherData?.main.humidity ?? "No humidity"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
