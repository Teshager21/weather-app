'use strict'

const fetchWeatherData=async(city)=>{
    const baseUrl='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const API_KEY="748MPM7WG568SVR2CHFVUGF23";
    const rawData= await fetch(`${baseUrl}${city}?key=${API_KEY}&contentType=json`);
    const parsedData= await rawData.json();
 return parsedData;
}

fetchWeatherData('bahirdar').then((data)=>{
    console.log(data.days[0].hours[0].conditions);
    console.log(data.days[0].hours[0].icon);
    console.log((data['days'].length));
});

const translateWeatherToGif=async (weather)=>{
 const baseUrl="https://api.giphy.com/v1/gifs/translate";
 const API_KEY="E03DHQa08uJqlEZKuJh8Jzlpnyq3D52f";
const url= `${baseUrl}?api_key=${API_KEY}&s=${weather}`;

 const rawData=await fetch(url);
 const parsedData= await rawData.json();
 return parsedData;

}

translateWeatherToGif('rain').then(urls=>{

    console.log(urls.data.url)});

