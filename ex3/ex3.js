// Napisz program który wypisze szczegóły pliku z własnym kodem źródłowym.

// Wypisywane informacje:
// czas utworzenia
// czas modyfikacji
// rozmiar

const fs = require("fs");
try {
  const { birthtime, mtime, ctime, size } = fs.statSync(__filename);
  console.log(` 
  File created at: ${birthtime.toUTCString()}
  File data last modified at: ${mtime.toUTCString()}
  File metadata last modified at: ${ctime.toUTCString()} 
  File size: ${size} bytes`);
} catch (err) {
  console.log(err);
}
