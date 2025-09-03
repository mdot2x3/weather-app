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
    // view JSON object in console
    console.log(finalData);

    // dynamically import icons
    const currentIcon = await getIcon(finalData.currentConditions.icon);
    const day1Icon = await getIcon(finalData.forecastDay1.icon);
    const day2Icon = await getIcon(finalData.forecastDay2.icon);
    const day3Icon = await getIcon(finalData.forecastDay3.icon);
    const day4Icon = await getIcon(finalData.forecastDay4.icon);
    const day5Icon = await getIcon(finalData.forecastDay5.icon);

    // display content on the page via the DOM
    const forecast = document.querySelector(".forecast");

    forecast.innerHTML = `
    <div class="current">
        <p>"Today, the forecast for ${finalData.address} is ..."</p>
        <p>${finalData.currentConditions.temp}&deg</p>
        <img src=${currentIcon} alt="${finalData.currentConditions.icon}">
        <p>${finalData.currentConditions.conditions}</p>
        <p>${finalData.currentDescription}</p>
    </div>
    
    <div class="future">
        <table>
            <thead>
                <tr>
                    <th>${finalData.forecastDay1.datetime}</th>
                    <th>${finalData.forecastDay2.datetime}</th>
                    <th>${finalData.forecastDay3.datetime}</th>
                    <th>${finalData.forecastDay4.datetime}</th>
                    <th>${finalData.forecastDay5.datetime}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${finalData.forecastDay1.temp}&deg</td>
                    <td>${finalData.forecastDay2.temp}&deg</td>
                    <td>${finalData.forecastDay3.temp}&deg</td>
                    <td>${finalData.forecastDay4.temp}&deg</td>
                    <td>${finalData.forecastDay5.temp}&deg</td>
                </tr>
                <tr>
                    <td><img src="${day1Icon}" alt="${finalData.forecastDay1.icon}"></td>
                    <td><img src="${day2Icon}" alt="${finalData.forecastDay2.icon}"></td>
                    <td><img src="${day3Icon}" alt="${finalData.forecastDay3.icon}"></td>
                    <td><img src="${day4Icon}" alt="${finalData.forecastDay4.icon}"></td>
                    <td><img src="${day5Icon}" alt="${finalData.forecastDay5.icon}"></td>
                </tr>
                <tr>
                    <td>${finalData.forecastDay1.conditions}</td>
                    <td>${finalData.forecastDay2.conditions}</td>
                    <td>${finalData.forecastDay3.conditions}</td>
                    <td>${finalData.forecastDay4.conditions}</td>
                    <td>${finalData.forecastDay5.conditions}</td>
                </tr>
                <tr>
                    <td>${finalData.forecastDay1.description}</td>
                    <td>${finalData.forecastDay2.description}</td>
                    <td>${finalData.forecastDay3.description}</td>
                    <td>${finalData.forecastDay4.description}</td>
                    <td>${finalData.forecastDay5.description}</td>
                </tr>
            </tbody>
        </table>
    </div>
`;
  } catch {
    (error) => {
      console.log(error);
    };
  }
}

// function to filter JSON data to desired items
function processData(data) {
  return {
    address: data.address,
    currentConditions: data.currentConditions,
    currentDescription: data.description,
    forecastDay0: {
      datetime: data.days[0].datetime,
      icon: data.days[0].icon,
      temp: data.days[0].temp,
      conditions: data.days[0].conditions,
      description: data.days[0].description,
    },
    forecastDay1: {
      datetime: data.days[1].datetime,
      icon: data.days[1].icon,
      temp: data.days[1].temp,
      conditions: data.days[1].conditions,
      description: data.days[1].description,
    },
    forecastDay2: {
      datetime: data.days[2].datetime,
      icon: data.days[2].icon,
      temp: data.days[2].temp,
      conditions: data.days[2].conditions,
      description: data.days[2].description,
    },
    forecastDay3: {
      datetime: data.days[3].datetime,
      icon: data.days[3].icon,
      temp: data.days[3].temp,
      conditions: data.days[3].conditions,
      description: data.days[3].description,
    },
    forecastDay4: {
      datetime: data.days[4].datetime,
      icon: data.days[4].icon,
      temp: data.days[4].temp,
      conditions: data.days[4].conditions,
      description: data.days[4].description,
    },
    forecastDay5: {
      datetime: data.days[5].datetime,
      icon: data.days[5].icon,
      temp: data.days[5].temp,
      conditions: data.days[5].conditions,
      description: data.days[5].description,
    },
  };
}

// function to dynamically import icons based on name
async function getIcon(iconName) {
  // webpack bundles all SVGs so they’re available at runtime
  return import(
    /* webpackMode: "eager" */
    `./assets/vc_icons/${iconName}.svg`
  ).then((module) => module.default);
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
