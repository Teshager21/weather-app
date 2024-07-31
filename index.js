'use strict'

const fetchWeatherData=async(city)=>{
 const rawData= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=748MPM7WG568SVR2CHFVUGF23&contentType=json`);
 const parsedData= await rawData.json();
 return parsedData;
}

fetchWeatherData('bahirdar').then((data)=>{
    console.log(data.days[0].hours[0].conditions);
    console.log(data.days[0].hours[0].icon);
    console.log((data['days'].length));
});