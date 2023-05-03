// Napisz aplikację która odczyta z pliku data.json liczbę oraz nazwę pliku, a następnie:

// pobierze z API informacje o danej liczbie (http://numbersapi.com/{number}, np http://numbersapi.com/42)
// informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie
const fs = require("fs");
const axios = require("axios");
const file = "data.json";
const URL = "http://numbersapi.com/";
fs.readFile(`${__dirname}/${file}`, "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }
  if (!data) {
    console.log("No data to load!");
    return;
  }
  const { number, filename } = JSON.parse(data);
  if (
    !Number.isInteger(+number) ||
    !number ||
    !filename ||
    number == "" ||
    filename == "" ||
    number.includes(",") ||
    !filename.includes(".json")
  ) {
    console.log(`Invalid input data format! The data.json file should look like the example:
    
    {
        "number": "12",
        "filename": "file.json"
    }`);
    return;
  }
  getNumberInfo(number, filename);
});

async function getNumberInfo(number, filename) {
  try {
    const response = await axios.get(`${URL}${number}`);
    const responseData = response.data;
    fs.writeFile(filename, responseData, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(
          `File written successfully! It has the following contents:`
        );
        console.log(fs.readFileSync("file.json", "utf-8"));
      }
    });
  } catch (err) {
    console.log(err);
  }
}
