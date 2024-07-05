
const cityName = document.getElementById("city-name");
const card = document.getElementById("card");
const apiKey = `a959d5c79662d5ddb56a06782ca23177`;

function getWeatherEmoji(weatherid){

    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "🌩️";
        case (weatherid >= 300 && weatherid < 600):
            return "🌧️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case (weatherid === 800):
            return "🌞";
        case (weatherid >= 801 && weatherid < 810):
            return "☁️"
            
        
    }
}

async function getWeatherData(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`)
    if(!response.ok){
        throw new Error("Cannot fetch weather")
    }
    else{
        const data = await response.json();

        const tempDisplay = document.createElement("p");
        setTimeout(() => {
            tempDisplay.textContent = `${(data.main.temp - 273.15).toFixed(1)}°`;
            tempDisplay.classList.add("tempDisplay");
            card.appendChild(tempDisplay);
        }, 10);

        displayWeatherInfo(data);
    }

}
function displayWeatherInfo(data){

    const {name: city, main: temp, weather: [{description, id}]} = data;

    card.textContent = " ";

    card.style.display = "block";

    const cityDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    weatherEmoji.textContent = getWeatherEmoji(id);

    setTimeout(() => {
        const descDisplay = document.createElement("p");
        descDisplay.textContent = description.toUpperCase();
        descDisplay.classList.add("descDisplay");
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
    }, 15);

    cityDisplay.classList.add("cityDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    

}