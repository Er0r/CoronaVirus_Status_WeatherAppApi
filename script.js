const hdtext = document.querySelector('.header');
const submitBtn = document.querySelector('.add__btn');
const numberbox = document.querySelector('.country_code');
const shwResult = document.querySelector('.rslt');
const shwResultWe = document.querySelector('.rslt4');
const countrybox = document.querySelector('.city_code');
hdtext.textContent = `Hey There ! Use Country Code to View Weather Alert and CoronaVirus Status`;

/*
function getWeather(woeid){
    fetch( `https://www.metaweather.com/api/location/${woeid}/`)
    .then(result =>{
        // console.log(result);
        return result.json();
    })
    .then(data => {
            // console.log(data);
    })
    .catch(er => console.log(er));
}
*/

async function getWeatherAW(conName) {
    try {
        const woID = await fetch(`https://www.metaweather.com/api/location/search/?query=${conName}`);
        const datawo = await woID.json();

        console.log(datawo);
        const woid = datawo[0].woeid;
        // console.log(woid);

        const resultProp = await fetch(`https://www.metaweather.com/api/location/${woid}/`);
        const data = await resultProp.json();
        const today = data.consolidated_weather[0];
        const tomorrow = data.consolidated_weather[1];
        var temptoday,temptomorrow;
        temptoday = `Temperature Today in ${data.title} stay between ${today.min_temp} and ${today.max_temp} and Weather Status: ${today.weather_state_name}.`;
        temptomorrow = `Temperature Tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp} and Weather Status: ${tomorrow.weather_state_name}.`;
        shwResultWe.textContent = temptoday + ' ' +  temptomorrow;
    } catch(error) {
        // alert(error);
    }

}

async function getCoronaVirusUpdateBD(countryName) {
    const result = await fetch("https://api.covid19api.com/summary");
    const data = await result.json();
    // console.log(data.Countries);
    for(country of data.Countries) {
            if(countryName === country.Country) {
                console.log(countryName);
                console.log(country.Country);
                var cononaResult = `Total Confirmed Covid-19 Positive: ${country.TotalConfirmed} And New Confirmed: ${country.NewConfirmed} in ${countryName} `;
                shwResult.textContent = cononaResult;
                break;
            } 
    }
}


// getWeatherAW(2487956);
// getWeatherAW(44418);
// getWeatherAW(1915035);
// getCoronaVirusUpdateBD();

submitBtn.addEventListener('click',function() {
    // console.log('Button Is Clicked');
    const countryName = numberbox.value;
    const cityName = countrybox.value;
    // console.log(countryCode);
    // console.log(cityName);
    getWeatherAW(countryName);
    getCoronaVirusUpdateBD(cityName);
});
