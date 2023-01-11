const argv = require("yargs").argv;
const github = require("./userInfo");

const { login, followers } = argv;

if (!login) {
  console.log(`Brak danych wejściowych! Powinieneś uruchomić program w konsoli w następujący sposób:
  node ex5.js --login nazwaUzytkownika --followers y*
  *parametr --login jest obowiązkowy, --followers jest nieobowiązkowy`);
  return;
}
if (followers !== "y" && followers !== undefined) {
  console.log(`Parametr --followers przyjmuje tylko wartość 'y'. Przykład użycia:
    node ex5.js --login username --followers y
    lub 
    node ex5.js --login username`);
  return;
}
github.getUserInfo(login, followers);

