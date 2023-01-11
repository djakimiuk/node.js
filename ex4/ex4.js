// Napisz aplikację która odczyta z pliku data.json liczbę oraz nazwę pliku, a następnie:

// pobierze z API informacje o danej liczbie (http://numbersapi.com/{number}, np http://numbersapi.com/42)
// informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie
const fs = require("fs");
const axios = require("axios");
const file = "data.json";
const URL = "http://numbersapi.com/";
fs.readFile(`${__dirname}/${file}`, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!data) {
    console.log("Brak danych do wczytania!");
    return;
  }
  const { number, filename } = JSON.parse(data);
  if (
    Number.isInteger(number) ||
    !number ||
    !filename ||
    number == "" ||
    filename == ""
  ) {
    console.log(`Nieprawidłowy format danych wejściowych. Plik data.json powinien wyglądać jak na przykładzie:
    {
        "number": "12",
        "filename": "file.json"
    }`);
    return;
  }
  getNumberInfo(number, filename);
});

async function getNumberInfo(number, fileName) {
  try {
    const response = await axios.get(`${URL}${number}`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
