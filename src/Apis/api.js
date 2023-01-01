import axios from 'axios'
export const getWeatherData=(latitude,longitude,timezone)=>{
    return axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=America%2FNew_York',{
        params:{
            latitude : latitude,
            longitude : longitude,
            timezone
        }
    }).then((res)=>{
        return {
            current:parseCurrent(res.data),
             daily:parseDaily(res.data),
             hourly:parseHourly(res.data)
        }
    })
}

const parseCurrent = ({current_weather,daily}) =>{
    const {
        temperature_2m_max:[highTemp],
        temperature_2m_min:[lowTemp],
        apparent_temperature_max:[flHigh],
        apparent_temperature_min:[flLow],
        precipitation_sum:[precip]
    }=daily
    return{
        temperature:Math.round(current_weather.temperature),
        icon:Math.round(current_weather.weathercode),
        wind:Math.round(current_weather.windspeed),
        highTemp:Math.round(highTemp),
        lowTemp:Math.round(lowTemp),
        flHigh:Math.round(flHigh),
        flLow:Math.round(flLow),
        precip:Math.round(precip*100)/100
    }
}

const parseDaily = ({daily}) =>{
    return daily.time.map((time,ind)=>{
        return{
            timeStamp:time*1000,
            icon:daily.weathercode[ind],
            temp:Math.round(daily.temperature_2m_max[ind])
        }
    })        
}

const parseHourly = ({hourly,current_weather})=>{
    return hourly.time.map((t,ind)=>{
        return {
        time:t*1000,
        icon:hourly.weathercode[ind],
        temp:Math.round(hourly.temperature_2m[ind]),
        flTemp:Math.round(hourly.apparent_temperature[ind]),
        wind:Math.round(hourly.windspeed_10m[ind]),
        precip:Math.round(hourly.precipitation[ind]*100)/100
    }
    }).filter(({time})=>time>=current_weather.time*1000)
}