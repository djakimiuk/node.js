//Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł colors (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów. Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

const colors = require("colors");

if (process.argv.length < 3) {
  console.log("Zbyt mało parametrów!".red);
} else {
  const [node, file, ...args] = process.argv;
  const output = args.join(" ");
  console.log(colors.rainbow(output));
}

// Sample invoke of the program:
// C:\node.js\ex2> node ex2.js Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?

//When no arguments:
//PS C:\node.js\ex2> node ex2.js
//OUTPUT: Zbyt mało parametrów!