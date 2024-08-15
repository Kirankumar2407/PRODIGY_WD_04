import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import axios from 'axios'
import search from '../Assets/search.png'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import mist from '../Assets/mist.png'
import humidity from '../Assets/humidity.png'

const Weather = () => {
    // const inputRef = useRef();
    const [weatherdata, setWeatherData] = useState(false);
    const [city,setCity] = useState('');

    const allIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "50n":mist,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }

    const searchweather = async ()=>{
        if(city === "") {
            alert("Enter City Name");
            return;
        }

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d575a3bc83dc585aaff9d3c89b8c6da2`)
        .then(data => {
            console.log(data.data);
            const icon = allIcons[data.data.weather[0].icon];
            setWeatherData({
                    humidity: data.data.main.humidity,
                    windSpeed: data.data.wind.speed,
                    temperature: Math.floor(data.data.main.temp),
                    location:data.data.name,
                    icon: icon
                })
        })      
        .catch((err) => console.log(err))

    }

    // useEffect(() => {
    //     search("London");
    // },[])

  return (
    <div className="container">
        <h1 className='title'>Weather App</h1>
    <div className='weather'>
        <div className="search_bar">
            <input value={city} type="text" placeholder='Search' onChange={(e)=>{setCity(e.target.value)}}/>
            <img src={search} alt="" onClick={searchweather}/>
        </div>
        {weatherdata?<>
            <img src={weatherdata.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherdata.temperature}℃</p>
        <p className='location'>{weatherdata.location}</p>
        <div className="weather-data">
            <div className="col" >
                <img src = {humidity} alt=""/>
                <div>
                    <p>{weatherdata.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src = {wind} alt=""/>
                <div>
                    <p>{weatherdata.windSpeed} km/h</p>
                    <span>Wind speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
    </div>
  )
}

export default Weather;
