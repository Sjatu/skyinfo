console.log('Client side javascript file is loaded!')

const weatherForm = document.getElementById('wForm')
const search = document.getElementById('searchInp')
const placeName = document.getElementById('placeName')
const address = document.getElementById('address')
const summary = document.getElementById('summary')
const rain = document.getElementById('rain')
const temp = document.getElementById('temp')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const windSpeed = document.getElementById('windSpeed')
const tempMin = document.getElementById('tempMin')
const tempMax = document.getElementById('tempMax')
const errorMsg = document.getElementById('errorMsg')
const icon = document.getElementById('icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    errorMsg.textContent = 'Loading...'
    // address.textContent = ''
    // summary.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMsg.textContent = data.error
            } else {
                errorMsg.textContent = ' '
                if (data.icon == 'clear-day') {
                    document.body.style.backgroundImage = `url(img/walls/clear-day.png)`;
                    document.getElementById('icon').src = 'img/icons/clear-day.png';
                    document.querySelector('.card2').style.background = 'linear-gradient(to right, #16222a, #3a6073)';
                } else if (data.icon == 'clear-night') {
                    document.body.style.backgroundImage = `url(img/walls/clear-night.png)`;
                    document.getElementById('icon').src = 'img/icons/clear-night.png';
                } else if (data.icon == 'partly-cloudy-day') {
                    document.body.style.backgroundImage = `url(img/walls/partly-cloudy-day.png)`;
                    document.getElementById('icon').src = 'img/icons/partly-cloudy-day.png';
                } else if (data.icon == 'partly-cloudy-night') {
                    document.body.style.backgroundImage = `url(img/walls/cloudy-night.png)`;
                    document.getElementById('icon').src = 'img/icons/partly-cloudy-night.png';
                } else if (data.icon == 'cloudy') {
                    document.body.style.backgroundImage = `url(img/walls/cloudy-day.png)`;
                    document.getElementById('icon').src = 'img/icons/cloudy.png';
                } else if (data.icon == 'rain') {
                    document.body.style.backgroundImage = `url(img/walls/rain.png)`;
                    document.getElementById('icon').src = 'img/icons/rain.png';
                } else if (data.icon == 'sleet') {
                    document.body.style.backgroundImage = `url(img/walls/sleet.png)`;
                    document.getElementById('icon').src = 'img/icons/sleet.png';
                } else if (data.icon == 'snow') {
                    document.body.style.backgroundImage = `url(img/walls/sleet.png)`;
                    document.getElementById('icon').src = 'img/icons/snow.png';
                } else if (data.icon == 'wind') {
                    document.body.style.backgroundImage = `url(img/walls/cloudy-day.png)`;
                    document.getElementById('icon').src = 'img/icons/wind.png';
                } else if (data.icon == 'fog') {
                    document.body.style.backgroundImage = `url(img/walls/fog.png)`;
                    document.getElementById('icon').src = 'img/icons/fog.png';
                } 
                var place = data.location.split(",")
                placeName.textContent = place[0]
                address.textContent = data.location
                summary.textContent = data.summary
                rain.textContent = data.rain
                temp.textContent = Math.round(data.temp) + "°"
                humidity.textContent = data.humidity + " %"
                pressure.textContent = data.pressure
                windSpeed.textContent = Math.round(data.windSpeed) + " km/h"
                tempMin.textContent = data.tempMin + " °c"
                tempMax.textContent = data.tempMax + " °c"
            }
        })
    })
})