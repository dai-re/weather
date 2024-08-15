var isoCountries = {
  Australia: "AU",
  Indonesia: "ID",
  Korea: "KR",
  Malaysia: "MY",
  Taiwan: "TW",
};

const apiKey = "830caabfa9c6414792510713241408";
const localCity = localStorage.getItem("country");
if (localCity) {
  city = localCity;
  console.log("🚀 local~ changeCountry ~ city:", city);
  fetchData(city);
} else {
  city = "jakarta";
  console.log("🚀 ~ changeCountry ~ city:", city);
  fetchData(city);
}
function fetchData(city) {
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const temprature = document.getElementById("temprature");
      temprature.innerHTML = `<i class="${
        data.current.temp_c >= 29.9 ? "red" : "blue"
      }">${data.current.temp_c}<i><b>&#8451;</b>`;
      const image = document.getElementById("image");
      image.innerHTML = `<img src="${data.current.condition.icon}" /> <span id="condition"></span></span>`;
      const location = document.getElementById("location");
      location.innerHTML = `<img src="https://flagsapi.com/${
        isoCountries[data.location.country]
      }/flat/64.png" alt="">`;
      const time = document.getElementById("time");
      const isDay = data.current.is_day === 1 ? "siang" : "malam";
      time.innerHTML = isDay;

      const li = document.getElementById("win-loca-loader");

      li.innerHTML = "";
      for (const country in isoCountries) {
        li.innerHTML += `<li onclick="changeCountry('${country}')"><img src="https://flagsapi.com/${isoCountries[country]}/flat/64.png" alt=""></li>`;
      }
    })

    .catch((error) => console.error("Error fetching data:", error));
}
function loca() {
  const winLoka = document.getElementById("win-loca");
  winLoka.classList.add("active");
}

function changeCountry(country) {
  const winLoka = document.getElementById("win-loca");
  localStorage.setItem("country", country);
  console.log("🚀 ~ changeCountry ~ city:", city);
  winLoka.classList.remove("active");
  fetchData(country);
}
