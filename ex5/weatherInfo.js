const axios = require("axios");
const URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=";
async function getInfo(location) {
  if (location === null) {
    console.log("The specified user does not have a completed location.");
    return;
  }
  try {
    const response = await axios.get(`${URL}${location}`);
    console.log(response.status);
    // if (response.status !== 200) {
    //   console.log("Invalid location!");
    // }
    const responseData = response.data;
    console.log(
      `The weather in ${location}: ${responseData.weather[0].main}, ${responseData.weather[0].description}`
    );
  } catch (err) {
    console.log(`There was an error: ${err.response.data.message}`);
  }
}

module.exports.getInfo = getInfo;
