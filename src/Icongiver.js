import { faCloud, faCloudBolt, faCloudShowersHeavy, faCloudSun, faSmog, faSnowflake, faSun } from "@fortawesome/free-solid-svg-icons"

export const ICON_MAP=new Map()


const addMapping=(values,icon) =>{
    values.forEach((value)=>
        ICON_MAP.set(value,icon))
}

addMapping([0,1],faSun)
addMapping([2],faCloudSun)
addMapping([3],faCloud)
addMapping([45,48],faSmog)
addMapping([51,53,55,56,57,61,63,65,66,67,80,81,82],faCloudShowersHeavy)
addMapping([71,73,75,77,85,86],faSnowflake)
addMapping([95,96,99],faCloudBolt)