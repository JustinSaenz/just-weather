import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [ipData, setIpData] = useState();

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

  const increment = () => {
    console.log('Increment the value of count')
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    console.log("Decrement this value")
    setCount((prev) => prev - 1)
  }

  return (
    <div>

      <h1>Hello World!</h1>

      <div>
        The count is {count}
        <div>
          <button onClick={() => setCount(prev => prev + 1)} >Add 1</button>
          <button onClick={increment}>Increment</button>
          <button onClick={fetchapi}>call fetch function we just created</button>
        </div>
        <div>
          {
            ipData ? ipData.city : "no data yet"
          }
          <p>Latitude: {ipData?.latitude ?? "No Latitude"}</p>
          <p>Longitude: {ipData?.longitude ?? "No Longitude"}</p>
        </div>
      </div>
    </div>
  )
}

export default App
