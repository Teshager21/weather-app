'use strict'
import './style.css'
import loading from './assets/loading.gif'

const loadingGif = new Image();
loadingGif.src=loading;
loadingGif.classList.add('loading');
document.querySelector('.weather-gif').append(loadingGif);


const fetchWeatherData=async(city)=>{
    const baseUrl='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const API_KEY="748MPM7WG568SVR2CHFVUGF23";
    const rawData= await fetch(`${baseUrl}${city}?key=${API_KEY}&contentType=json`);
    const parsedData= await rawData.json();
 return parsedData;
}

fetchWeatherData('bahirdar').then((data)=>{
    console.log(data.days[0].hours[0].conditions);
    const iconUrl=data.days[0].hours[0].icon;
    return iconUrl;
}).then ((url)=>translateWeatherToGif(url)).then(urls=>{
    const weatherImg= document.createElement('iframe')
    weatherImg.src=urls.data.embed_url;
    document.querySelector('.weather-gif').innerHTML='';
    document.querySelector('.weather-gif').append(weatherImg);
})

const translateWeatherToGif=async (weather)=>{
 const baseUrl="https://api.giphy.com/v1/gifs/translate";
 const API_KEY="E03DHQa08uJqlEZKuJh8Jzlpnyq3D52f";
const url= `${baseUrl}?api_key=${API_KEY}&s=${weather}`;

 const rawData=await fetch(url);
 const parsedData= await rawData.json();
 return parsedData;

}




