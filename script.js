console.log("hello");
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
const input = document.querySelector(".search-box input");

search.addEventListener("click", () => {
  const APIKey = "d61ea63f95bb1f6bee216de4c9d8e8d1";
  const city = input.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        const isDesktop = window.matchMedia("(min-width: 720px)").matches;

        if (isDesktop) {
          container.style.height = "400px";
        } else {
          container.style.height = "350px";
        }

        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      } else {
        const isDesktop = window.matchMedia("(min-width: 720px)").matches;
        if (isDesktop) {
          container.style.height = "555px";
        } else {
          container.style.height = "450px";
        }
      }
      const image = document.querySelector(".weather-box img");
      const temprature = document.querySelector(".weather-box .temprature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span",
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) return;
      else {
        cityHide.textContent = city;
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "./images/clear.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;

          case "Snow":
            image.src = "images/snow.png";
            break;

          case "Clouds":
            image.src = "./images/cloud.png";
            break;

          case "Mist":
            image.src = "images/mist.png";
            break;

          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
        }

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const oldCloneWeather = document.getElementById("clone-info-weather");
        const oldCloneHumidity = document.getElementById("clone-info-humidity");
        const oldCloneWind = document.getElementById("clone-info-wind");

        if (oldCloneWeather) {
          oldCloneWeather.classList.remove("active-clone");
          oldCloneHumidity.classList.remove("active-clone");
          oldCloneWind.classList.remove("active-clone");

          setTimeout(() => {
            oldCloneWeather.remove();
            oldCloneHumidity.remove();
            oldCloneWind.remove();
          }, 1000);
        }

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);
      }
    });
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search.click();
  }
});
