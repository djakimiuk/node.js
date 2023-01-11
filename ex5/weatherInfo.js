const axios = require("axios");
const URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=";
async function getInfo(location) {
  try {
    const response = await axios.get(`${URL}${location}`);
    const responseData = response.data;
    console.log(`The weather in ${location}: ${responseData.weather[0].main}, ${responseData.weather[0].description}`);
  } catch (err) {
    console.log(err);
  }
}

module.exports.getInfo = getInfo;
