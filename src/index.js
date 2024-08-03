'use strict'
import './style.css'
import loading from './assets/loading.gif'

let location='';                    
const locationInput= document.getElementById('locationInput');
const suggestionsList=document.querySelector('.suggestions');
const resolvedAddress= document.getElementById('resolvedAddress');
const details=document.createElement('ul');
details.classList.add('details');
const API_KEY="E03DHQa08uJqlEZKuJh8Jzlpnyq3D52f";
let weatherCondition='';
let weatherDescription='';
let allLocationNames=[];
const loadingGif = new Image();
loadingGif.src=loading;
loadingGif.classList.add('loading');

suggestionsList.addEventListener('click',(e)=>{
    if(e.target.nodeName==='LI') {
        locationInput.value=e.target.textContent;
        suggestionsList.innerHTML='';
        serveWeatherData(locationInput.value);
        location=locationInput.value;
    }
})

const fetchWeatherData=async(city)=>{
    document.querySelector('.weather-gif').innerHTML='';
    document.querySelector('.weather-gif').append(loadingGif)   ;
    const baseUrl='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const API_KEY="748MPM7WG568SVR2CHFVUGF23";
    const rawData= await fetch(`${baseUrl}${city}?key=${API_KEY}&contentType=json`);
    const parsedData= await rawData.json();
 return parsedData;
}



const translateWeatherToGif=async (weather)=>{
 const baseUrl="https://api.giphy.com/v1/gifs/translate";

const url= `${baseUrl}?api_key=${API_KEY}&s=${weather}weather`;

 const rawData=await fetch(url);
 const parsedData= await rawData.json();
 return parsedData;

}


document.getElementById('searchBtn').addEventListener('click',()=>serveWeatherData(locationInput.value));

const serveWeatherData=(location)=>{
    // location=locationInput.value;
    console.log('location is',location);
    fetchWeatherData(location)
        .then((data)=>grabUrlFromWeatherData(data))
        .then ((url)=>translateWeatherToGif(url))
        .then((urls)=>displayWeatherData(urls))
        .catch(error=>console.error('HERE GOES',error));
}

const grabUrlFromWeatherData=(data)=>{
    details.innerHTML='';
    const temprature= document.createElement('li');
    const humidity= document.createElement('li');
    const precipitation= document.createElement('li');
    temprature.textContent='Temprature: ' + data.currentConditions.temp;
    humidity.textContent='Humidity: ' + data.currentConditions.humidity;
    precipitation.textContent='Precipitation: ' + data.currentConditions.precip;
    resolvedAddress.textContent=data.resolvedAddress;
    weatherCondition=data.currentConditions.conditions;
    weatherDescription=data.description;
    const iconUrl=data.days[0].hours[0].icon;
    details.append(temprature,humidity,precipitation);
    return iconUrl;   
}

const displayWeatherData=(urls)=>{
    const weatherImg= document.createElement('iframe');
    weatherImg.src=urls.data.embed_url;
    weatherImg.setAttribute('alt',urls.data.embed_url);
    const weatherGif= document.querySelector('.weather-gif');
    weatherGif.innerHTML='';
    weatherGif.append(weatherImg);
    const conditionHeading= document.createElement('h2');
    const description=document.createElement('small');
    description.textContent=weatherDescription;
    conditionHeading.textContent=`The weather in ${location} is ${weatherCondition}`;
    weatherGif.append(conditionHeading,description,details);  
}
const fetchAllLocationNames=async()=>{
 const locations= await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
 const locationsParsed= await locations.json();
 const locationNames=[];
 for(let location of locationsParsed){
    locationNames.push(location.city);
 }
 return locationNames;

}

allLocationNames=await fetchAllLocationNames();
locationInput.addEventListener('keyup',(e)=>handleSeachEvent(e));

const handleSeachEvent=(e)=>{    
    if(allLocationNames) {displaySuggestionItems(allLocationNames,e.target.value)}
    else fetchAllLocationNames().then(locations=>displaySuggestionItems(locations));  
}

const displaySuggestionItems=(locations,searchString)=>{
    const filteredLocationNames=filterLocations(locations,searchString);
    suggestionsList.innerHTML='';
    filteredLocationNames.map(location=>{
        const locationItem= document.createElement("li");
        locationItem.textContent=location;
        suggestionsList.append(locationItem);

    })
}

const filterLocations=(locations,subString)=>{
const regex=new RegExp(`^${subString}`,'gi');
const filteredLocationNames=locations.filter(location=>regex.test(location));
return filteredLocationNames;
}
/**************************************************************************************
 *                                     GEO-LOCATION
 * *************************************************************************************/

const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        getCityName(position);
    });     
}
// let currentCity='';
const getCityName=async (position)=>{
const longitude= position.coords.longitude;
const latitude= position.coords.latitude;
const url =`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
 const rawData= await fetch(url);
 const parsedData= await rawData.json();
 location=parsedData.city;
 serveWeatherData(location);
 console.log('city name',location);
}


// getCityName(37.42159,-122.0837);
getCurrentLocation();
// serveWeatherData(currentCity);



