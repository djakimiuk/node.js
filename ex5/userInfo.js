const axios = require("axios");
const URL = "https://api.github.com/users/";
async function getUserInfo(inputLogin, inputFollowers) {
  try {
    const response = await axios.get(`${URL}${inputLogin}`);
    const { name, followers, public_repos, repos_url } = response.data;
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
    } else {
      console.log(`User information:
          - name: ${name}, 
          - number of public repos: ${public_repos},
          - repos names: ${reposNamesArr}
          `);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports.getUserInfo = getUserInfo;
