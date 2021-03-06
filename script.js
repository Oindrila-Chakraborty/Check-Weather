const api=
{
    key:"0b01adbe704feb418a5a2e72236fd26e",
    baseurl:"https://api.openweathermap.org"
};
window.addEventListener('resize', () => { 
    document.querySelector(':root').style
      .setProperty('--vh', window.innerHeight/100 + 'px');
  })

const searchbox=document.querySelector('.search-box');
window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition
        (position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            fetch(`${api.baseurl}/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
            .then(weather =>{
            return weather.json();
            })
            .then(displayResults);
            })
     }
});

searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode == 13)
    {
        getResults(searchbox.value);
    }
}
function getResults(query){
fetch(`${api.baseurl}/data/2.5/weather?q=${query}&units=metric&APPID=${api.key}`)
.then(weather =>{
    return weather.json();
})
.then(displayResults);
}
function displayResults(weather)
{
    let city=document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now= new Date()
    let date=document.querySelector('.location .date');
    date.innerText= dateBuilder(now);
    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;
    let weather_el=document.querySelector('.current .climate .weather');
    weather_el.innerText = `${weather.weather[0].main}`;
    let desc=document.querySelector('.current .climate .description');
    var tempvariable=`${weather.weather[0].icon}`;
    str1=" http://openweathermap.org/img/wn/";
    str2="@2x.png";
    link=str1+tempvariable+str2;
    desc.src= link;
    let highlow = document.querySelector(".high-low");
    if(`${weather.main.temp_min}`==`${weather.main.temp_max}`)
    {
        highlow.innerText="" 
    }
    else
    {
    highlow.innerText =`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    }

}


function dateBuilder(d) {
    let months=["January" ,"February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

}






