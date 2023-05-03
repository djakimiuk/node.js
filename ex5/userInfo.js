const axios = require("axios");
const URL = "https://api.github.com/users/";
const weather = require("./weatherInfo");
async function getUserInfo(inputLogin, inputFollowers) {
  try {
    const response = await axios.get(`${URL}${inputLogin}`);
    const { name, followers, public_repos, repos_url, location } =
      response.data;
      //dodać if do reposname
    const reposNames = await axios.get(`${repos_url}`);
    const reposNamesArr = [];
    reposNames.data.forEach((el) => reposNamesArr.push(el.name));
    if (inputFollowers === "y") {
      console.log(`User information:
      - name: ${name}, 
      - followers: ${followers},
      - number of public repos: ${public_repos},
      - repos names: ${reposNamesArr}
      `);
      weather.getInfo(location);
    } else {
      console.log(`User information:
          - name: ${name}, 
          - number of public repos: ${public_repos},
          - repos names: ${reposNamesArr}
          `);
      weather.getInfo(location);
    }
  } catch (err) {
    console.log(`There was an error response from server: '${err.response.data.message}'. Check wether input values are correct.`);
  }
}

module.exports.getUserInfo = getUserInfo;
