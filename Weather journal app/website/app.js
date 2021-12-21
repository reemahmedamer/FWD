/* Global Variables */

// Personal API Key for OpenWeatherMap API

//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=" + "ac970994cfa9747bf12bd86ebf6068bc" + "&units=metric";

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

const action = async () => {
  const zipCode = document.getElementById("zip").value;
  console.log(zipCode);
  const feelings = document.getElementById("feelings").value;

  try {
    let dataFromWeather = await getData(zipCode);
    let postDataResponse = await postData("http://localhost:3000/addData", {
      date: newDate,
      temp: dataFromWeather.main.temp,
      feelings,
    });
    updateUI();
  } catch (e) {
      console.log('error happened');
      console.log(e);
  }

 
};

document.getElementById("generate").addEventListener("click", action);

//async function to get data from API

const getData = async (zip) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('error happened');
    console.log(e);
}
};

//async POST
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return true;
};

//update UI using GET route
const updateUI = async () => {
  const response = await fetch("http://localhost:3000/all");
  console.log(response.body);
  try {
    const data = await response.json();
    console.log(data);
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temp + "&degC";
    document.getElementById("content").innerHTML = data.feelings;
  } catch (e) {
    console.log('error happened');
    console.log(e);
}
};
