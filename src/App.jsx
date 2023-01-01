import { Container, Stack } from 'react-bootstrap'
import './App.css'
import {DayCard} from "./Components/DayCard"
import {HourCard} from "./Components/HourCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons' 
import {getWeatherData} from "./Apis/api"
import { useEffect, useState } from 'react'
import {ICON_MAP} from './Icongiver'
function App() {
  const [pageData,setPageData]=useState([{}]);
  const [cords,setCords]=useState({latitude:0,longitude:0});
  navigator.geolocation.getCurrentPosition(()=>setCords({latitude:coords.latitude,longitude:coords.longitude}),posFailure)
  function posFailure({coords}){
    alert("There was an error getting the location.Allow to use the location")
  }
  useEffect(()=>{
    getWeatherData(cords.latitude,cords.longitude,Intl.DateTimeFormat().resolvedOptions().timeZone).then((res)=>{
      setPageData(res)
    })
  },[cords])
  const Day_formatter = new Intl.DateTimeFormat(undefined,{weekday:"long"})
  var current = pageData.current;
  var daily = pageData.daily;
  var hourly=pageData.hourly;
  return (
  <div className='body p-0'>
    <Container className='header'>
      <div className='d-flex'>
        <div>
        <FontAwesomeIcon icon={ICON_MAP.get(current?.icon)} className="header-icon"/>
        </div>
        <div>
          <span data-current-temp>{current?.temperature}</span>&deg;C
        </div>
      </div>
      <div className='d-grid'>
        <div>
          <p className="label">HIGH</p>
          <p>{current?.highTemp}&deg;C</p>
        </div>
        <div>          
          <p className="label">FL HIGH</p>
          <p>{current?.lowTemp}&deg;C</p>
          </div>
        <div>          
          <p className="label">WIND</p>
          <p>{current?.wind}mph</p>
          </div>
        <div>          
          <p className="label">LOW</p>
          <p>{current?.lowTemp}&deg;C</p>
          </div>
        <div>          
          <p className="label">FL LOW</p>
          <p>{current?.flLow}&deg;C</p>
          </div>
        <div>          
          <p className="label">PRECIP</p>
          <p>{current?.precip}in</p>
          </div>
      </div>
    </Container>
    <Container className="day" data-day>
     {daily?.map((day,i)=>{
      return  <DayCard
      icon={ICON_MAP.get(day.icon)}
      key={i}
      day={Day_formatter.format(day.timeStamp)}
      temp={day.temp}
      />
      })}

    </Container>
    <Container className='hour'>
      <HourCard
      hourData={hourly}
      />

    </Container>
  </div>
  )
}

export default App
