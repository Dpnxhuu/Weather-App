console.log("hello")
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click",()=>{
    
    const APIKey = "d61ea63f95bb1f6bee216de4c9d8e8d1";
    const city = document.querySelector(".search-box input").value;

    if(city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{

        console.log(json);

        const image = document.querySelector('.weather-box img');
        const temprature = document.querySelector('.weather-box .temprature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch(json.weather[0].main){
            case 'Clear':
                image.src = './images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;
            
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            
            case 'Clouds': 
                image.src = './images/cloud.png';
                break;
            
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            
            default:
                image.src = 'images/cloud.png';
        }

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});


    // const APIKey = "d61ea63f95bb1f6bee216de4c9d8e8d1";
    // const city = "Meerut";
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
    // const responseJson = await response.json();
    // console.log(responseJson);