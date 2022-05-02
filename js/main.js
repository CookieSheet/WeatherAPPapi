// Get Data from Weather API
const getData = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a57a06cc038dbc5c0f3735528581d1c`);
    return response.data;
};
// ADD insertion points for Elements
const DOM_Elements = {
    highTemperature: '.highTemperature',
    lowTemperature: '.lowTemperature',
    humidity: '.humidity',
    forecast: '.forecast'
};
// Inject the HTML into the index through insertAdjacentHTML and call tempConversion function
const displayTemp = (highTemp, lowTemp, humid, fore) => {
    newHighTemp = tempConversion(highTemp);
    newLowTemp = tempConversion(lowTemp);

    const html1 = `<li class="list-group-item">${newHighTemp} °F</li>`;
    const html2 = `<li class="list-group-item">${newLowTemp} °F</li>`;
    const html3 = `<li class="list-group-item">${humid}%</li>`;
    const html4 = `<li class="list-group-item">The forecast is likely to be ${fore}.</li>`;

    document.querySelector(DOM_Elements.highTemperature).insertAdjacentHTML('beforeend', html1);
    document.querySelector(DOM_Elements.lowTemperature).insertAdjacentHTML('beforeend', html2);
    document.querySelector(DOM_Elements.humidity).insertAdjacentHTML('beforeend', html3);
    document.querySelector(DOM_Elements.forecast).insertAdjacentHTML('beforeend', html4);
}
// Gather data and call displayTemp function
const loadData = async (city) => {
    clearData();
    const temperatureData = await getData(city);
    
    displayTemp(temperatureData.main.temp_max, temperatureData.main.temp_min, temperatureData.main.humidity, temperatureData.weather[0].description);
};
// Convert from kelvin to farenheit
const tempConversion = (temp) => {
    newTemp = (temp - 273.15) * 9/5 +32;
    newTemp = Math.trunc(newTemp);
    return newTemp;
}; 
// Clear Data and replace with Empty String
const clearData = () => {
    document.querySelector(DOM_Elements.highTemperature).innerHTML = '';
    document.querySelector(DOM_Elements.lowTemperature).innerHTML = '';
    document.querySelector(DOM_Elements.humidity).innerHTML = '';
    document.querySelector(DOM_Elements.forecast).innerHTML = '';


};
