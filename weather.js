const search = document.querySelector(".js-search");
const list = document.querySelector(".js-list");

search.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();
  const { query, days } = event.currentTarget.elements;

  getWeather(query.value, days.value)
    .then((data) => (list.innerHTML = createMarkup(data.forecast.forecastday)))
    .catch((err) => console.log(err));
}

function getWeather(city, days) {
  const BASE_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "e173bd38586a4b8cb62140313241004";

  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `<li class='js-list-container'>
  <img src="${icon}" alt="${text}">
  <p>${text}</p>
  <h2>${date}</h2>
  <h3>${avgtemp_c}</h3>
</li>`
    )
    .join("");
}
