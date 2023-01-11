const argv = require("yargs").argv;
const github = require("./userInfo");

const { login, followers } = argv;

if (!login) {
  console.log(`No input data! You should run the program in the console as follows:
  node ex5.js --login nazwaUzytkownika --followers y*
  *parameter --login is required, --followers is not required`);
  return;
}
if (followers !== "y" && followers !== undefined) {
  console.log(`Parameter --followers only accepts the value 'y'. Usage example:
    node ex5.js --login username --followers y
    OR
    node ex5.js --login username`);
  return;
}
github.getUserInfo(login, followers);

