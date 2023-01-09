// Napisz aplikację która odczyta z pliku data.json liczbę oraz nazwę pliku, a następnie:

// pobierze z API informacje o danej liczbie (http://numbersapi.com/{number}, np http://numbersapi.com/42)
// informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie

const axios = require("axios");
async function getNumberInfo(number) {
  try {
    const response = await axios.get(`http://numbersapi.com/${number}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}
getNumberInfo(21);
