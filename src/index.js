// import css file for css-loader & style-loader
import "./style.css";

// function to call API
async function apiCall(userInput, degreeUnit) {
  try {
    const response = await fetch(
      // note: pushing the API key to the frontend is not good practice, this is a free key so it is being ignored in this instance for the sake of this practice project
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}?unitGroup=${degreeUnit}&key=3G5NDYNJQFMLMP484EK9RSVAJ&contentType=json`,
      { mode: "cors" },
    );
    const responseData = await response.json();
    const finalData = await processData(responseData);
    console.log(finalData);
  } catch {
    (error) => {
      console.log(error);
    };
  }
}

// function to filter .json data to desired items
function processData(data) {
  return {
    address: data.address,
    currentConditions: data.currentConditions,
    currentDescription: data.description,
    forecastDay0: {
      datetime: data.days[0].datetime,
      conditions: data.days[0].conditions,
      description: data.days[0].description,
    },
    forecastDay1: {
      datetime: data.days[1].datetime,
      conditions: data.days[1].conditions,
      description: data.days[1].description,
    },
    forecastDay2: {
      datetime: data.days[2].datetime,
      conditions: data.days[2].conditions,
      description: data.days[2].description,
    },
    forecastDay3: {
      datetime: data.days[3].datetime,
      conditions: data.days[3].conditions,
      description: data.days[3].description,
    },
    forecastDay4: {
      datetime: data.days[4].datetime,
      conditions: data.days[4].conditions,
      description: data.days[4].description,
    },
    forecastDay5: {
      datetime: data.days[5].datetime,
      conditions: data.days[5].conditions,
      description: data.days[5].description,
    },
  };
}

// handle form submission
const form = document.querySelector("#weather-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // get radio button selection
  const checked = document.querySelector(
    'input[name="unitType"]:checked',
  ).value;
  // get input field value
  const input = document.querySelector("#search").value;
  apiCall(input, checked);
});
