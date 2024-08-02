'use strict'
import './style.css'
import loading from './assets/loading.gif'

let location='';

const loadingGif = new Image();
loadingGif.src=loading;
loadingGif.classList.add('loading');



const fetchWeatherData=async(city)=>{
    document.querySelector('.weather-gif').append(loadingGif);
    const baseUrl='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const API_KEY="748MPM7WG568SVR2CHFVUGF23";
    const rawData= await fetch(`${baseUrl}${city}?key=${API_KEY}&contentType=json`);
    const parsedData= await rawData.json();
 return parsedData;
}



const translateWeatherToGif=async (weather)=>{
 const baseUrl="https://api.giphy.com/v1/gifs/translate";
 const API_KEY="E03DHQa08uJqlEZKuJh8Jzlpnyq3D52f";
const url= `${baseUrl}?api_key=${API_KEY}&s=${weather}`;

 const rawData=await fetch(url);
 const parsedData= await rawData.json();
 return parsedData;

}


document.getElementById('searchBtn').addEventListener('click',()=>{
    location=document.getElementById('locationInput').value;
    fetchWeatherData(location).then((data)=>{
        console.log(data.days[0].hours[0].conditions);
        const iconUrl=data.days[0].hours[0].icon;
        return iconUrl;
    }).then ((url)=>translateWeatherToGif(url)).then(urls=>{
        const weatherImg= document.createElement('iframe')
        weatherImg.src=urls.data.embed_url;
        weatherImg.setAttribute('alt',urls.data.embed_url);
        const weatherGif= document.querySelector('.weather-gif');
        weatherGif.innerHTML='';
        weatherGif.append(weatherImg);
    })
})




