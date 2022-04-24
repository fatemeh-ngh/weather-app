const apikey = ""
const input = document.querySelector(".menu input");
const form = document.querySelector("form");
const msg = document.querySelector(".menu .msg");
const cities = document.querySelector(".cities ul");

form.addEventListener("submit", addCity);

function addCity(event){
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=metric`)
        .then((response) => response.json())
        .then(data => {
            const {main, name, sys, weather} = data;
            console.log(data);
            const li = document.createElement("li");
            const icon = document.createElement("i");
            icon.classList.add('fa-solid');
            icon.classList.add(`fa-${weather[0].main}`);
            const cityname = document.createElement("p");
            cityname.classList.add("city-name");
            cityname.innerText = `${name} ${sys.country}`
            const temp = document.createElement("h2");
            temp.classList.add("city-temperature");
            temp.innerText = `${Math.round(main.temp)} C`
            const day = document.createElement("p");
            day.classList.add("city-day");
            day.innerText = `${weather[0].description}`
            li.appendChild(icon);
            li.appendChild(cityname);
            li.appendChild(temp);
            li.appendChild(day);
            cities.appendChild(li);
            msg.innerText ="";
        })
        .catch(() =>{
            msg.innerText = "Search for a valid city";
            msg.style.display = "inline-block";
        })
    input.value ="";
}
